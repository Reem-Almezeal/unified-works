
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Building2,
  HardHat,
  Zap,
  Droplets,
  RadioTower,
  Landmark,
  MapPinned,
  Camera,
  ClipboardCheck,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  LockKeyhole,
  Layers3,
  Monitor,
  FileCheck2,
  Activity,
  ExternalLink,
  Wifi,
  BatteryFull,
  Signal
} from 'lucide-react'
import styles from './Platform.module.css'

const BASE_URL = 'https://uw.81-208-191-204.sslip.io/'

const IMAGES = {
  dashboard: '/images/platform/platform-overview.webp.png',
  field: '/images/platform/field-documentation.webp.png',
  utilities: '/images/platform/underground-utilities.webp.png',
  monitoring: '/images/platform/infrastructure-monitoring.webp.png'
}

const roles = [
  {
    id: 'organization',
    icon: Building2,
    logo: null,
    url: 'https://uw.81-208-191-204.sslip.io/#dash',
    ar: 'الجهة المنظمة',
    en: 'Regulatory Organization',
    subtitleAr: 'الإشراف على المنظومة',
    subtitleEn: 'Platform-wide oversight',
    descAr: 'الإشراف على السجلات والمشاريع والجهات المشاركة ومتابعة الأنشطة والقرارات من خلال واجهة مركزية',
    descEn: 'Oversee projects, participating entities, records, and operational decisions from a centralized workspace',
    featuresAr: ['إدارة السجلات', 'متابعة المشاريع', 'مراجعة الأنشطة', 'التقارير والإشراف'],
    featuresEn: ['Records management', 'Project oversight', 'Activity review', 'Operational reports']
  },
  {
    id: 'contractor',
    icon: HardHat,
    logo: null,
    url: null,
    ar: 'المقاول',
    en: 'Contractor',
    subtitleAr: 'تنفيذ الأعمال الميدانية',
    subtitleEn: 'Field execution',
    descAr: 'توثيق الأعمال المنفذة في الموقع ورفع الصور والمستندات والبيانات اللازمة لمتابعة مراحل التنفيذ',
    descEn: 'Document on-site activities and submit photographs, supporting files, and field information',
    featuresAr: ['الأعمال المسندة', 'رفع الصور', 'توثيق الموقع', 'متابعة الطلبات'],
    featuresEn: ['Assigned activities', 'Photo uploads', 'Site documentation', 'Submission tracking']
  },
  {
    id: 'energy',
    icon: Zap,
    logo: '/images/organizations/saudi-energy.png',
    url: 'https://uw.81-208-191-204.sslip.io/p/el/#dash',
    ar: 'السعودية للطاقة',
    en: 'Saudi Energy',
    subtitleAr: 'البنية التحتية الكهربائية',
    subtitleEn: 'Electrical infrastructure',
    descAr: 'متابعة الأعمال المرتبطة بشبكات الكهرباء والاطلاع على السجلات والأنشطة ذات العلاقة',
    descEn: 'Monitor electrical infrastructure work and review relevant activities and records',
    featuresAr: ['أعمال الكهرباء', 'سجلات المشاريع', 'المراجعة والمتابعة', 'التنسيق'],
    featuresEn: ['Electrical works', 'Project records', 'Review and tracking', 'Coordination']
  },
  {
    id: 'water',
    icon: Droplets,
    logo: '/images/organizations/water.png',
    url: 'https://uw.81-208-191-204.sslip.io/p/wa/#dash',
    ar: 'شبكة المياه والصرف',
    en: 'Water & Wastewater',
    subtitleAr: 'البنية التحتية للمياه',
    subtitleEn: 'Water infrastructure',
    descAr: 'متابعة الأعمال المتعلقة بشبكات المياه والصرف الصحي والتوثيق المرتبط بمواقع التنفيذ',
    descEn: 'Monitor water and wastewater infrastructure activities and related site documentation',
    featuresAr: ['أعمال الشبكات', 'مواقع التنفيذ', 'التوثيق الميداني', 'المتابعة'],
    featuresEn: ['Network works', 'Site locations', 'Field documentation', 'Monitoring']
  },
  {
    id: 'telecom',
    icon: RadioTower,
    logo: '/images/organizations/telecom.png',
    url: 'https://uw.81-208-191-204.sslip.io/p/tc/#dash',
    ar: 'شبكة الاتصالات',
    en: 'Telecommunications',
    subtitleAr: 'شبكات الاتصالات',
    subtitleEn: 'Telecommunications networks',
    descAr: 'متابعة أعمال شبكات الاتصالات والتمديدات المرتبطة بالمشاريع والتنسيق بشأنها',
    descEn: 'Track telecommunications network activities, installations, and related coordination',
    featuresAr: ['أعمال الشبكات', 'سجلات المواقع', 'التوثيق', 'التنسيق'],
    featuresEn: ['Network activities', 'Site records', 'Documentation', 'Coordination']
  },
  {
    id: 'municipality',
    icon: Landmark,
    logo: '/images/organizations/municipality.png',
    url: 'https://uw.81-208-191-204.sslip.io/muni#query',
    ar: 'الأمانة',
    en: 'Municipality',
    subtitleAr: 'المتابعة البلدية',
    subtitleEn: 'Municipal oversight',
    descAr: 'متابعة البلاغات والملاحظات والأعمال المرتبطة بالاختصاصات البلدية ضمن واجهة مخصصة',
    descEn: 'Follow municipal reports, observations, and relevant infrastructure activities',
    featuresAr: ['استعلام البلاغات', 'متابعة المواقع', 'مراجعة الملاحظات', 'السجلات'],
    featuresEn: ['Report inquiries', 'Location monitoring', 'Observation review', 'Records']
  }
]

const translations = {
  ar: {
    eyebrow: 'الأعمال الموحّدة / المنصة',
    heroTitle: 'من الميدان إلى القرار',
    heroAccent: 'كل شيء في منظومة واحدة',
    heroDesc: 'منصة رقمية تربط الجهات المعنية بأعمال البنية التحتية، وتحوّل التوثيق الميداني إلى معلومات منظمة قابلة للمتابعة والمراجعة',
    heroButton: 'استكشف المنصة',
    heroSecondary: 'الجهات والأدوار',
    heroTag: 'UNIFIED FIELD OPERATIONS',

    fieldLabel: '01 / الربط الميداني',
    fieldTitle: 'العمل يبدأ في الموقع',
    fieldAccent: 'والمتابعة تستمر رقميًا',
    fieldDesc: 'تجمع المنصة أدلة التنفيذ والمعلومات الجغرافية والمراجعات ضمن سجل مترابط، مما يعزز وضوح العمل بين الجهات',
    fieldFeatures: [
      { title: 'التوثيق الميداني', desc: 'رفع الصور والمستندات المرتبطة بكل عمل' },
      { title: 'الربط الجغرافي', desc: 'ربط الأعمال بمواقعها وسياق البنية التحتية' },
      { title: 'المراجعة الذكية', desc: 'دعم تحليل السجلات مع الإشراف البشري' }
    ],

    rolesLabel: '02 / الجهات والصلاحيات',
    rolesTitle: 'منصة واحدة واجهات متخصصة',
    rolesDesc: 'تدخل كل جهة إلى مساحة عمل مخصصة لدورها اختر الجهة لاستعراض مسؤولياتها والانتقال إلى واجهتها داخل النظام',
    roleFeatures: 'المهام الرئيسية',
    openRole: 'الانتقال إلى واجهة الجهة',
    noLink: 'رابط واجهة المقاول غير متوفر حاليًا',
    accessHint: 'الوصول الفعلي يخضع لصلاحيات المستخدم',

    accessLabel: '03 / الوصول الموحد',
    accessTitle: 'مدخل واحد لجميع الجهات',
    accessDesc: 'تسجيل دخول موحّد إلى منظومة الأعمال الموحّدة، مع واجهات مختلفة بحسب الدور والصلاحيات',
    accessButton: 'الدخول إلى المنصة',
  },
  en: {
    eyebrow: 'UNIFIED WORKS / PLATFORM',
    heroTitle: 'From field to decision',
    heroAccent: 'One connected system',
    heroDesc: 'A digital platform connecting infrastructure stakeholders and transforming field documentation into organized, actionable records',
    heroButton: 'Explore the platform',
    heroSecondary: 'Stakeholders',
    heroTag: 'UNIFIED FIELD OPERATIONS',

    fieldLabel: '01 / FIELD CONNECTION',
    fieldTitle: 'Work begins on site',
    fieldAccent: 'Visibility continues digitally',
    fieldDesc: 'The platform connects field evidence, geographical information, and reviews into a traceable record across stakeholders',
    fieldFeatures: [
      { title: 'Field documentation', desc: 'Submit photographs and supporting documents' },
      { title: 'Geographic context', desc: 'Link activities to their locations and infrastructure context' },
      { title: 'AI-assisted review', desc: 'Support record analysis with human oversight' }
    ],

    rolesLabel: '02 / STAKEHOLDERS',
    rolesTitle: 'One platform Specialized workspaces',
    rolesDesc: 'Each stakeholder accesses a role-specific workspace Select an organization to view its responsibilities and open its system interface',
    roleFeatures: 'Key responsibilities',
    openRole: 'Open stakeholder workspace',
    noLink: 'Contractor workspace link is not available yet',
    accessHint: 'Actual access is subject to user permissions',

    accessLabel: '03 / UNIFIED ACCESS',
    accessTitle: 'One entry point for every stakeholder',
    accessDesc: 'Unified sign-in with workspaces and capabilities tailored to assigned roles',
    accessButton: 'Access the platform'
  }
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() =>
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return

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
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Photo(props) {
  return <PhotoContent key={props.src} {...props} />
}

function PhotoContent({ src, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)


  return (
    <div className={`${styles.photo} ${className}`}>
      {failed ? (
        <div className={styles.photoFallback}>
          <Layers3 size={30} />
          <span>UNIFIED WORKS</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

function OrganizationLogo(props) {
  return <OrganizationLogoContent key={props.role.logo} {...props} />
}

function OrganizationLogoContent({ role, large = false }) {
  const [failed, setFailed] = useState(false)
  const Icon = role.icon


  if (!role.logo || failed) {
    return (
      <Icon
        size={large ? 44 : 25}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    )
  }

  return (
    <img
      src={role.logo}
      alt=""
      className={styles.organizationLogo}
      onError={() => setFailed(true)}
    />
  )
}

function InteractivePhone({ activeFeature, ar }) {
  const screens = [
    {
      ar: 'التوثيق الميداني',
      en: 'Field Documentation',
      icon: Camera
    },
    {
      ar: 'الربط الجغرافي',
      en: 'Geographic Mapping',
      icon: MapPinned
    },
    {
      ar: 'المراجعة الذكية',
      en: 'Smart Review',
      icon: BrainCircuit
    }
  ]

  const active = screens[activeFeature]
  const ActiveIcon = active.icon

  return (
    <div className={styles.phoneStage}>
      <div className={styles.phoneGlow} />

      <div className={styles.phoneDevice}>
        <div className={styles.phoneScreen}>
          <div className={styles.phoneStatusBar}>
            <span>9:41</span>
            <div className={styles.phoneDynamicIsland} />
            <div className={styles.phoneStatusIcons}>
              <Signal size={11} />
              <Wifi size={11} />
              <BatteryFull size={13} />
            </div>
          </div>

          <div className={styles.phoneApp} dir={ar ? 'rtl' : 'ltr'}>
            <div className={styles.phoneAppHeader}>
              <div className={styles.phoneBrand}>
                <img
                  src="/images/unified-works-logo.png"
                  alt=""
                  className={styles.phoneBrandLogo}
                />
                <div>
                  <strong>
                    {ar ? 'الأعمال الموحّدة' : 'UNIFIED WORKS'}
                  </strong>
                  <small>FIELD OPERATIONS</small>
                </div>
              </div>

              <span className={styles.phoneAvatar}>UW</span>
            </div>

            <div className={styles.phoneAppBody} key={activeFeature}>
              <div className={styles.phonePageTitle}>
                <span className={styles.phonePageEyebrow}>
                  {ar ? 'مساحة العمل / المشاريع' : 'WORKSPACE / PROJECTS'}
                </span>

                <h3>{ar ? active.ar : active.en}</h3>

                <p>
                  {ar
                    ? 'مشروع تطوير البنية التحتية'
                    : 'Infrastructure Development Project'}
                </p>
              </div>

              <div className={styles.phoneProjectInfo}>
                <div>
                  <small>{ar ? 'رقم المشروع' : 'PROJECT ID'}</small>
                  <strong>UW-2026-014</strong>
                </div>

                <span className={styles.phoneProjectBadge}>
                  {ar ? 'قيد التنفيذ' : 'In progress'}
                </span>
              </div>

              {activeFeature === 0 && (
                <div className={styles.phoneFeatureScreen}>
                  <div className={styles.phoneImage}>
                    <img
                      src={IMAGES.field}
                      alt="Underground utility construction"
                    />
                    <span>
                      <Camera size={12} />
                      01 / 03
                    </span>
                  </div>

                  <div className={styles.phoneFormField}>
                    <small>{ar ? 'نوع العمل' : 'WORK TYPE'}</small>
                    <strong>
                      {ar ? 'تمديد شبكات المياه' : 'Water network installation'}
                    </strong>
                  </div>

                  <div className={styles.phoneFormField}>
                    <small>{ar ? 'الموقع' : 'LOCATION'}</small>
                    <strong>
                      <MapPinned size={13} />
                      {ar ? 'موقع العمل الميداني' : 'Field worksite'}
                    </strong>
                  </div>

                  <div className={styles.phoneUpload}>
                    <Camera size={17} />
                    <span>
                      {ar ? 'إرفاق صور الموقع' : 'Attach site photographs'}
                    </span>
                  </div>
                </div>
              )}

              {activeFeature === 1 && (
                <div className={styles.phoneFeatureScreen}>
                  <div className={styles.phoneMap}>
                    <div className={styles.mapGrid} />
                    <div className={styles.mapRoadA} />
                    <div className={styles.mapRoadB} />
                    <div className={styles.mapRoadC} />

                    <svg
                      className={styles.mapNetwork}
                      viewBox="0 0 300 210"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 10 145 L 85 145 L 135 90 L 205 90 L 285 38"
                        fill="none"
                        stroke="#2388c7"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 40 40 L 95 88 L 170 88 L 250 170"
                        fill="none"
                        stroke="#d6a03d"
                        strokeWidth="4"
                        strokeDasharray="7 5"
                        strokeLinecap="round"
                      />
                      <circle cx="135" cy="90" r="8" fill="#197b50" stroke="white" strokeWidth="3" />
                      <circle cx="205" cy="90" r="8" fill="#197b50" stroke="white" strokeWidth="3" />
                    </svg>

                    <span className={styles.mapPin}>
                      <MapPinned size={16} />
                    </span>

                    <div className={styles.mapZoom}>
                      +
                      <span>−</span>
                    </div>
                  </div>

                  <div className={styles.phoneMapLegend}>
                    <div><i className={styles.waterDot} />{ar ? 'المياه' : 'Water'}</div>
                    <div><i className={styles.energyDot} />{ar ? 'الكهرباء' : 'Electricity'}</div>
                  </div>

                  <div className={styles.phoneFormField}>
                    <small>{ar ? 'الموقع المحدد' : 'SELECTED LOCATION'}</small>
                    <strong>
                      {ar ? 'منطقة العمل / القطاع 04' : 'Worksite / Sector 04'}
                    </strong>
                  </div>

                  <div className={styles.phoneInfoBanner}>
                    <Layers3 size={16} />
                    <span>
                      {ar
                        ? 'عرض طبقات شبكات المرافق'
                        : 'Utility network layers'}
                    </span>
                  </div>
                </div>
              )}

              {activeFeature === 2 && (
                <div className={styles.phoneFeatureScreen}>
                  <div className={styles.phoneReviewHeader}>
                    <div className={styles.phoneReviewIcon}>
                      <BrainCircuit size={25} />
                    </div>

                    <strong>
                      {ar ? 'مراجعة التوثيق' : 'Documentation Review'}
                    </strong>

                    <span>
                      {ar
                        ? 'تحليل مساعد للمعلومات المرفوعة'
                        : 'AI-assisted evidence analysis'}
                    </span>
                  </div>

                  <div className={styles.phoneReviewRow}>
                    <CheckCircle2 size={17} />
                    <span>
                      {ar ? 'تم إرفاق الصور' : 'Photographs attached'}
                    </span>
                    <strong>01</strong>
                  </div>

                  <div className={styles.phoneReviewRow}>
                    <CheckCircle2 size={17} />
                    <span>
                      {ar ? 'بيانات الموقع متوفرة' : 'Location data available'}
                    </span>
                    <strong>02</strong>
                  </div>

                  <div className={styles.phoneReviewRow}>
                    <Activity size={17} />
                    <span>
                      {ar ? 'تتطلب مراجعة المسؤول' : 'Human review required'}
                    </span>
                    <strong>03</strong>
                  </div>

                  <div className={styles.phoneReviewNotice}>
                    <ShieldCheck size={18} />
                    <span>
                      {ar
                        ? 'النتيجة المبدئية لا تُعد اعتمادًا نهائيًا'
                        : 'Preliminary analysis is not final approval'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.phoneBottomNav}>
              <div>
                <Monitor size={18} />
                <small>{ar ? 'الرئيسية' : 'Home'}</small>
              </div>

              <div className={styles.phoneNavActive}>
                <ActiveIcon size={18} />
                <small>{ar ? 'العمل' : 'Workspace'}</small>
              </div>

              <div>
                <FileCheck2 size={18} />
                <small>{ar ? 'السجلات' : 'Records'}</small>
              </div>
            </div>
          </div>

          <div className={styles.phoneHomeIndicator} />
        </div>

        <div className={`${styles.eyebrow} ${styles.phoneStageCaption}`} dir={ar ? 'rtl' : 'ltr'}>
          <span className={styles.eyebrowLine} />
          {ar ? 'عرض توضيحي تفاعلي' : 'INTERACTIVE PRODUCT PREVIEW'}
        </div>
      </div>
    </div>
  )
}

export default function Platform() {
  const { i18n } = useTranslation()
  const ar = i18n.language?.startsWith('ar') ?? false
  const t = translations[ar ? 'ar' : 'en']

  const [selectedRole, setSelectedRole] = useState('organization')
  const [activeFeature, setActiveFeature] = useState(0)

  const activeRole = roles.find(role => role.id === selectedRole) || roles[0]

  const roleName = ar ? activeRole.ar : activeRole.en
  const roleSubtitle = ar ? activeRole.subtitleAr : activeRole.subtitleEn
  const roleDescription = ar ? activeRole.descAr : activeRole.descEn
  const roleFeatures = ar ? activeRole.featuresAr : activeRole.featuresEn

  const featureIcons = [Camera, MapPinned, BrainCircuit]

  useEffect(() => {
    document.title = ar
      ? 'المنصة | الأعمال الموحّدة'
      : 'Platform | Unified Works'
  }, [ar])

  return (
    <main className={styles.platform} dir={ar ? 'rtl' : 'ltr'}>

      {/* 01 — PRODUCT SHOWCASE */}

      <section className={styles.hero}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} />
                  {t.eyebrow}
                </span>

                <h1>
                  {t.heroTitle}
                  <span>{t.heroAccent}</span>
                </h1>

                <p>{t.heroDesc}</p>

                <div className={styles.heroActions}>
                  <a href="#platform-field" className={styles.primaryButton}>
                    {t.heroButton}
                    {ar ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                  </a>

                  <a href="#platform-roles" className={styles.secondaryButton}>
                    {t.heroSecondary}
                    <ArrowUpRight size={17} />
                  </a>
                </div>

                <div className={styles.heroMeta}>
                  <span className={styles.metaLine} />
                  <span>{t.heroTag}</span>
                </div>
              </div>

              <div className={styles.heroShowcase}>
                <div className={styles.showcaseBackdrop} />

                <div className={styles.dashboardFrame}>
                  <Photo
                    src={IMAGES.dashboard}
                    alt="Unified Works operations dashboard"
                    eager
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className={styles.heroBottomLine}>
            <span>UNIFIED WORKS / PLATFORM</span>
            <span>01 — 03</span>
          </div>
        </div>
      </section>

      {/* 02 — INTERACTIVE FIELD EXPERIENCE */}

      <section className={styles.fieldSection} id="platform-field">
        <div className={styles.container}>
          <div className={styles.fieldGrid}>

            <Reveal className={styles.fieldPhoneColumn}>
              <InteractivePhone
                activeFeature={activeFeature}
                ar={ar}
              />
            </Reveal>

            <Reveal delay={100}>
              <div className={styles.fieldCopy}>
                <span className={styles.sectionLabel}>
                  {t.fieldLabel}
                </span>

                <h2>
                  {t.fieldTitle}
                  <span>{t.fieldAccent}</span>
                </h2>

                <p className={styles.sectionDescription}>
                  {t.fieldDesc}
                </p>

                <div className={styles.featureList}>
                  {t.fieldFeatures.map((feature, index) => {
                    const Icon = featureIcons[index]

                    return (
                      <button
                        key={feature.title}
                        type="button"
                        className={`${styles.featureItem} ${
                          activeFeature === index
                            ? styles.featureItemActive
                            : ''
                        }`}
                        onClick={() => setActiveFeature(index)}
                        aria-pressed={activeFeature === index}
                      >
                        <span className={styles.featureIcon}>
                          <Icon size={22} strokeWidth={1.6} />
                        </span>

                        <span className={styles.featureText}>
                          <strong>{feature.title}</strong>
                          <small>{feature.desc}</small>
                        </span>

                        <span className={styles.featureNumber}>
                          0{index + 1}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 03 — STAKEHOLDERS */}

      <section className={styles.rolesSection} id="platform-roles">
        <div className={styles.container}>
          <Reveal>
            <div className={styles.rolesHeading}>
              <span className={styles.sectionLabel}>{t.rolesLabel}</span>
              <h2>{t.rolesTitle}</h2>
              <p>{t.rolesDesc}</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.roleSelector} role="group" aria-label={t.rolesTitle}>
              {roles.map(role => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`${styles.roleTab} ${
                    selectedRole === role.id ? styles.roleTabActive : ''
                  }`}
                  aria-pressed={selectedRole === role.id}
                >
                  <span className={styles.tabLogo}>
                    <OrganizationLogo role={role} />
                  </span>
                  <span>{ar ? role.ar : role.en}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={130}>
            <div className={styles.rolePanel}>
              <div className={styles.rolePanelMain} key={activeRole.id}>
                <span className={styles.roleOverline}>ROLE / WORKSPACE</span>

                <div className={styles.roleIdentity}>
                  <div className={styles.roleLargeLogo}>
                    <OrganizationLogo role={activeRole} large />
                  </div>

                  <div>
                    <span className={styles.roleSubtitle}>{roleSubtitle}</span>
                    <h3>{roleName}</h3>
                  </div>
                </div>

                <p className={styles.roleDescription}>{roleDescription}</p>

                <div className={styles.roleAction}>
                  {activeRole.url ? (
                    <a
                      href={activeRole.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.primaryButton}
                    >
                      {t.openRole}
                      <ExternalLink size={17} />
                    </a>
                  ) : (
                    <span className={styles.unavailable}>{t.noLink}</span>
                  )}
                </div>
              </div>

              <div className={styles.rolePanelSide}>
                <div className={styles.permissionsHeading}>
                  <ClipboardCheck size={21} />
                  <span>{t.roleFeatures}</span>
                </div>

                <div className={styles.permissionsList}>
                  {roleFeatures.map((feature, index) => (
                    <div key={feature}>
                      <span className={styles.permissionNumber}>
                        0{index + 1}
                      </span>
                      <span>{feature}</span>
                      <CheckCircle2 size={17} />
                    </div>
                  ))}
                </div>

                <div className={styles.roleSecurity}>
                  <LockKeyhole size={16} />
                  <span>{t.accessHint}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 — UNIFIED ENTRY */}

      <section className={styles.accessSection}>
        <div className={styles.accessContainer}>
          <Reveal className={styles.accessPanel}>
            <div className={styles.accessContent}>
              <span className={styles.accessLabel}>{t.accessLabel}</span>
              <h2>{t.accessTitle}</h2>
              <p>{t.accessDesc}</p>
            </div>

            <a
              href={BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accessButton}
            >
              {t.accessButton}
              <ArrowUpRight size={19} />
            </a>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
