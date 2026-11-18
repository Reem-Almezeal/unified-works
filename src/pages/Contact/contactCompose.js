const RECIPIENT = 'info@unifiedworks.net'

const wording = {
  ar: {
    brand: 'الاعمال الموحد', greeting: 'السادة فريق الاعمال الموحد المحترمين\nالسلام عليكم ورحمة الله وبركاته',
    contact: 'بيانات مقدم الطلب:', name: 'الاسم', organization: 'الجهة', position: 'المسمى الوظيفي', email: 'البريد الإلكتروني', phone: 'رقم التواصل',
    closing: 'مع الشكر لوقتكم، نأمل الاطلاع على الطلب والتواصل عند الحاجة إلى معلومات إضافية\n\nمع خالص التحية والتقدير',
    recipient: 'إلى', subject: 'الموضوع',
    categories: {
      partnership: ['طلب تعاون وشراكة', 'أتواصل معكم للاستفسار عن فرص التعاون والشراكة'],
      business: ['طلب عرض توضيحي للمنصة', 'أتواصل معكم لطلب التعرف على المنصة وإمكانية ترتيب عرض توضيحي'],
      inquiry: ['استفسار عام', 'أتواصل معكم لطلب معلومات بشأن المنصة'],
    },
  },
  en: {
    brand: 'Unified Works', greeting: 'Dear Unified Works Team,',
    contact: 'Contact Information:', name: 'Name', organization: 'Organization', position: 'Job Title', email: 'Email', phone: 'Phone',
    closing: 'Thank you for your time and consideration. I look forward to your response\n\nBest regards,',
    recipient: 'To', subject: 'Subject',
    categories: {
      partnership: ['Cooperation and Partnership Inquiry', 'I am contacting you to inquire about opportunities for cooperation and partnership'],
      business: ['Platform Demonstration Request', 'I am contacting you to learn more about the platform and request a demonstration'],
      inquiry: ['General Inquiry', 'I am contacting you to request information about the platform'],
    },
  },
}

function dominantLanguage(text) {
  const letters = [...text].filter(character => /\p{Letter}/u.test(character))
  const arabic = letters.filter(character => /\p{Script=Arabic}/u.test(character)).length
  const latin = letters.filter(character => /\p{Script=Latin}/u.test(character)).length
  if (!letters.length) return null
  if (arabic / letters.length >= 0.6) return 'ar'
  if (latin / letters.length >= 0.6) return 'en'
  return null
}

export function buildContactDraft(form, translations) {
  // The message takes precedence; use the subject only when the message is ambiguous.
  const language = dominantLanguage(form.message) || dominantLanguage(form.subject) ||
    (translations.recipient === 'إلى' ? 'ar' : 'en')
  const t = wording[language]
  const category = t.categories[form.type]
  if (!category) throw new Error('Unknown inquiry category')
  const suppliedSubject = form.subject.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim()
  const meaningfulSubject = /\p{Letter}{2}/u.test(suppliedSubject) ? suppliedSubject : ''
  const conciseSubject = [...meaningfulSubject].slice(0, 70).join('')
  const subject = `${category[0]}${conciseSubject ? `: ${conciseSubject}${[...meaningfulSubject].length > 70 ? '…' : ''}` : ''} | ${t.brand}`
  const contacts = ['name', 'organization', 'position', 'email', 'phone']
    .filter(key => form[key]?.trim())
    .map(key => `${t[key]}: ${form[key].trim()}`)
  const introduction = `${category[1]}${meaningfulSubject ? ` (${meaningfulSubject})` : ''}`
  // Do not trim, normalize, translate, or otherwise rewrite the original message.
  const body = [t.greeting, '', introduction, '', form.message, '', t.contact,
    ...contacts, '', t.closing, form.name.trim()].join('\n')
  const gmail = new URL('https://mail.google.com/mail/')
  gmail.search = new URLSearchParams({ view: 'cm', fs: '1', to: RECIPIENT, su: subject, body }).toString()
  let mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r\n?|\n/g, '\r\n'))}`
  const gmailRequiresCopy = gmail.href.length > 8000
  const mailtoRequiresCopy = mailto.length > 2000
  // Avoid passing a potentially truncated draft. Keep the entire email in copyText.
  if (gmailRequiresCopy) gmail.searchParams.delete('body')
  if (mailtoRequiresCopy) mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}`
  return {
    gmail: gmail.toString(), mailto, gmailRequiresCopy, mailtoRequiresCopy,
    copyText: `${t.recipient}: ${RECIPIENT}\n${t.subject}: ${subject}\n\n${body}`,
  }
}

export function openContactDraft(draft, browser = window) {
  let popup
  try {
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
    return 'manual'
  }
}
