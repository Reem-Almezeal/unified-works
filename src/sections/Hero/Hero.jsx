
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import styles from './Hero.module.css'

const MEDIA = '/media/hero/'

const images = {
  hero: `${MEDIA}field-cover.webp.png`,
  team: `${MEDIA}field-team.webp.png`,
  utilities: `${MEDIA}utility-work.webp.png`,
  inspection: `${MEDIA}site-inspection.webp.png`,
}

const video = '/videos/unified-works.mp4'

const tickerLogos = [
  { src: '/images/organizations/saudi-energy.png', ar: 'السعودية للطاقة', en: 'Saudi Energy' },
  { src: '/images/organizations/water.png', ar: 'المياه والصرف الصحي', en: 'Water and wastewater' },
  { src: '/images/organizations/telecom.png', ar: 'الاتصالات', en: 'Telecommunications' },
  { src: '/images/organizations/municipality.png', ar: 'الأمانات والبلديات', en: 'Municipal authorities' },
]

const content = {
  ar: {
    eyebrow: 'منصة رقمية للإشراف الميداني',
    stakeholdersLabel: 'شعارات الجهات',
    title: 'توثيق ومراجعة',
    accent: 'أعمال البنية التحتية',
    description:
      'توثيق الأعمال بالصور، ومتابعة تنفيذ المقاولين، وتسجيل الملاحظات وقرارات المشرفين لدعم مراجعة الجودة والالتزام بمتطلبات المشروع',
    explore: 'عن المنصة',
    watch: 'عرض المنصة',
    overviewTag: 'عن المنصة / 01',
    overviewTitle: 'وظائف المنصة',
    overviewDescription:
      'الاعمال الموحد منصة رقمية لتوثيق أعمال البنية التحتية والإشراف عليها، وتنظيم سجلات الأعمال الجارية والمنجزة لدعم المراجعة والاعتماد',
    features: [
      {
        title: 'التوثيق الميداني',
        description: 'حفظ صور التنفيذ والملاحظات وقرارات المشرفين في سجلات مرتبطة بمواقع الأعمال ومراحلها',
      },
      {
        title: 'مراقبة جودة التنفيذ',
        description: 'مراجعة التزام المقاولين بمتطلبات المشروع والمعايير الفنية وتوثيق المخالفات والإجراءات التصحيحية',
      },
      {
        title: 'نموذج الذكاء الاصطناعي',
        description: 'يعتمد النظام على نموذج ذكاء اصطناعي مدرّب لتحليل صور الأعمال الميدانية، والتحقق من جودة التنفيذ ومدى مطابقته للمتطلبات الفنية، بما يدعم أعمال المراجعة والإشراف',
      },
    ],
    videoTag: '02 / نظرة عامة',
    videoTitle: 'نظرة عامة',
    videoDescription:
      'عرض مرئي يوضح توثيق الأعمال الميدانية ومتابعة التنفيذ ومراجعة الأدلة وتسجيل نتائج الإشراف',
    processTag: 'إجراءات العمل / 03',
    processTitle: 'آلية العمل',
    processDescription:
      'إجراءات تبدأ بتحديد العمل وتوثيقه، وتنتهي بمراجعة الأدلة وتسجيل قرار القبول أو الرفض وأسبابه',
    steps: [
      {
        title: 'تحديد نطاق العمل',
        description: 'تسجيل موقع العمل ونطاقه ومتطلبات التنفيذ ذات الصلة',
      },
      {
        title: 'توثيق التنفيذ',
        description: 'إرفاق الصور والبيانات والملاحظات المرتبطة بمراحل التنفيذ',
      },
      {
        title: 'مراجعة الأدلة',
        description: 'مراجعة المشرف للصور ومدى مطابقة الأعمال للمتطلبات والمعايير',
      },
      {
        title: 'تسجيل القرار',
        description: 'توثيق القبول أو الرفض وأسبابه ومتابعة الإجراءات التصحيحية',
      },
    ],
    applicationsTag: 'الأثر التشغيلي / 04',
    applicationsTitle: 'الفوائد التشغيلية',
    applicationsDescription:
      'دعم الجهات في ترشيد تكاليف التفتيش وتوزيع موارد الإشراف والحد من إعادة العمل والصيانة التي يمكن تجنبها',
    applications: [
      {
        title: 'متابعة أداء المقاولين',
        description: 'سجلات التنفيذ والملاحظات تدعم تقييم الأداء وتحديد أولويات الإشراف',
        image: images.utilities,
      },
      {
        title: 'كفاءة الزيارات الميدانية',
        description: 'مراجعة الأدلة عن بُعد تساعد في تقليل الزيارات غير الضرورية وتكاليفها',
        image: images.team,
      },
      {
        title: 'رصد مشكلات التنفيذ',
        description: 'الكشف المبكر يدعم التصحيح للحد من إعادة العمل وتكاليف الصيانة اللاحقة',
        image: images.inspection,
      },
    ],
    finalTitle: 'حوكمة الأعمال الميدانية',
    finalDescription:
      'سجلات موثقة تدعم المساءلة وتتبع التنفيذ وقرارات الإشراف لدى الجهات والمقاولين',
    finalAction: 'عن الاعمال الموحد',
    videoUnavailable: 'الفيديو غير متاح حاليًا',
  },

  en: {
    eyebrow: 'DIGITAL FIELD OVERSIGHT',
    stakeholdersLabel: 'Organization logos',
    title: 'Infrastructure works',
    accent: 'Documentation and review',
    description:
      'Document fieldwork with photos, monitor contractor execution, and record observations and supervisor decisions to support quality review and project compliance',
    explore: 'About the platform',
    watch: 'Platform overview',
    overviewTag: 'ABOUT THE PLATFORM / 01',
    overviewTitle: 'Platform Features',
    overviewDescription:
      'Unified Works is a digital platform for documenting and supervising infrastructure operations, with organized records of ongoing and completed work to support review and approval',
    features: [
      {
        title: 'Field documentation',
        description: 'Maintain photographs, observations, and supervisor decisions linked to work locations and execution stages',
      },
      {
        title: 'Contractor quality control',
        description: 'Review compliance with project requirements and technical standards, documenting issues and corrective actions',
      },
      {
        title: 'AI Model',
        description: 'The system uses a trained AI model to analyze fieldwork photographs and assess execution quality and compliance with technical requirements, supporting review and supervision',
      },
    ],
    videoTag: '02 / Overview',
    videoTitle: 'Overview',
    videoDescription:
      'A video overview of field documentation, execution monitoring, evidence review, and supervision records',
    processTag: 'WORK PROCEDURES / 03',
    processTitle: 'How it works',
    processDescription:
      'A review process from defining and documenting the work to recording evidence-based acceptance or rejection and its reasons',
    steps: [
      {
        title: 'Define the work',
        description: 'Record the location, scope, and applicable execution requirements',
      },
      {
        title: 'Document progress',
        description: 'Attach photographs, field data, and observations for each execution stage',
      },
      {
        title: 'Review evidence',
        description: 'Supervisors assess images and work against requirements and standards',
      },
      {
        title: 'Record the decision',
        description: 'Document acceptance or rejection, its reasons, and corrective action follow-up',
      },
    ],
    applicationsTag: 'OPERATIONAL VALUE / 04',
    applicationsTitle: 'Operational benefits',
    applicationsDescription:
      'Support inspection cost control, supervision resource allocation, and reductions in rework and avoidable maintenance',
    applications: [
      {
        title: 'Contractor performance',
        description: 'Execution records and observations support performance assessment and supervision priorities',
        image: images.utilities,
      },
      {
        title: 'Inspection efficiency',
        description: 'Remote evidence review can reduce unnecessary field visits and associated inspection costs',
        image: images.team,
      },
      {
        title: 'Execution issue detection',
        description: 'Early detection supports corrective action to limit rework and subsequent maintenance costs',
        image: images.inspection,
      },
    ],
    finalTitle: 'Field operations governance',
    finalDescription:
      'Documented records support accountability and traceability of execution and supervision decisions across organizations and contractors',
    finalAction: 'About Unified Works',
    videoUnavailable: 'Video currently unavailable',
  },
}

export default function Hero() {
  const [videoStarted, setVideoStarted] = useState(false)
  const { i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')
  const t = content[isArabic ? 'ar' : 'en']

  const scrollToVideo = () => {
    document.getElementById('system-video')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <div className={styles.page} dir={isArabic ? 'rtl' : 'ltr'}>
      <section className={styles.hero} id="hero" aria-labelledby="hero-title">
        <div className={styles.heroBackground} dir="ltr">
          <img src={images.hero} alt="" className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {t.eyebrow}
          </div>

          <h1 className={styles.heroTitle} id="hero-title">
            {t.title}
            <span>{t.accent}</span>
          </h1>

          <p className={styles.heroDescription}>{t.description}</p>

          <div className={styles.heroActions}>
            <Link to="/platform" className={styles.primaryButton}>
              {t.explore}
              <ArrowUpRight size={19} />
            </Link>

            <button
              type="button"
              className={styles.outlineButton}
              onClick={scrollToVideo}
            >
              {t.watch}
              <ArrowDown size={18} />
            </button>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <span>{isArabic ? 'الاعمال الموحد / النظام' : 'Unified Works SYSTEM'}</span>
          <span>01 / 04</span>
        </div>
      </section>

      {/* Repeated logos do not imply confirmed partnerships or adoption. */}
      <section className={styles.stakeholderStrip} aria-label={t.stakeholdersLabel}>
        <div className={styles.stakeholderViewport}>
          <div className={styles.stakeholderTrack} key={isArabic ? 'rtl' : 'ltr'}>
            {[0, 1].map((copy) => (
              <div className={styles.stakeholderGroup} key={copy} aria-hidden={copy === 1}>
                {tickerLogos.map((logo) => (
                  <img
                    className={styles.stakeholderLogo}
                    key={logo.src}
                    src={logo.src}
                    alt={copy === 0 ? isArabic ? logo.ar : logo.en : ''}
                    decoding="async"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial capabilities — no repetitive feature cards */}
      <section className={styles.capabilitiesSection} id="overview" aria-labelledby="capabilities-title">
        <div className={styles.container}>
          <div className={styles.capabilitiesIntro}>
            <div>
              <span className={styles.sectionTag}>{t.overviewTag}</span>
              <h2 id="capabilities-title">{t.overviewTitle}</h2>
            </div>
            <p>{t.overviewDescription}</p>
          </div>
          <div className={styles.capabilityList}>
            {t.features.map((feature, index) => (
              <article className={styles.capabilityRow} key={feature.title}>
                <span className={styles.capabilityNumber}>0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate film: clean background, rounded frame, muted continuous playback */}
      <section className={styles.videoSection} id="system-video" aria-labelledby="video-title">
        <div className={styles.container}>
          <div className={styles.videoIntro}>
            <div>
              <span className={styles.sectionTag}>{t.videoTag}</span>
              <h2 id="video-title">{t.videoTitle}</h2>
            </div>
            <p>{t.videoDescription}</p>
          </div>

          <div className={styles.videoFrame}>
            <video
              className={styles.video}
              src={video}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              preload="metadata"
              poster={images.inspection}
              aria-label={t.videoTitle}
              onPlaying={() => setVideoStarted(true)}
              onError={() => setVideoStarted(false)}
            >
              {t.videoUnavailable}
            </video>
            {!videoStarted && (
              <img
                className={styles.videoPoster}
                src={images.inspection}
                alt=""
                aria-hidden="true"
              />
            )}
          </div>

          <div className={styles.videoCaption}>
            <span>{isArabic ? 'الاعمال الموحد / نظرة عامة على النظام' : 'Unified Works / SYSTEM OVERVIEW'}</span>
            <span>{isArabic ? 'التوثيق والإشراف الميداني' : 'Field documentation and supervision'}</span>
          </div>
        </div>
      </section>

      {/* Linear field workflow instead of a second card grid */}
      <section className={styles.processSection} id="how-it-works" aria-labelledby="process-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionTag}>{t.processTag}</span>
              <h2 id="process-title">{t.processTitle}</h2>
            </div>
            <p>{t.processDescription}</p>
          </div>
          <div className={styles.processTimeline}>
            {t.steps.map((step, index) => (
              <article className={styles.processStep} key={step.title}>
                <span className={styles.processIndex}>0{index + 1}</span>
                <div className={styles.processRule} aria-hidden="true"><span /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.applicationsSection} id="applications">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionTag}>{t.applicationsTag}</span>
              <h2>{t.applicationsTitle}</h2>
            </div>
            <p>{t.applicationsDescription}</p>
          </div>

          <div className={styles.applicationGrid}>
            {t.applications.map((item, index) => (
              <article className={styles.applicationCard} key={item.title}>
                <div className={styles.applicationImage}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>

                <div className={styles.applicationContent}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.container}>
          <div className={styles.finalBanner}>
            <div>
              <span className={styles.finalEyebrow}>{isArabic ? 'الاعمال الموحد' : 'Unified Works'}</span>
              <h2>{t.finalTitle}</h2>
              <p>{t.finalDescription}</p>
            </div>

            <Link to="/about" className={styles.finalButton}>
              {t.finalAction}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


