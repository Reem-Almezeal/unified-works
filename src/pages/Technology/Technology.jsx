
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  MapPin,
  ScanSearch,
  ClipboardCheck,
  CheckCircle2,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react'
import styles from './Technology.module.css'

/*
  Save your images in:
  public/images/technology/

  Public files are referenced starting with /images,
  not /public/images.
*/


const IMAGES = {
  hero: '/images/technology/technology-infrastructure-main.png',
  documentation: '/images/technology/technology-field-documentation.png',
  verification: '/images/technology/technology-ai-verification.png',
  geospatial: '/images/technology/technology-geospatial.png',
  monitoring: '/images/technology/technology-monitoring.png',
  workflow: '/media/hero/utility-work.webp.png',
  dashboard: '/images/platform/platform-overview.webp.png',
}


const content = {
  ar: {
    heroLabel: 'UNIFIED WORKS / TECHNOLOGY',
    heroTitle: 'تقنية تدعم الميدان',
    heroAccent: 'ورقابة أدق على التنفيذ',
    heroText:
      'نجمع التوثيق الميداني، والربط الجغرافي، والمراجعة المدعومة بالذكاء الاصطناعي في منظومة واحدة لمتابعة أعمال البنية التحتية بوضوح أكبر',
    explore: 'استكشف التقنيات',
    heroImageLabel: 'INFRASTRUCTURE INTELLIGENCE',

    stats: [
      { value: 100, suffix: '', label: 'صورة ضمن تجربة التحقق' },
      { value: 94, suffix: '%', label: 'نسبة الصور المقبولة في التجربة' },
      { value: 4, suffix: '', label: 'مراحل مترابطة للعمل' },
    ],
    statsNote: 'نتائج تجربة التحقق الأولية للمشروع',

    featuresLabel: '01 / القدرات التقنية',
    featuresTitle: 'قدرات النظام',
    featuresDescription:
      'تقنيات متكاملة لتحويل الأعمال الميدانية إلى معلومات موثقة وقابلة للمراجعة',

    features: [
      {
        number: '01',
        label: 'FIELD DOCUMENTATION',
        title: 'التوثيق الميداني',
        description:
          'تسجيل الأعمال وإرفاق الصور والمعلومات المرتبطة بكل مرحلة من مراحل التنفيذ',
        image: IMAGES.documentation,
      },
      {
        number: '02',
        label: 'AI-ASSISTED VERIFICATION',
        title: 'التحقق الذكي',
        description:
          'المساعدة في مراجعة الصور الميدانية وإبراز الحالات التي تتطلب تدقيقًا إضافيًا',
        image: IMAGES.verification,
      },
      {
        number: '03',
        label: 'LOCATION INTELLIGENCE',
        title: 'الربط الجغرافي',
        description:
          'ربط السجلات بالمواقع الجغرافية لدعم التتبع والإشراف على أعمال البنية التحتية',
        image: IMAGES.geospatial,
      },
    ],

    processLabel: '02 / آلية العمل',
    processTitle: 'آلية العمل',
    processDescription:
      'تسلسل واضح يربط البيانات الميدانية بالجهات المسؤولة عن المتابعة',
    processImageLabel: 'FIELD OPERATIONS / WORKFLOW',

    steps: [
      {
        title: 'تسجيل الأعمال',
        description:
          'إدخال بيانات العمل وتحديد موقعه الجغرافي',
      },
      {
        title: 'توثيق التنفيذ',
        description:
          'رفع الصور والمرفقات المرتبطة بالعمل الميداني',
      },
      {
        title: 'التحقق الذكي',
        description:
          'المساعدة في فحص التوثيق وإبراز الملاحظات المحتملة',
      },
      {
        title: 'المراجعة والاعتماد',
        description:
          'إتاحة السجلات للجهات المختصة وفق الصلاحيات',
      },
    ],

    resultsLabel: '03 / التحقق والتقييم',
    resultsTitle: 'نتائج التحقق',
    resultsText:
      'أظهرت التجربة الأولية للنظام قبول 94 صورة من أصل 100 صورة تم اختبارها، في إطار تقييم قدرات التحقق من التوثيق الميداني ودعم عمليات مراجعة جودة التنفيذ',
    accepted: 'صورة مقبولة',
    total: 'من أصل 100 صورة',
    dashboardLabel: 'UNIFIED WORKS / PLATFORM',

    closing:
      'توثيق موحد ومتابعة أدق',
    unavailable: 'الصورة غير متاحة',
  },

  en: {
    heroLabel: 'UNIFIED WORKS / TECHNOLOGY',
    heroTitle: 'Technology for the field',
    heroAccent: 'Better execution oversight',
    heroText:
      'We connect field documentation, geospatial context, and AI-assisted verification to make infrastructure operations clearer and easier to review',
    explore: 'Explore technology',
    heroImageLabel: 'INFRASTRUCTURE INTELLIGENCE',

    stats: [
      { value: 100, suffix: '', label: 'Images in the validation experiment' },
      { value: 94, suffix: '%', label: 'Image acceptance rate in the experiment' },
      { value: 4, suffix: '', label: 'Connected workflow stages' },
    ],
    statsNote: 'Results from the project validation experiment',

    featuresLabel: '01 / CORE CAPABILITIES',
    featuresTitle: 'System capabilities',
    featuresDescription:
      'Connected technologies turn field activities into documented, reviewable information',

    features: [
      {
        number: '01',
        label: 'FIELD DOCUMENTATION',
        title: 'Field documentation',
        description:
          'Capture images and information linked to every stage of field execution',
        image: IMAGES.documentation,
      },
      {
        number: '02',
        label: 'AI-ASSISTED VERIFICATION',
        title: 'AI-assisted verification',
        description:
          'Support image review and highlight records that may require additional attention',
        image: IMAGES.verification,
      },
      {
        number: '03',
        label: 'LOCATION INTELLIGENCE',
        title: 'Geospatial intelligence',
        description:
          'Connect field records to geographic locations for better tracking and oversight',
        image: IMAGES.geospatial,
      },
    ],

    processLabel: '02 / WORKFLOW',
    processTitle: 'How it works',
    processDescription:
      'A connected workflow linking field information to responsible stakeholders',
    processImageLabel: 'FIELD OPERATIONS / WORKFLOW',

    steps: [
      {
        title: 'Register work',
        description:
          'Create an activity record with geographic information',
      },
      {
        title: 'Document progress',
        description:
          'Attach field photographs and supporting documents',
      },
      {
        title: 'AI-assisted verification',
        description:
          'Support documentation checks and highlight potential observations',
      },
      {
        title: 'Review and approval',
        description:
          'Make records available to authorized stakeholders',
      },
    ],

    resultsLabel: '03 / VALIDATION & EVALUATION',
    resultsTitle: 'Verification results',
    resultsText:
      'The initial system evaluation recorded 94 accepted images out of 100 tested, demonstrating the application of verification capabilities to field documentation and quality review workflows',
    accepted: 'Accepted images',
    total: 'Out of 100 images',
    dashboardLabel: 'UNIFIED WORKS / PLATFORM',

    closing:
      'Connected records and clearer oversight',
    unavailable: 'Image unavailable',
  },
}

/* Reveal elements when they enter the viewport */
function Reveal({ children, className = '', delay = 0 }) {
  const elementRef = useRef(null)
  const [visible, setVisible] = useState(() =>
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px 35px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* Count from 0 to the target value */
function AnimatedNumber({ value, duration = 1800 }) {
  const elementRef = useRef(null)
  const skipAnimation = !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let frameId = null
    let startTime = null

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.round(value * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        observer.disconnect()
        frameId = requestAnimationFrame(animate)
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [value, duration])

  return (
    <span ref={elementRef} className={styles.countDigits}>
      {skipAnimation ? value : count}
    </span>
  )
}

/* Show a clear fallback if the image file does not exist */
function ProjectImage(props) {
  return <ProjectImageContent key={props.src} {...props} />
}

function ProjectImageContent({ src, alt, fallbackText, eager = false }) {
  const [failed, setFailed] = useState(false)


  if (failed) {
    return (
      <div className={styles.imageFallback}>
        <ImageIcon size={32} strokeWidth={1.5} />
        <span>{fallbackText}</span>
        <small>{src}</small>
      </div>
    )
  }

  return (
    <img
      className={styles.projectImage}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  )
}

export default function Technology() {
  const { i18n } = useTranslation()
  const isArabic = i18n.language?.startsWith('ar')
  const t = content[isArabic ? 'ar' : 'en']

  const stepIcons = [
    MapPin,
    Camera,
    ScanSearch,
    ClipboardCheck,
  ]

  useEffect(() => {
    document.title = isArabic
      ? 'التقنية | الأعمال الموحّدة'
      : 'Technology | Unified Works'
  }, [isArabic])

  return (
    <main className={styles.page} dir={isArabic ? 'rtl' : 'ltr'}>

      {/* 01 - TECHNOLOGY INTRO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>

            <Reveal className={styles.heroContent}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                {t.heroLabel}
              </span>

              <h1>
                {t.heroTitle}
                <span>{t.heroAccent}</span>
              </h1>

              <p>{t.heroText}</p>

              <a href="#tech-capabilities" className={styles.exploreLink}>
                {t.explore}
                <ArrowDown size={18} />
              </a>
            </Reveal>

            <Reveal className={styles.heroVisual} delay={120}>
              <ProjectImage
                src={IMAGES.hero}
                alt="Underground infrastructure and utility networks"
                fallbackText={t.unavailable}
                eager
              />
            </Reveal>

          </div>
        </div>
      </section>

      {/* 02 - ANIMATED METRICS */}
      <section className={styles.metrics}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            {t.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div className={styles.metric}>
                  <div className={styles.metricNumber}>
                    <AnimatedNumber value={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>
                  <p>{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className={styles.metricsNote}>{t.statsNote}</p>
        </div>
      </section>

      {/* 03 - TECHNOLOGY CAPABILITIES */}
      <section id="tech-capabilities" className={styles.capabilities}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>
                  {t.featuresLabel}
                </span>
                <h2>{t.featuresTitle}</h2>
              </div>
              <p>{t.featuresDescription}</p>
            </div>
          </Reveal>

          <div className={styles.capabilitiesGrid}>
            {t.features.map((feature, index) => (
              <Reveal key={feature.number} delay={index * 100}>
                <article className={styles.capabilityCard}>
                  <div className={styles.capabilityVisual}>
                    <ProjectImage
                      src={feature.image}
                      alt={feature.title}
                      fallbackText={t.unavailable}
                    />
                  </div>

                  <div className={styles.cardMeta}>
                    <span>{feature.label}</span>
                    <ArrowUpRight size={19} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 - FIELD WORKFLOW */}
      <section className={styles.workflow}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>
                  {t.processLabel}
                </span>
                <h2>{t.processTitle}</h2>
              </div>
              <p>{t.processDescription}</p>
            </div>
          </Reveal>

          <div className={styles.workflowGrid}>
            <Reveal className={styles.workflowVisual}>
              <ProjectImage
                src={IMAGES.workflow}
                alt="Field utility network installation"
                fallbackText={t.unavailable}
              />
            </Reveal>

            <div className={styles.steps}>
              {t.steps.map((step, index) => {
                const Icon = stepIcons[index]

                return (
                  <Reveal key={step.title} delay={index * 70}>
                    <article className={styles.step}>
                      <div className={styles.stepIcon}>
                        <Icon size={22} strokeWidth={1.7} />
                      </div>

                      <div className={styles.stepContent}>
                        <span>0{index + 1}</span>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05 - VALIDATION RESULTS */}
      <section className={styles.results}>
        <div className={styles.container}>
          <div className={styles.resultsGrid}>

            <Reveal className={styles.resultsContent}>
              <span className={styles.sectionLabel}>
                {t.resultsLabel}
              </span>

              <h2>{t.resultsTitle}</h2>
              <p>{t.resultsText}</p>

              <div className={styles.resultNumber}>
                <strong>
                  <AnimatedNumber value={94} duration={2100} />
                </strong>
                <span>/ 100</span>
              </div>

              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={94}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${t.accepted} ${t.total}`}
              >
                <div className={styles.progressFill} />
              </div>

              <div className={styles.resultCaption}>
                <CheckCircle2 size={19} />
                <span>{t.accepted} — {t.total}</span>
              </div>
            </Reveal>

            <Reveal className={styles.resultsVisual} delay={100}>
              <ProjectImage
                src={IMAGES.dashboard}
                alt="Unified Works dashboard"
                fallbackText={t.unavailable}
              />
            </Reveal>

          </div>
        </div>
      </section>

      {/* CLOSING STRIP */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <div className={styles.closingText}>
            <ShieldCheck size={23} />
            <strong>{t.closing}</strong>
          </div>
          <span>UNIFIED WORKS / FIELD INTELLIGENCE</span>
        </div>
      </section>

    </main>
  )
}