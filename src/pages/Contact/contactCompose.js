const RECIPIENT = 'info@unifiedworks.net'

export function buildContactDraft(form, translations) {
  const category = translations.types.find(item => item.id === form.type)?.title
  if (!category) throw new Error('Unknown inquiry category')
  const fields = [
    [translations.name, form.name], [translations.email, form.email],
    [translations.organization, form.organization], [translations.position, form.position],
    [translations.phone, form.phone], [translations.type, category],
    [translations.subject, form.subject],
  ]
  const subject = `Unified Works | ${category}`
  const body = [
    translations.emailTitle, '',
    ...fields.map(([label, value]) => `${label}: ${value.trim() || '—'}`), '',
    `${translations.message}:`, form.message.trim().replace(/\r\n?/g, '\n'), '',
    `${translations.emailConsent}: ${form.consent ? translations.yes : translations.no}`,
  ].join('\n')
  const gmail = new URL('https://mail.google.com/mail/')
  gmail.search = new URLSearchParams({ view: 'cm', fs: '1', to: RECIPIENT, su: subject, body }).toString()
  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`
  return {
    gmail: gmail.toString(), mailto,
    copyText: `${translations.recipient}: ${RECIPIENT}\n${translations.subject}: ${subject}\n\n${body}`,
  }
}

export function openContactDraft(draft, browser = window) {
  let popup
  try {
    // Open synchronously in the submit gesture, then sever opener before navigation.
    // Using the noopener feature here would itself return null in some browsers,
    // making a successful opening indistinguishable from popup blocking.
    popup = browser.open('about:blank', '_blank')
    if (popup) {
      popup.opener = null
      popup.location.replace(draft.gmail)
      return 'gmail'
    }
  } catch {
    try { popup?.close() } catch { /* The browser may already have closed it. */ }
  }
  try {
    browser.location.assign(draft.mailto)
    return 'mailto'
  } catch {
    // Keep the explicit mailto link and copy option available in the form.
    return 'manual'
  }
}
