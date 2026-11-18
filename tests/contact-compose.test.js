import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFileSync } from 'node:fs'
import { buildContactDraft, openContactDraft } from '../src/pages/Contact/contactCompose.js'

const source = readFileSync(new URL('../src/pages/Contact/Contact.jsx', import.meta.url), 'utf8')
const translations = vm.runInNewContext(source.slice(source.indexOf('const content'), source.indexOf('const initialForm')) + '\n;content')
const form = {
  name: 'مقدم الطلب & Sender', email: 'sender+tag@example.com', organization: 'Example & Partners',
  position: 'Supervisor', phone: '+966 500000000', type: 'inquiry',
  subject: 'Quality? A&B #1', message: 'Arabic: مراجعة الصور\nSecond line & # + ?', consent: true, website: '',
}

for (const lang of ['ar', 'en']) {
  test(`${lang}: Gmail and mailto preserve all fields, Unicode and reserved characters`, () => {
    const t = translations[lang]
    const draft = buildContactDraft(form, t)
    const gmail = new URL(draft.gmail)
    const mailto = new URL(draft.mailto)
    assert.equal(gmail.origin, 'https://mail.google.com')
    assert.equal(gmail.searchParams.get('to'), 'info@unifiedworks.net')
    assert.equal(mailto.pathname, 'info@unifiedworks.net')
    assert.equal(gmail.searchParams.get('su'), `Unified Works | ${t.types[2].title}`)
    assert.equal(mailto.searchParams.get('subject'), gmail.searchParams.get('su'))
    const body = gmail.searchParams.get('body')
    assert.equal(mailto.searchParams.get('body').replace(/\r\n/g, '\n'), body)
    assert.ok(body.startsWith(t.emailTitle))
    for (const key of ['name', 'email', 'organization', 'position', 'phone', 'subject']) {
      assert.ok(body.includes(`${t[key]}: ${form[key]}`))
    }
    assert.ok(body.includes(`${t.type}: ${t.types[2].title}`))
    assert.ok(body.includes(form.message))
    assert.ok(body.includes(`${t.emailConsent}: ${t.yes}`))
    assert.ok(!body.includes('website:'))
    assert.ok(draft.copyText.includes('info@unifiedworks.net'))
    assert.ok(!draft.mailto.includes('\n'))
    assert.ok(draft.mailto.includes('%0D%0A'))
  })
}

test('all existing categories and blank optional values are handled without adding fields', () => {
  for (const lang of ['ar', 'en']) for (const type of translations[lang].types) {
    const draft = buildContactDraft({ ...form, type: type.id, organization: '', position: '', phone: '' }, translations[lang])
    assert.equal(new URL(draft.gmail).searchParams.get('su'), `Unified Works | ${type.title}`)
    assert.ok(new URL(draft.gmail).searchParams.get('body').includes(`${translations[lang].organization}: —`))
  }
  assert.throws(() => buildContactDraft({ ...form, type: 'unknown' }, translations.en))
})

test('Gmail opens synchronously and its opener is cleared before external navigation', () => {
  const draft = buildContactDraft(form, translations.en)
  let opened, navigated
  const popup = { opener: {}, location: { replace: url => { assert.equal(popup.opener, null); navigated = url } } }
  const browser = { open: (...args) => { opened = args; return popup }, location: { assign: () => assert.fail('No fallback needed') } }
  assert.equal(openContactDraft(draft, browser), 'gmail')
  assert.deepEqual(opened, ['about:blank', '_blank'])
  assert.equal(navigated, draft.gmail)
})

test('blocked popup falls back to the configured email application', () => {
  const draft = buildContactDraft(form, translations.ar)
  let fallback
  assert.equal(openContactDraft(draft, { open: () => null, location: { assign: url => { fallback = url } } }), 'mailto')
  assert.equal(fallback, draft.mailto)
})

test('navigation failure closes the empty popup and attempts mailto', () => {
  let closed = false, fallback
  const popup = { opener: {}, close: () => { closed = true }, location: { replace: () => { throw new Error('blocked') } } }
  const draft = buildContactDraft(form, translations.en)
  assert.equal(openContactDraft(draft, { open: () => popup, location: { assign: url => { fallback = url } } }), 'mailto')
  assert.equal(closed, true)
  assert.equal(fallback, draft.mailto)
})

test('manual fallback remains possible if the browser refuses both navigation methods', () => {
  const draft = buildContactDraft(form, translations.en)
  assert.equal(openContactDraft(draft, { open: () => { throw new Error('blocked') }, location: { assign: () => { throw new Error('no handler') } } }), 'manual')
  assert.ok(draft.copyText.includes(form.message))
})

test('long messages remain complete for manual copying even if a mail client limits URL size', () => {
  const message = 'م'.repeat(5000)
  const draft = buildContactDraft({ ...form, message }, translations.ar)
  assert.ok(new URL(draft.gmail).searchParams.get('body').includes(message))
  assert.ok(draft.copyText.includes(message))
})

test('submission contains no API request, credential access or automatic form reset', () => {
  const handler = source.slice(source.indexOf('  const handleSubmit'), source.indexOf('  return (\n    <main'))
  assert.doesNotMatch(handler, /fetch\(|setForm\(|import\.meta\.env|success/)
  assert.match(handler, /validate\(\)/)
  assert.match(source, /href=\{draft.mailto\}/)
  assert.match(source, /navigator.clipboard.writeText\(draft.copyText\)/)
})
