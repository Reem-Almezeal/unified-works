
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowDown,
  Mail,
  Building2,
  MessageCircle,
  Handshake,
  Send,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Network,
  Globe2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

import styles from './Contact.module.css'

// ضعي البريد الرسمي لاستقبال الاستفسارات وطلبات الشراكة
const CONTACT_EMAIL = ''

const content = {
  ar: {
    eyebrow: 'UNIFIED WORKS / CONTACT',
    overline: 'قنوات التواصل',
    heroTitle: 'تواصل',
    heroAccent: 'معنا.',
    heroDescription:
      'لديك استفسار حول منصة Unified Works أو ترغب بمناقشة فرصة شراكة؟ يسعدنا التواصل معك.',
    contactNow: 'تواصل معنا',
    contactTypes: 'طرق التواصل',
    inquiry: 'استفسار',
    partnership: 'طلب شراكة',
    inquiryDescription:
      'للاستفسارات المتعلقة بالمنصة وآلية عملها وتقنياتها.',
    partnershipDescription:
      'للجهات والشركات الراغبة في بحث فرص التعاون والشراكات.',
    selected: 'المسار المحدد',
    contactSection: 'CONTACT / 01',
    contactTitle: 'ابدأ',
    contactAccent: 'التواصل.',
    contactDescription:
      'اختر نوع التواصل وأدخل بياناتك لتجهيز رسالة البريد الإلكتروني.',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'name@example.com',
    organization: 'الجهة / الشركة',
    organizationPlaceholder: 'اسم الجهة أو الشركة (اختياري)',
    type: 'نوع التواصل',
    message: 'الرسالة',
    messagePlaceholder: 'اكتب تفاصيل استفسارك أو طلب الشراكة...',
    send: 'إرسال الرسالة',
    copy: 'نسخ الرسالة',
    copied: 'تم نسخ الرسالة',
    copyFailed: 'تعذر النسخ، يمكنك المحاولة مجددًا.',
    validation: 'يرجى تعبئة الحقول المطلوبة بشكل صحيح.',
    mailInfo: 'سيتم فتح تطبيق البريد الإلكتروني لإرسال الرسالة.',
    directContact: 'التواصل عبر البريد الإلكتروني',
    directDescription:
      'للاستفسارات الرسمية وطلبات الشراكة.',
    emailAction: 'نسخ البريد',
    emailNotAvailable: 'يمكنك تجهيز الرسالة من النموذج.',
    partnershipTitle: 'شراكات تدعم',
    partnershipAccent: 'مستقبل الأعمال الميدانية.',
    partnershipText:
      'نسعى إلى بناء علاقات تعاون مع الجهات والشركات ذات الاهتمام بتطوير كفاءة الأعمال الميدانية وتعزيز التوثيق والرقابة.',
    partnershipAction: 'تقديم طلب شراكة',
    status: 'RESEARCH PROTOTYPE',
    contactLabel: 'CONTACT CHANNEL',
    partnershipLabel: 'PARTNERSHIP CHANNEL',
    bottom: 'UNIFIED WORKS / INTELLIGENT FIELD OPERATIONS'
  },
  en: {
    eyebrow: 'UNIFIED WORKS / CONTACT',
    overline: 'Contact channels',
    heroTitle: 'Get in',
    heroAccent: 'touch.',
    heroDescription:
      'Have a question about Unified Works or interested in discussing a partnership? We would be pleased to hear from you.',
    contactNow: 'Contact us',
    contactTypes: 'Contact options',
    inquiry: 'General inquiry',
    partnership: 'Partnership request',
    inquiryDescription:
      'Questions about the platform, its workflow, and technologies.',
    partnershipDescription:
      'For organizations and companies interested in exploring collaboration opportunities.',
    selected: 'Selected channel',
    contactSection: 'CONTACT / 01',
    contactTitle: 'Start a',
    contactAccent: 'conversation.',
    contactDescription:
      'Choose a contact type and enter your details to prepare an email.',
    fullName: 'Full name',
    fullNamePlaceholder: 'Enter your full name',
    email: 'Email address',
    emailPlaceholder: 'name@example.com',
    organization: 'Organization / company',
    organizationPlaceholder: 'Organization name (optional)',
    type: 'Contact type',
    message: 'Message',
    messagePlaceholder: 'Enter your inquiry or partnership request...',
    send: 'Send message',
    copy: 'Copy message',
    copied: 'Message copied',
    copyFailed: 'Unable to copy. Please try again.',
    validation: 'Please complete all required fields correctly.',
    mailInfo: 'Your email application will open to send the message.',
    directContact: 'Contact by email',
    directDescription:
      'For official inquiries and partnership requests.',
    emailAction: 'Copy email',
    emailNotAvailable: 'You can prepare your message using the form.',
    partnershipTitle: 'Partnerships shaping',
    partnershipAccent: 'the future of field operations.',
    partnershipText:
      'We aim to establish collaborative relationships with organizations and companies interested in improving field operations, documentation, and oversight.',
    partnershipAction: 'Request a partnership',
    status: 'RESEARCH PROTOTYPE',
    contactLabel: 'CONTACT CHANNEL',
    partnershipLabel: 'PARTNERSHIP CHANNEL',
    bottom: 'UNIFIED WORKS / INTELLIGENT FIELD OPERATIONS'
  }
}

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65 }
}

export default function Contact() {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('ar') ? 'ar' : 'en'
  const t = content[lang]
  const DirectionArrow = lang === 'ar' ? ArrowLeft : ArrowRight

  const [contactType, setContactType] = useState('inquiry')
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  })
  const [feedback, setFeedback] = useState('')

  const updateField = (field, value) => {
    setForm(previous => ({
      ...previous,
      [field]: value
    }))
    setFeedback('')
  }

  const selectType = type => {
    setContactType(type)
    setFeedback('')
  }

  const scrollToForm = type => {
    if (type) selectType(type)
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const buildMessage = () => {
    const typeText = contactType === 'partnership'
      ? t.partnership
      : t.inquiry

    const subject = `[Unified Works] ${typeText}`

    const body = [
      `Contact type: ${typeText}`,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Organization: ${form.organization.trim() || '-'}`,
      '',
      'Message:',
      form.message.trim()
    ].join('\n')

    return { subject, body }
  }

  const isValid = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email.trim()
    )

    return Boolean(
      form.name.trim() &&
      validEmail &&
      form.message.trim()
    )
  }

  const handleSubmit = event => {
    event.preventDefault()
    setFeedback('')

    if (!isValid()) {
      setFeedback(t.validation)
      return
    }

    const { subject, body } = buildMessage()

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  const handleCopy = async () => {
    if (!isValid()) {
      setFeedback(t.validation)
      return
    }

    const { subject, body } = buildMessage()
    const message = `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${body}`

    try {
      await navigator.clipboard.writeText(message)
      setFeedback(t.copied)
    } catch {
      setFeedback(t.copyFailed)
    }
  }

  const handleCopyEmail = async () => {
    if (!CONTACT_EMAIL) return

    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setFeedback(t.copied)
    } catch {
      setFeedback(t.copyFailed)
    }
  }

  return (
    <main
      className={styles.page}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <motion.div className={styles.heroContent} {...reveal}>
              <span className={styles.eyebrow}>{t.eyebrow}</span>
              <span className={styles.overline}>{t.overline}</span>

              <h1>
                {t.heroTitle}
                <span>{t.heroAccent}</span>
              </h1>

              <p>{t.heroDescription}</p>

              <div className={styles.heroActions}>
                <button
                  className={styles.primaryButton}
                  onClick={() => scrollToForm()}
                >
                  {t.contactNow}
                  <DirectionArrow size={19} />
                </button>

                <a href="#contact-options" className={styles.secondaryButton}>
                  {t.contactTypes}
                  <ArrowDown size={18} />
                </a>
              </div>

              <div className={styles.prototypeLabel}>
                <span className={styles.statusDot} />
                {t.status}
              </div>
            </motion.div>

            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <div className={styles.visualTop}>
                <span>UW / COMMUNICATION HUB</span>
                <span className={styles.onlineIndicator}>
                  <span /> CONNECT
                </span>
              </div>

              <div className={styles.visualBody}>
                <div className={styles.visualRings}>
                  <div className={styles.ringOne} />
                  <div className={styles.ringTwo} />
                  <div className={styles.ringThree} />

                  <div className={styles.centerLogo}>
                    <Network size={42} />
                    <strong>UNIFIED</strong>
                    <strong>WORKS</strong>
                  </div>

                  <motion.div
                    className={`${styles.visualNode} ${styles.nodeOne}`}
                    animate={{ y: [0, -9, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <MessageCircle size={25} />
                  </motion.div>

                  <motion.div
                    className={`${styles.visualNode} ${styles.nodeTwo}`}
                    animate={{ y: [0, 9, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5 }}
                  >
                    <Handshake size={25} />
                  </motion.div>

                  <motion.div
                    className={`${styles.visualNode} ${styles.nodeThree}`}
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                  >
                    <Building2 size={25} />
                  </motion.div>

                  <div className={`${styles.visualLabel} ${styles.labelOne}`}>
                    {t.contactLabel}
                  </div>
                  <div className={`${styles.visualLabel} ${styles.labelTwo}`}>
                    {t.partnershipLabel}
                  </div>
                </div>
              </div>

              <div className={styles.visualBottom}>
                <span>UNIFIED WORKS</span>
                <Globe2 size={19} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className={styles.optionsSection} id="contact-options">
        <div className={styles.container}>
          <motion.div className={styles.sectionHeading} {...reveal}>
            <span className={styles.eyebrow}>01 / CONTACT CHANNELS</span>
            <h2>{t.contactTypes}</h2>
          </motion.div>

          <div className={styles.optionsGrid}>
            <motion.button
              {...reveal}
              type="button"
              className={`${styles.optionCard} ${
                contactType === 'inquiry' ? styles.optionActive : ''
              }`}
              onClick={() => scrollToForm('inquiry')}
            >
              <div className={styles.optionHeader}>
                <span>01 / INQUIRY</span>
                <ArrowUpRight size={22} />
              </div>

              <div className={styles.optionIcon}>
                <MessageCircle size={32} />
              </div>

              <h3>{t.inquiry}</h3>
              <p>{t.inquiryDescription}</p>

              <div className={styles.optionFooter}>
                <span>{contactType === 'inquiry' ? t.selected : 'UNIFIED WORKS'}</span>
                <DirectionArrow size={19} />
              </div>
            </motion.button>

            <motion.button
              {...reveal}
              type="button"
              className={`${styles.optionCard} ${
                contactType === 'partnership' ? styles.optionActive : ''
              }`}
              onClick={() => scrollToForm('partnership')}
            >
              <div className={styles.optionHeader}>
                <span>02 / PARTNERSHIP</span>
                <ArrowUpRight size={22} />
              </div>

              <div className={styles.optionIcon}>
                <Handshake size={32} />
              </div>

              <h3>{t.partnership}</h3>
              <p>{t.partnershipDescription}</p>

              <div className={styles.optionFooter}>
                <span>{contactType === 'partnership' ? t.selected : 'UNIFIED WORKS'}</span>
                <DirectionArrow size={19} />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className={styles.formSection} id="contact-form">
        <div className={styles.container}>
          <div className={styles.formLayout}>
            <motion.div className={styles.formInformation} {...reveal}>
              <span className={styles.eyebrow}>{t.contactSection}</span>

              <h2>
                {t.contactTitle}
                <span>{t.contactAccent}</span>
              </h2>

              <p>{t.contactDescription}</p>

              <div className={styles.emailCard}>
                <div className={styles.emailIcon}>
                  <Mail size={27} />
                </div>

                <div className={styles.emailDetails}>
                  <strong>{t.directContact}</strong>
                  <p>{t.directDescription}</p>
                  <span dir="ltr">
                    {CONTACT_EMAIL || t.emailNotAvailable}
                  </span>
                </div>

                {CONTACT_EMAIL && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title={t.emailAction}
                    aria-label={t.emailAction}
                  >
                    <Copy size={18} />
                  </button>
                )}
              </div>

              <div className={styles.privacyNote}>
                <ShieldCheck size={20} />
                <span>{t.mailInfo}</span>
              </div>
            </motion.div>

            <motion.form
              className={styles.formCard}
              onSubmit={handleSubmit}
              {...reveal}
            >
              <div className={styles.formHeader}>
                <span>NEW CONTACT / 001</span>
                <span className={styles.headerDot} />
              </div>

              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>{t.fullName} *</span>
                  <input
                    type="text"
                    placeholder={t.fullNamePlaceholder}
                    value={form.name}
                    onChange={e => updateField('name', e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span>{t.email} *</span>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder={t.emailPlaceholder}
                    value={form.email}
                    onChange={e => updateField('email', e.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span>{t.organization}</span>
                <input
                  type="text"
                  placeholder={t.organizationPlaceholder}
                  value={form.organization}
                  onChange={e => updateField('organization', e.target.value)}
                />
              </label>

              <div className={styles.field}>
                <span>{t.type}</span>

                <div className={styles.typeButtons}>
                  <button
                    type="button"
                    className={contactType === 'inquiry' ? styles.typeActive : ''}
                    onClick={() => selectType('inquiry')}
                  >
                    <MessageCircle size={16} />
                    {t.inquiry}
                  </button>

                  <button
                    type="button"
                    className={contactType === 'partnership' ? styles.typeActive : ''}
                    onClick={() => selectType('partnership')}
                  >
                    <Handshake size={16} />
                    {t.partnership}
                  </button>
                </div>
              </div>

              <label className={styles.field}>
                <span>{t.message} *</span>
                <textarea
                  rows={6}
                  placeholder={t.messagePlaceholder}
                  value={form.message}
                  onChange={e => updateField('message', e.target.value)}
                  required
                />
              </label>

              {feedback && (
                <div className={styles.feedback} role="status">
                  {feedback === t.copied && <CheckCircle2 size={18} />}
                  {feedback}
                </div>
              )}

              <button type="submit" className={styles.submitButton}>
                {t.send}
                <Send size={19} />
              </button>

              <button
                type="button"
                className={styles.copyButton}
                onClick={handleCopy}
              >
                <Copy size={17} />
                {t.copy}
              </button>

              <p className={styles.formNote}>{t.mailInfo}</p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP CTA */}
      <section className={styles.partnershipSection}>
        <div className={styles.container}>
          <motion.div className={styles.partnershipCard} {...reveal}>
            <div className={styles.partnershipGlow} />

            <div className={styles.partnershipContent}>
              <span className={styles.eyebrow}>UNIFIED WORKS / PARTNERSHIPS</span>

              <h2>
                {t.partnershipTitle}
                <span>{t.partnershipAccent}</span>
              </h2>

              <p>{t.partnershipText}</p>

              <button
                type="button"
                onClick={() => scrollToForm('partnership')}
                className={styles.primaryButton}
              >
                {t.partnershipAction}
                <DirectionArrow size={19} />
              </button>
            </div>

            <div className={styles.partnershipArtwork}>
              <Handshake size={110} strokeWidth={0.8} />
              <div className={styles.artworkRing} />
            </div>
          </motion.div>
        </div>
      </section>

      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <span>{t.bottom}</span>
          <span>© {new Date().getFullYear()} UNIFIED WORKS</span>
        </div>
      </div>
    </main>
  )
}
