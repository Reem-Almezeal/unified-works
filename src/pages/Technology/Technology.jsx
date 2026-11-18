
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
    heroLabel: 'الاعمال الموحد / التقنية',
    heroTitle: 'التقنية',
    heroAccent: 'المستخدمة',
    heroText:
      'يستخدم النظام نموذج ذكاء اصطناعي مدرّبًا على بيانات ميدانية فعلية لتحليل صور التنفيذ ومساندة المشرف في التحقق من جودة أعمال المقاولين وتوثيق نتائج المراجعة',
    explore: 'التقنيات المستخدمة',
    heroImageLabel: 'توثيق أعمال البنية التحتية',

    stats: [
      { value: 100, suffix: '', label: 'صورة في اختبار القبول' },
      { value: 94, suffix: '%', label: 'نسبة القبول الصحيح للصور' },
      { value: 4, suffix: '', label: 'مراحل التوثيق والتحقق' },
    ],
    statsNote: 'شملت اختبارات التحقق 148 صورة ميدانية فعلية، وسُجل قبول صحيح لـ94 صورة من أصل 100 بعد 10 اعتمادات من المشرف، وفق شروط التقييم',

    featuresLabel: '01 / التوثيق والتحليل',
    featuresTitle: 'مكونات النظام',
    featuresDescription:
      'يجمع النظام توثيق الصور وتحليلها وسجلات المراجعة للتحقق من متطلبات التنفيذ، وتتيح منهجية تخصيص النماذج مواءمة التحقق مع معايير الجودة لدى كل جهة',

    features: [
      {
        number: '01',
        label: 'أدلة التنفيذ',
        title: 'التوثيق الميداني',
        description:
          'تُحفظ صور مراحل التنفيذ مع بيانات الموقع والوقت وسجل العمل لتوفير أدلة موثقة على أعمال المقاول ومدى استيفائها للمتطلبات الفنية',
        image: IMAGES.documentation,
      },
      {
        number: '02',
        label: 'التحليل والتدريب',
        title: 'تدريب النماذج',
        description:
          'طُوّر النموذج ودُرّب على بيانات ميدانية موثوقة واختُبر على صور فعلية، ويمكن تخصيصه لمعايير كل جهة وتحسينه بتدريب لاحق خاضع للمراجعة على الصور والقرارات المعتمدة، لدعم اتساق التوصيات وتقليل الفحص المتكرر مع بقاء القرار النهائي للمشرف',
        image: IMAGES.verification,
      },
      {
        number: '03',
        label: 'بيانات الموقع',
        title: 'سجلات الأعمال',
        description:
          'تجمع السجلات مواقع الأعمال والصور والملاحظات وقرارات المشرفين، لتتبع نتائج المراجعة والرجوع إليها في التدقيق وتقييم أداء المقاولين',
        image: IMAGES.geospatial,
      },
    ],

    processLabel: '02 / إجراءات العمل',
    processTitle: 'آلية العمل',
    processDescription:
      'يساند التحقق الأولي والمراجعة المركزية تقليل الفحص المتكرر والزيارات غير الضرورية، ويساعد اكتشاف مشكلات التنفيذ مبكرًا في الحد من إعادة العمل وتكاليف المتابعة والصيانة',
    processImageLabel: 'مراحل مراجعة الأعمال',

    steps: [
      {
        title: 'تسجيل الحضور',
        description:
          'يسجل الفريق حضوره في موقع التنفيذ، ويثبت التطبيق بيانات الموقع والمعلومات المرتبطة بالعمل',
      },
      {
        title: 'توثيق التنفيذ',
        description:
          'يلتقط الفريق صور الأعمال المنفذة، وتُربط الصور بوقت الالتقاط وموقع التنفيذ وسجل النشاط',
      },
      {
        title: 'تحليل الصور',
        description:
          'يحلل النموذج المدرّب الصور وفق معايير المراجعة لدعم التحقق الأولي وتحديد الحالات التي تستدعي فحص المشرف',
      },
      {
        title: 'مراجعة المشرف',
        description:
          'يراجع المشرف الأدلة ويسجل قرار الاعتماد أو الرفض، وتُحفظ الصور والقرارات المتحقق منها مرجعًا للمراجعة والتدريب اللاحق',
      },
    ],

    resultsLabel: '03 / تقييم النموذج',
    resultsTitle: 'نتائج الاختبارات',
    resultsText:
      'سجلت اختبارات التحقق قيم دقة 79.4% و96.8% و99.5% و99.9% عند المقارنة بين كميات مختلفة من الصور المعتمدة، وسُجل قبول صحيح لـ94 صورة من أصل 100 بعد 10 اعتمادات من المشرف، وتعكس النتائج شروط التقييم ولا تضمن الأداء نفسه في جميع بيئات التشغيل',
    accepted: 'صور مقبولة بصورة صحيحة',
    total: 'من أصل 100 صورة بعد 10 اعتمادات من المشرف',
    dashboardLabel: 'الاعمال الموحد / لوحة المتابعة',

    closing:
      'توثيق قرارات المراجعة',
    unavailable: 'الصورة غير متاحة',
  },

  en: {
    heroLabel: 'Unified Works / TECHNOLOGY',
    heroTitle: 'System',
    heroAccent: 'technology',
    heroText:
      'The system uses an AI model trained on real field data to analyze execution photographs, assist supervisors in checking contractor work quality, and document review outcomes',
    explore: 'Technologies used',
    heroImageLabel: 'INFRASTRUCTURE DOCUMENTATION',

    stats: [
      { value: 100, suffix: '', label: 'Images in the acceptance test' },
      { value: 94, suffix: '%', label: 'Correct image acceptance rate' },
      { value: 4, suffix: '', label: 'Documentation and verification stages' },
    ],
    statsNote: 'Verification testing covered 148 real field images, with 94 correctly accepted images out of 100 recorded after 10 supervisor approvals under the evaluation conditions',

    featuresLabel: '01 / DOCUMENTATION AND ANALYSIS',
    featuresTitle: 'System components',
    featuresDescription:
      'The system combines image documentation, analysis, and review records to check execution requirements; model customization provides a method for aligning verification with each organization’s quality criteria',

    features: [
      {
        number: '01',
        label: 'EXECUTION EVIDENCE',
        title: 'Field documentation',
        description:
          'Execution photographs are retained with location, time, and work records to provide documented evidence of contractor activities and compliance with technical requirements',
        image: IMAGES.documentation,
      },
      {
        number: '02',
        label: 'ANALYSIS AND TRAINING',
        title: 'Model training',
        description:
          'The model was developed and trained on reliable field data and tested on real images; it can be adapted to each organization’s criteria and improved through reviewed training on validated image-decision records to support consistent recommendations and reduce repetitive checks, with final decisions retained by supervisors',
        image: IMAGES.verification,
      },
      {
        number: '03',
        label: 'LOCATION DATA',
        title: 'Work records',
        description:
          'Records bring together work locations, photographs, observations, and supervisor decisions so review outcomes can be traced and referenced during audits and contractor evaluations',
        image: IMAGES.geospatial,
      },
    ],

    processLabel: '02 / OPERATING PROCEDURE',
    processTitle: 'How it works',
    processDescription:
      'Preliminary verification and centralized review can reduce repetitive checks and unnecessary site visits; earlier identification of execution issues can help limit rework, follow-up inspections, and maintenance costs',
    processImageLabel: 'WORK REVIEW STAGES',

    steps: [
      {
        title: 'Field check-in',
        description:
          'The crew checks in at the execution site and the application records the location and associated work details',
      },
      {
        title: 'Execution documentation',
        description:
          'The crew photographs completed work, with images associated with capture time, execution location, and the activity record',
      },
      {
        title: 'Image analysis',
        description:
          'The trained model analyzes images against review criteria to support preliminary verification and identify cases requiring supervisor attention',
      },
      {
        title: 'Supervisor review',
        description:
          'The supervisor reviews the evidence and records approval or rejection; validated images and decisions are retained for review reference and subsequent training',
      },
    ],

    resultsLabel: '03 / MODEL EVALUATION',
    resultsTitle: 'Test results',
    resultsText:
      'Verification tests recorded accuracy values of 79.4%, 96.8%, 99.5%, and 99.9% when comparing different quantities of approved images, with 94 correctly accepted images out of 100 after 10 supervisor approvals; results reflect the evaluation conditions and do not guarantee the same performance in every operating environment',
    accepted: 'Correctly accepted images',
    total: 'Out of 100 images after 10 supervisor approvals',
    dashboardLabel: 'Unified Works / MONITORING DASHBOARD',

    closing:
      'Review decision records',
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
      ? 'التقنية | الاعمال الموحد'
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
                alt={isArabic ? 'البنية التحتية وشبكات المرافق تحت الأرض' : 'Underground infrastructure and utility networks'}
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
                alt={isArabic ? 'تنفيذ شبكات المرافق في الموقع' : 'Utility network installation at the worksite'}
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
                alt={isArabic ? 'لوحة متابعة الاعمال الموحد' : 'Unified Works monitoring dashboard'}
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
          <span>{isArabic ? 'الاعمال الموحد / التوثيق والتحقق' : 'Unified Works / DOCUMENTATION AND VERIFICATION'}</span>
        </div>
      </section>

    </main>
  )
}
