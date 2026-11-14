
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

const content = {
  ar: {
    eyebrow: 'منصة ذكية لإدارة الأعمال الميدانية',
    stakeholdersLabel: 'جهات وقطاعات مستهدفة للتكامل',
    stakeholders: ['الشركة السعودية للكهرباء', 'شركة المياه الوطنية', 'هيئة الاتصالات والفضاء والتقنية', 'وزارة البلديات والإسكان', 'الأمانات والبلديات', 'مشغلو شبكات الاتصالات', 'الجهات التنظيمية', 'مقاولو البنية التحتية'],
    title: 'كل عمل ميداني',
    accent: 'تحت رؤية واحدة',
    description:
      'من توثيق الأعمال الميدانية إلى متابعة جودة التنفيذ، منصة موحدة تربط الجهات والمقاولين وتدعم اتخاذ القرار بالذكاء الاصطناعي',
    explore: 'اكتشف المنصة',
    watch: 'شاهد كيف يعمل النظام',
    overviewTag: 'UNIFIED WORKS / 01',
    overviewTitle: 'رؤية موحدة لأعمال ميدانية أكثر كفاءة',
    overviewDescription:
      'يجمع نظام الأعمال الموحدة التوثيق الميداني ومتابعة المقاولين ومراجعة جودة التنفيذ في تجربة مترابطة، لتكون المعلومات متاحة للجهات المعنية في مكان واحد',
    features: [
      {
        title: 'توثيق ميداني',
        description: 'توثيق مراحل التنفيذ بالصور والبيانات المرتبطة بالموقع والوقت',
      },
      {
        title: 'متابعة الجودة',
        description: 'مراجعة الأعمال الميدانية والتحقق من الالتزام بمتطلبات التنفيذ',
      },
      {
        title: 'تحليل ذكي',
        description: 'دعم عمليات المراجعة باستخدام تقنيات الذكاء الاصطناعي',
      },
    ],
    videoTag: 'SYSTEM OVERVIEW / 02',
    videoTitle: 'تعرّف على النظام عن قرب',
    videoDescription:
      'شاهد كيف يربط النظام بين العمل الميداني والتوثيق ومراجعة الجودة والإشراف في تجربة واحدة',
    processTag: 'HOW IT WORKS / 03',
    processTitle: 'من الميدان إلى القرار',
    processDescription:
      'سير عمل مترابط يجعل كل مرحلة من مراحل التنفيذ أكثر وضوحًا وقابلية للمتابعة',
    steps: [
      {
        title: 'تحديد موقع العمل',
        description: 'ربط المهمة بموقعها الجغرافي ونطاق العمل المحدد',
      },
      {
        title: 'توثيق التنفيذ',
        description: 'إرفاق الصور والبيانات اللازمة لتوثيق تقدم الأعمال',
      },
      {
        title: 'المراجعة الذكية',
        description: 'مساعدة المشرف في مراجعة الصور ومطابقتها مع متطلبات العمل',
      },
      {
        title: 'متابعة القرارات',
        description: 'تسجيل نتائج المراجعة وإتاحتها للجهات المعنية',
      },
    ],
    applicationsTag: 'FIELD APPLICATIONS / 04',
    applicationsTitle: 'تقنية ترتبط بواقع الميدان',
    applicationsDescription:
      'حلول مترابطة لمتابعة الأعمال والمرافق وجودة التنفيذ',
    applications: [
      {
        title: 'أعمال البنية التحتية',
        description: 'متابعة أعمال المرافق والمشروعات الميدانية',
        image: images.utilities,
      },
      {
        title: 'الفرق الميدانية',
        description: 'تسهيل توثيق الأعمال والتواصل بين الفرق',
        image: images.team,
      },
      {
        title: 'التفتيش وضمان الجودة',
        description: 'مراجعة مراحل التنفيذ وتوثيق نتائج الفحص',
        image: images.inspection,
      },
    ],
    finalTitle: 'معلومات أوضح، قرارات أفضل',
    finalDescription:
      'نحو تجربة موحدة تجمع أطراف العمل الميداني في منصة واحدة',
    finalAction: 'تعرّف على الفريق',
    videoUnavailable: 'تعذر تحميل الفيديو، تأكدي من مساره داخل مجلد public',
  },

  en: {
    eyebrow: 'INTELLIGENT FIELD OPERATIONS',
    stakeholdersLabel: 'SECTORS & ORGANIZATIONS FOR POTENTIAL INTEGRATION',
    stakeholders: ['Saudi Electricity Company', 'National Water Company', 'Communications, Space & Technology Commission', 'Ministry of Municipalities and Housing', 'Municipalities', 'Telecom Operators', 'Regulatory Authorities', 'Infrastructure Contractors'],
    title: 'Every field operation',
    accent: 'under one system',
    description:
      'From field documentation to execution quality monitoring, one connected platform brings organizations and contractors together with AI-assisted insights',
    explore: 'Explore the platform',
    watch: 'See how it works',
    overviewTag: 'UNIFIED WORKS / 01',
    overviewTitle: 'One connected view of field operations',
    overviewDescription:
      'Unified Works brings field documentation, contractor oversight, and execution quality review into one coordinated experience, keeping stakeholders connected',
    features: [
      {
        title: 'Field documentation',
        description: 'Capture execution stages with location-aware photos and records',
      },
      {
        title: 'Quality oversight',
        description: 'Review field activities against execution requirements',
      },
      {
        title: 'AI-assisted review',
        description: 'Support review workflows with artificial intelligence',
      },
    ],
    videoTag: 'SYSTEM OVERVIEW / 02',
    videoTitle: 'See the system in action',
    videoDescription:
      'Discover how field documentation, quality review, and supervision connect in one experience',
    processTag: 'HOW IT WORKS / 03',
    processTitle: 'From fieldwork to decisions',
    processDescription:
      'A connected workflow designed to make execution more visible and easier to coordinate',
    steps: [
      {
        title: 'Locate the work',
        description: 'Connect each task to its geographic location and work zone',
      },
      {
        title: 'Document progress',
        description: 'Capture photos and essential records throughout execution',
      },
      {
        title: 'Review quality',
        description: 'Assist supervisors in reviewing images and work requirements',
      },
      {
        title: 'Coordinate decisions',
        description: 'Record review outcomes and share them with stakeholders',
      },
    ],
    applicationsTag: 'FIELD APPLICATIONS / 04',
    applicationsTitle: 'Technology grounded in the field',
    applicationsDescription:
      'Connected solutions for infrastructure, field operations, and execution quality',
    applications: [
      {
        title: 'Infrastructure works',
        description: 'Track utility projects and field activities',
        image: images.utilities,
      },
      {
        title: 'Field teams',
        description: 'Streamline documentation and team coordination',
        image: images.team,
      },
      {
        title: 'Inspection and quality',
        description: 'Review execution stages and inspection outcomes',
        image: images.inspection,
      },
    ],
    finalTitle: 'Better visibility. Better decisions.',
    finalDescription:
      'Bringing fieldwork stakeholders together in one connected platform',
    finalAction: 'Meet the team',
    videoUnavailable: 'Video unavailable. Check its path inside the public folder.',
  },
}

export default function Hero() {
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
          <span>UNIFIED WORKS SYSTEM</span>
          <span>01 / 04</span>
        </div>
      </section>

      {/* Continuous, non-interactive sector marquee. These are potential stakeholders, not confirmed partners. */}
      <section className={styles.stakeholderStrip} aria-label={t.stakeholdersLabel}>
        <div className={styles.stakeholderViewport}>
          <div className={styles.stakeholderTrack}>
            {[0, 1].map((copy) => (
              <div className={styles.stakeholderGroup} key={copy} aria-hidden={copy === 1}>
                {t.stakeholders.map((name) => (
                  <span className={styles.stakeholderItem} key={`${copy}-${name}`}>
                    <span className={styles.stakeholderDot} aria-hidden="true" />
                    {name}
                  </span>
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
              controls
              preload="metadata"
              poster={images.inspection}
              aria-label={t.videoTitle}
            >
              {t.videoUnavailable}
            </video>
          </div>

          <div className={styles.videoCaption}>
            <span>UNIFIED WORKS / SYSTEM OVERVIEW</span>
            <span>{isArabic ? 'عرض مرئي للمنصة' : 'A closer look at the platform'}</span>
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
              <span className={styles.finalEyebrow}>UNIFIED WORKS</span>
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


