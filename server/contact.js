import { createHash, createHmac } from 'node:crypto'
import { isIP } from 'node:net'

const RECIPIENT = 'info@unifiedworks.net'
const MAX_BODY_BYTES = 32 * 1024
const TYPES = {
  partnership: 'Cooperation and partnerships / التعاون والشراكات',
  business: 'Platform demonstrations / العروض التوضيحية',
  inquiry: 'General inquiries / الاستفسارات العامة',
}
const LIMITS = { name: 120, email: 254, organization: 200, position: 160, phone: 40, subject: 200, message: 5000, website: 200 }
const EMAIL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Atomic, shared limits: 10/IP/10 minutes, 5/sender/10 minutes, 100 total/hour.
// Only keyed hashes and a stable first-attempt timestamp are retained in Redis.
const LIMIT_SCRIPT = `
local retry = 0
for i = 1, 3 do
  local count = redis.call('INCR', KEYS[i])
  local ttl = tonumber(ARGV[4])
  if i == 3 then ttl = tonumber(ARGV[5]) end
  if count == 1 then redis.call('EXPIRE', KEYS[i], ttl) end
  if count > tonumber(ARGV[i]) then
    retry = math.max(retry, redis.call('TTL', KEYS[i]))
  end
end
if retry > 0 then return {0, retry} end
redis.call('SET', KEYS[4], ARGV[7], 'NX', 'EX', ARGV[6])
return {1, redis.call('GET', KEYS[4])}
`

class RequestError extends Error {
  constructor(status, code, fields) {
    super(code)
    this.status = status
    this.code = code
    this.fields = fields
  }
}

function json(status, body, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  })
}

export function validEmail(value) {
  if (typeof value !== 'string' || value.length > 254 || !EMAIL.test(value)) return false
  const local = value.split('@')[0]
  return local.length <= 64 && !local.startsWith('.') && !local.endsWith('.') && !local.includes('..')
}

async function readBody(request) {
  const length = request.headers.get('content-length')
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) {
    throw new RequestError(413, 'request_too_large')
  }
  if (!request.body) throw new RequestError(400, 'invalid_request')
  const reader = request.body.getReader()
  const chunks = []
  let size = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new RequestError(413, 'request_too_large')
      }
      chunks.push(value)
    }
    const bytes = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes))
  } catch (error) {
    if (error instanceof RequestError) throw error
    throw new RequestError(400, 'invalid_request')
  } finally {
    reader.releaseLock()
  }
}

export function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new RequestError(400, 'invalid_request')
  const data = {}
  const errors = new Set()
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = body[field] ?? ''
    if (typeof value !== 'string' || value.length > max) { errors.add(field); continue }
    const normalized = field === 'message' ? value.replace(/\r\n?/g, '\n').trim() : value.trim()
    const checked = field === 'message' ? normalized : value
    if ([...checked].some(character => {
      const code = character.charCodeAt(0)
      return code === 127 || (code < 32 && !(field === 'message' && (code === 9 || code === 10)))
    })) errors.add(field)
    data[field] = normalized
  }
  if ((data.name?.length ?? 0) < 2) errors.add('name')
  if (!validEmail(data.email)) errors.add('email')
  if (!data.subject) errors.add('subject')
  if ((data.message?.length ?? 0) < 10) errors.add('message')
  if (body.consent !== true) errors.add('consent')
  if (!Object.hasOwn(TYPES, body.type)) errors.add('type')
  if (data.website) errors.add('website')
  if (errors.size) throw new RequestError(400, 'validation_error', [...errors])
  data.type = body.type
  return data
}

function settings(env) {
  const origins = new Set((env.CONTACT_ALLOWED_ORIGINS ?? '').split(',').map(s => s.trim()).filter(Boolean))
  if (!env.RESEND_API_KEY || !validEmail(env.CONTACT_FROM_EMAIL) || !origins.size ||
      !env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) return null
  try {
    const redis = new URL(env.UPSTASH_REDIS_REST_URL)
    if (redis.protocol !== 'https:' || redis.username || redis.password || redis.pathname !== '/') return null
    for (const origin of origins) {
      const url = new URL(origin)
      if (url.origin !== origin || url.protocol !== 'https:') return null
    }
  } catch { return null }
  return { origins, from: env.CONTACT_FROM_EMAIL }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

function emailContent(data, timestamp) {
  const fields = [
    ['Name / الاسم', data.name], ['Email / البريد الإلكتروني', data.email],
    ['Organization / الجهة', data.organization || '—'], ['Job title / المسمى الوظيفي', data.position || '—'],
    ['Telephone / الهاتف', data.phone || '—'], ['Category / نوع الطلب', TYPES[data.type]],
    ['Subject / الموضوع', data.subject], ['Message / الرسالة', data.message],
    ['Submitted at (UTC) / وقت الإرسال', timestamp],
    ['Submitted at (Saudi Arabia) / وقت الإرسال في السعودية', new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Riyadh', dateStyle: 'full', timeStyle: 'long',
    }).format(new Date(timestamp))],
    ['Consent / الموافقة', 'Provided / تمت الموافقة'],
  ]
  return {
    text: `Unified Works | New Contact Request\n\n${fields.map(([label, value]) => `${label}\n${value}`).join('\n\n')}`,
    html: `<!doctype html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;color:#183b46"><h1>Unified Works | New Contact Request</h1>${fields.map(([label, value]) => `<h2 style="font-size:14px">${escapeHtml(label)}</h2><div dir="auto" style="white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value)}</div>`).join('')}</body></html>`,
  }
}

export function createContactHandler({ env = process.env, fetchImpl = fetch, now = () => new Date() } = {}) {
  return async function handleContact(request) {
    if (request.method !== 'POST') return json(405, { success: false, code: 'method_not_allowed' }, { Allow: 'POST' })
    const config = settings(env)
    if (!config) return json(503, { success: false, code: 'service_unavailable' })
    const origin = request.headers.get('origin')
    if (!config.origins.has(origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return json(403, { success: false, code: 'forbidden' })
    }
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return json(415, { success: false, code: 'invalid_request' })
    }
    const requestId = request.headers.get('idempotency-key')
    if (!UUID.test(requestId ?? '')) return json(400, { success: false, code: 'invalid_request' })

    try {
      const data = validateContact(await readBody(request))
      // Vercel overwrites x-forwarded-for on requests to Functions; do not trust client body IPs.
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
      if (!ip || !isIP(ip)) return json(503, { success: false, code: 'service_unavailable' })
      const fingerprint = createHash('sha256').update(JSON.stringify(data)).digest('hex')
      const hash = value => createHmac('sha256', env.RESEND_API_KEY).update(value).digest('hex')
      const idempotencyKey = `contact/${createHash('sha256').update(`${requestId}:${fingerprint}`).digest('hex')}`
      const rateResponse = await fetchImpl(env.UPSTASH_REDIS_REST_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['EVAL', LIMIT_SCRIPT, '4', `contact:ip:${hash(ip)}`, `contact:email:${hash(data.email.toLowerCase())}`,
          'contact:global', `contact:date:${idempotencyKey}`, '10', '5', '100', '600', '3600', '86400', now().toISOString()]),
        signal: AbortSignal.timeout(5000),
      })
      if (!rateResponse.ok) return json(503, { success: false, code: 'service_unavailable' })
      const { result } = await rateResponse.json()
      if (!Array.isArray(result) || result.length !== 2) return json(503, { success: false, code: 'service_unavailable' })
      if (result[0] === 0) return json(429, { success: false, code: 'rate_limited' }, { 'Retry-After': String(Math.max(1, Number(result[1]) || 600)) })
      if (result[0] !== 1 || typeof result[1] !== 'string' || !Number.isFinite(Date.parse(result[1]))) {
        return json(503, { success: false, code: 'service_unavailable' })
      }
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify({
          from: `Unified Works <${config.from}>`, to: [RECIPIENT], reply_to: data.email,
          subject: 'Unified Works | New Contact Request', ...emailContent(data, result[1]),
        }),
        signal: AbortSignal.timeout(10000),
      })
      const resultBody = await response.json().catch(() => null)
      if (!response.ok || !resultBody || typeof resultBody.id !== 'string' || !resultBody.id || resultBody.error) {
        return json(502, { success: false, code: 'delivery_failed' })
      }
      // Acceptance by Resend is not an inbox-delivery confirmation.
      return json(200, { success: true, id: resultBody.id })
    } catch (error) {
      if (error instanceof RequestError) return json(error.status, { success: false, code: error.code, ...(error.fields && { fields: error.fields }) })
      return json(502, { success: false, code: 'delivery_failed' })
    }
  }
}
