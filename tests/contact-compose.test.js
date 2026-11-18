import test from 'node:test'
import assert from 'node:assert/strict'
import { buildContactDraft, openContactDraft } from '../src/pages/Contact/contactCompose.js'

const form = { name: 'Alex', email: 'alex@example.com', organization: '', position: '', phone: '', type: 'inquiry', subject: '', message: 'Please provide information about reviewing infrastructure field photographs', consent: true }
const ui = language => ({ recipient: language === 'ar' ? 'إلى' : 'To' })
const bodyOf = draft => new URL(draft.gmail).searchParams.get('body')

for (const website of ['ar', 'en']) for (const language of ['ar', 'en']) {
  test(`${language} message on ${website} website selects the written language`, () => {
    const message = language === 'ar' ? '  يرجى تزويدي بمعلومات عن المنصة وآلية مراجعة صور الأعمال الميدانية\nمع الشكر  ' : form.message
    const draft = buildContactDraft({ ...form, message }, ui(website))
    const body = bodyOf(draft)
    assert.ok(body.startsWith(language === 'ar' ? 'السادة' : 'Dear Unified Works'))
    assert.ok(body.includes(`\n\n${message}\n\n`))
    assert.ok(!body.includes('consent') && !body.includes('undefined') && !body.includes('—'))
    assert.ok(!body.includes(language === 'ar' ? 'الجهة:' : 'Organization:'))
    assert.equal(new URL(draft.gmail).searchParams.get('to'), 'info@unifiedworks.net')
    if (draft.mailtoRequiresCopy) {
      assert.equal(new URL(draft.mailto).searchParams.has('body'), false)
      assert.ok(draft.copyText.includes(body))
    } else {
      assert.equal(new URL(draft.mailto).searchParams.get('body').replace(/\r\n/g, '\n'), body)
    }
  })
}

test('mixed messages, subject fallback, and website fallback', () => {
  const mixed = { ...form, message: 'مرحبا hello', subject: '' }
  assert.ok(bodyOf(buildContactDraft(mixed, ui('ar'))).startsWith('السادة'))
  assert.ok(bodyOf(buildContactDraft(mixed, ui('en'))).startsWith('Dear'))
  assert.ok(bodyOf(buildContactDraft({ ...mixed, subject: 'تفاصيل طلب التعاون' }, ui('en'))).startsWith('السادة'))
  assert.ok(bodyOf(buildContactDraft({ ...form, subject: 'طلب معلومات' }, ui('ar'))).startsWith('Dear'))
})

test('all existing categories use distinct professional subjects and introductions', () => {
  for (const language of ['ar', 'en']) {
    const subjects = new Set()
    for (const type of ['partnership', 'business', 'inquiry']) {
      const draft = buildContactDraft({ ...form, type, message: language === 'ar' ? 'يرجى الاطلاع على الطلب المرفق والتواصل بشأن التفاصيل' : form.message }, ui(language))
      subjects.add(new URL(draft.gmail).searchParams.get('su'))
      assert.ok(bodyOf(draft).includes(language === 'ar' ? 'أتواصل معكم' : 'I am contacting you'))
    }
    assert.equal(subjects.size, 3)
  }
  assert.throws(() => buildContactDraft({ ...form, type: 'unknown' }, ui('en')))
})

test('all supplied details and reserved characters survive encoding without raw metadata', () => {
  const filled = { ...form, organization: 'A & B', position: 'Engineer', phone: '+966 555', subject: 'Field review? #1', message: '\nPlease review A&B + #1\n\nExactly as written  ' }
  const draft = buildContactDraft(filled, ui('ar'))
  const body = bodyOf(draft)
  for (const key of ['name', 'email', 'organization', 'position', 'phone', 'subject', 'message']) assert.ok(body.includes(filled[key]))
  assert.ok(new URL(draft.gmail).searchParams.get('su').includes(filled.subject))
  assert.ok(!body.includes('Consent:'))
  assert.equal(new URL(draft.mailto).searchParams.get('body').replace(/\r\n/g, '\n'), body)
})

test('long subjects are concise and long message content remains complete for copying', () => {
  const message = 'نص الرسالة الأصلي\n'.repeat(300)
  const draft = buildContactDraft({ ...form, message, subject: 'تفاصيل '.repeat(60) }, ui('en'))
  assert.ok(new URL(draft.gmail).searchParams.get('su').length < 150)
  assert.equal(draft.gmailRequiresCopy, true)
  assert.equal(draft.mailtoRequiresCopy, true)
  assert.equal(new URL(draft.gmail).searchParams.has('body'), false)
  assert.equal(new URL(draft.mailto).searchParams.has('body'), false)
  assert.ok(draft.copyText.includes(message))
  assert.ok(draft.gmail.length < 8000 && draft.mailto.length < 2000)
})

test('Gmail remains primary with opener isolation and mailto fallback on blocked popup', () => {
  const draft = buildContactDraft(form, ui('en'))
  let destination
  const popup = { opener: {}, location: { replace: url => { assert.equal(popup.opener, null); destination = url } } }
  assert.equal(openContactDraft(draft, { open: () => popup }), 'gmail')
  assert.equal(destination, draft.gmail)
  assert.equal(openContactDraft(draft, { open: () => null, location: { assign: url => { destination = url } } }), 'mailto')
  assert.equal(destination, draft.mailto)
  assert.equal(openContactDraft(draft, { open: () => { throw Error() }, location: { assign: () => { throw Error() } } }), 'manual')
})
