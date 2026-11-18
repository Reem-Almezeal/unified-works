import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createContactHandler, validEmail, validateContact } from '../server/contact.js'

const env = {
  RESEND_API_KEY: 'unit-test-only-not-a-real-key',
  CONTACT_FROM_EMAIL: 'contact@notifications.example.com',
  CONTACT_ALLOWED_ORIGINS: 'https://unifiedworks.net,https://www.unifiedworks.net',
  UPSTASH_REDIS_REST_URL: 'https://unit-test.example.com',
  UPSTASH_REDIS_REST_TOKEN: 'unit-test-only-not-a-real-token',
}
const date = '2026-11-18T09:00:00.000Z'
const key = 'f8e48b27-1835-4bf9-9d6c-9a14d8f32011'
const valid = {
  name: 'Test Sender', email: 'sender@example.com', organization: 'Example', position: 'Supervisor',
  phone: '+966 500000000', type: 'inquiry', subject: 'Technical inquiry',
  message: 'Please provide information about the platform', consent: true, website: '',
}
function request(body = valid, headers = {}, method = 'POST') {
  return new Request('https://unifiedworks.net/api/contact', {
    method,
    headers: { origin: 'https://unifiedworks.net', 'content-type': 'application/json',
      'idempotency-key': key, 'x-forwarded-for': '192.0.2.1', ...headers },
    ...(method === 'POST' && { body: typeof body === 'string' ? body : JSON.stringify(body) }),
  })
}
function harness(overrides = {}) {
  const calls = []
  const handler = createContactHandler({
    env, now: () => new Date(date),
    fetchImpl: async (url, options) => {
      calls.push({ url, options, body: JSON.parse(options.body) })
      return url === env.UPSTASH_REDIS_REST_URL
        ? Response.json({ result: [1, date] })
        : Response.json({ id: 'accepted-test-email' })
    }, ...overrides,
  })
  return { handler, calls }
}

test('all existing fields are delivered only to the official inbox with reply-to and timestamps', async () => {
  const { handler, calls } = harness()
  const response = await handler(request({ ...valid, to: 'attacker@example.com' }))
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, id: 'accepted-test-email' })
  assert.equal(calls.length, 2)
  const email = calls[1].body
  assert.deepEqual(email.to, ['info@unifiedworks.net'])
  assert.equal(email.reply_to, valid.email)
  assert.equal(email.subject, 'Unified Works | New Contact Request')
  for (const field of ['name', 'email', 'organization', 'position', 'phone', 'subject', 'message']) {
    assert.ok(email.text.includes(valid[field]))
  }
  assert.ok(email.text.includes(date))
  assert.ok(email.text.includes('Saudi Arabia'))
  assert.equal(response.headers.get('cache-control'), 'no-store')
})

test('Arabic content is preserved and HTML is escaped', async () => {
  const { handler, calls } = harness()
  const response = await handler(request({ ...valid, name: 'مقدم الطلب', subject: 'استفسار عن المنصة',
    message: 'رسالة عربية <script>alert("x")</script> & ملاحظات\r\nسطر جديد' }))
  assert.equal(response.status, 200)
  assert.ok(calls[1].body.text.includes('رسالة عربية'))
  assert.ok(calls[1].body.html.includes('dir="auto"'))
  assert.ok(calls[1].body.html.includes('&lt;script&gt;'))
  assert.ok(!calls[1].body.html.includes('<script>'))
})

test('required fields, field types, category, consent, and header injection are checked server-side', async () => {
  for (const body of [null, [], {}, { ...valid, name: 'x' }, { ...valid, email: 'invalid' },
    { ...valid, email: 'a@example.com\r\nBcc: evil@example.com' }, { ...valid, subject: 'a\nb' },
    { ...valid, message: 'short' }, { ...valid, consent: 'true' }, { ...valid, type: 'other' },
    { ...valid, phone: {} }, { ...valid, organization: 'x'.repeat(201) }, { ...valid, website: 'spam' }]) {
    const { handler, calls } = harness()
    const response = await handler(request(body))
    assert.equal(response.status, 400, JSON.stringify(body))
    assert.equal(calls.length, 0)
  }
  assert.equal(validEmail('a..b@example.com'), false)
  assert.equal(validEmail('a@example..com'), false)
  assert.equal(validEmail('sender+tag@example.com'), true)
  assert.equal(validateContact(valid).type, 'inquiry')
})

test('malformed JSON, invalid UTF-8, and oversized bodies never reach the providers', async () => {
  for (const body of ['{bad', 'x'.repeat(32769), JSON.stringify({ ...valid, message: 'x'.repeat(5001) })]) {
    const { handler, calls } = harness()
    const response = await handler(request(body))
    assert.ok([400, 413].includes(response.status))
    assert.equal(calls.length, 0)
  }
  const { handler, calls } = harness()
  assert.equal((await handler(request(valid, { 'content-length': '32769' }))).status, 413)
  const invalid = new Request('https://unifiedworks.net/api/contact', { method: 'POST',
    headers: Object.fromEntries(request().headers), body: new Uint8Array([0xff, 0xfe]) })
  assert.equal((await handler(invalid)).status, 400)
  assert.equal(calls.length, 0)
})

test('unexpected origins, cross-site requests, methods, missing request IDs and content types are rejected', async () => {
  for (const [headers, method, status] of [
    [{ origin: 'https://evil.example' }, 'POST', 403],
    [{ origin: 'https://unifiedworks.net.evil.example' }, 'POST', 403],
    [{ 'sec-fetch-site': 'cross-site' }, 'POST', 403],
    [{ 'idempotency-key': '' }, 'POST', 400],
    [{ 'content-type': 'text/plain' }, 'POST', 415],
    [{}, 'GET', 405],
  ]) {
    const { handler, calls } = harness()
    assert.equal((await handler(request(valid, headers, method))).status, status)
    assert.equal(calls.length, 0)
  }
})

test('missing configuration and Redis failure fail closed without sending email', async () => {
  for (const settings of [{}, { ...env, CONTACT_FROM_EMAIL: 'bad\nfrom@example.com' },
    { ...env, CONTACT_ALLOWED_ORIGINS: '*' }, { ...env, UPSTASH_REDIS_REST_URL: 'http://example.com' }]) {
    const { handler, calls } = harness({ env: settings })
    assert.equal((await handler(request())).status, 503)
    assert.equal(calls.length, 0)
  }
  let calls = 0
  const { handler } = harness({ fetchImpl: async () => { calls++; return Response.json({ error: 'unavailable' }, { status: 503 }) } })
  assert.equal((await handler(request())).status, 503)
  assert.equal(calls, 1)
})

test('distributed limiter uses hashed IP/email keys and rate limit rejection prevents sending', async () => {
  const { handler, calls } = harness()
  await handler(request())
  const redis = calls[0].body
  assert.equal(redis[0], 'EVAL')
  assert.equal(redis[2], '4')
  assert.ok(!JSON.stringify(redis).includes(valid.email))
  assert.ok(!JSON.stringify(redis).includes('192.0.2.1'))
  assert.ok(!JSON.stringify(redis).includes(valid.message))
  let attempts = 0
  const limited = harness({ fetchImpl: async () => { attempts++; return Response.json({ result: [0, 120] }) } })
  const response = await limited.handler(request())
  assert.equal(response.status, 429)
  assert.equal(response.headers.get('retry-after'), '120')
  assert.equal(attempts, 1)
})

test('provider errors, invalid acknowledgements and timeouts never report success', async () => {
  for (const result of [() => Response.json({ error: 'failed' }, { status: 500 }),
    () => Response.json({ id: 'x' }, { status: 429 }), () => Response.json({}),
    () => new Response('not json'), () => { throw new Error('timeout') }]) {
    const { handler } = harness({ fetchImpl: async url => url === env.UPSTASH_REDIS_REST_URL
      ? Response.json({ result: [1, date] }) : result() })
    const response = await handler(request())
    assert.equal(response.status, 502)
    assert.equal((await response.json()).success, false)
  }
})

test('unchanged retries have identical provider keys and bodies, including the original submission time', async () => {
  let time = new Date(date)
  const bodies = []
  let storedDate
  const { handler } = harness({ now: () => time, fetchImpl: async (url, options) => {
    if (url === env.UPSTASH_REDIS_REST_URL) {
      storedDate ??= JSON.parse(options.body).at(-1)
      return Response.json({ result: [1, storedDate] })
    }
    bodies.push({ headers: options.headers, body: options.body })
    return Response.json({ id: 'same-provider-id' })
  } })
  await handler(request())
  time = new Date('2026-11-18T09:05:00.000Z')
  await handler(request())
  assert.deepEqual(bodies[0], bodies[1])
  await handler(request({ ...valid, subject: 'Updated inquiry' }))
  assert.notEqual(bodies[1].headers['Idempotency-Key'], bodies[2].headers['Idempotency-Key'])
})

test('SPA rewrite never captures the API route', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)))
  const source = new RegExp(`^${config.rewrites[0].source}$`)
  assert.equal(source.test('/contact'), true)
  assert.equal(source.test('/platform'), true)
  assert.equal(source.test('/api/contact'), false)
  assert.equal(source.test('/api'), false)
})
