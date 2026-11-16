
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
    en: 'Regulatory organization',
    subtitleAr: 'متابعة الأعمال وجودة التنفيذ',
    subtitleEn: 'Work monitoring and quality oversight',
    descAr: 'تتيح سجلات المقاولين وقرارات المشرفين متابعة الأداء والتحقق من الالتزام بالمتطلبات الفنية، وتدعم رصد المشكلات مبكرًا للحد من إعادة العمل وتكاليف الصيانة الممكن تجنبها',
    descEn: 'Contractor records and supervisor decisions support performance monitoring and technical compliance checks, helping identify issues before they lead to rework or avoidable maintenance costs',
    featuresAr: ['متابعة مراحل التنفيذ', 'التحقق من متطلبات الجودة', 'الرجوع إلى قرارات المشرفين', 'مراجعة أداء المقاولين'],
    featuresEn: ['Execution progress', 'Quality requirement checks', 'Supervisor decision records', 'Contractor performance review']
  },
  {
    id: 'contractor',
    icon: HardHat,
    logo: null,
    url: null,
    ar: 'المقاول',
    en: 'Contractor',
    subtitleAr: 'رفع الأعمال للمراجعة',
    subtitleEn: 'Work submissions',
    descAr: 'يرفع المقاول صور الأعمال وبياناتها للمراجعة، ويتابع ملاحظات المشرف ويحدث الطلب عند استكمال البيانات أو تنفيذ التصحيحات المطلوبة',
    descEn: 'Contractors submit work photographs and details for review, respond to supervisor observations, and update submissions when information or corrective work is required',
    featuresAr: ['إعداد طلب المراجعة', 'إرفاق صور التنفيذ', 'استكمال البيانات المطلوبة', 'توثيق معالجة الملاحظات'],
    featuresEn: ['Submission preparation', 'Execution photographs', 'Required information updates', 'Corrective action documentation']
  },
  {
    id: 'energy',
    icon: Zap,
    logo: '/images/organizations/saudi-energy.png',
    url: 'https://uw.81-208-191-204.sslip.io/p/el/#dash',
    ar: 'السعودية للطاقة',
    en: 'Saudi Energy',
    subtitleAr: 'متابعة أعمال الكهرباء',
    subtitleEn: 'Electrical work oversight',
    descAr: 'تجمع واجهة القطاع سجلات أعمال الكهرباء وصور التنفيذ والملاحظات لتمكين المستخدم المخول من مراجعتها وفق متطلبات المشروع',
    descEn: 'The sector workspace brings together electrical work records, execution photographs, and observations for review by authorized users against project requirements',
    featuresAr: ['سجلات أعمال الكهرباء', 'صور مراحل التنفيذ', 'متطلبات المشروع', 'ملاحظات المراجعة'],
    featuresEn: ['Electrical work records', 'Execution stage photographs', 'Project requirements', 'Review observations']
  },
  {
    id: 'water',
    icon: Droplets,
    logo: '/images/organizations/water.png',
    url: 'https://uw.81-208-191-204.sslip.io/p/wa/#dash',
    ar: 'المياه والصرف الصحي',
    en: 'Water and wastewater',
    subtitleAr: 'متابعة أعمال الشبكات',
    subtitleEn: 'Network work oversight',
    descAr: 'تُعرض أعمال شبكات المياه والصرف الصحي مع مواقعها والصور المرفقة ونتائج المراجعة للرجوع إلى توثيق كل عمل',
    descEn: 'Water and wastewater work is presented with locations, submitted photographs, and review outcomes so users can refer to the record for each activity',
    featuresAr: ['سجلات أعمال الشبكات', 'بيانات مواقع الأعمال', 'الصور المرفقة', 'قرارات المراجعة'],
    featuresEn: ['Network work records', 'Worksite details', 'Submitted photographs', 'Review decisions']
  },
  {
    id: 'telecom',
    icon: RadioTower,
    logo: '/images/organizations/telecom.png',
    url: 'https://uw.81-208-191-204.sslip.io/p/tc/#dash',
    ar: 'الاتصالات',
    en: 'Telecommunications',
    subtitleAr: 'متابعة تمديدات الاتصالات',
    subtitleEn: 'Telecommunications installation oversight',
    descAr: 'تتيح سجلات تمديدات الاتصالات مراجعة صور المواقع ومتابعة الملاحظات المرتبطة بأعمال التنفيذ ضمن اختصاص الجهة',
    descEn: 'Telecommunications installation records support site photograph review and follow-up of execution observations within the organization’s remit',
    featuresAr: ['سجلات التمديدات', 'صور مواقع التنفيذ', 'ملاحظات المشرفين', 'متابعة أعمال التصحيح'],
    featuresEn: ['Installation records', 'Worksite photographs', 'Supervisor observations', 'Corrective work follow-up']
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
    descAr: 'تعرض الواجهة البلاغات ومواقع الأعمال والملاحظات ذات الصلة بالاختصاص البلدي، مع إتاحة السجلات للمستخدمين المخولين',
    descEn: 'The workspace presents reports, work locations, and observations relevant to municipal responsibilities, with record access limited to authorized users',
    featuresAr: ['الاستعلام عن البلاغات', 'الاطلاع على مواقع الأعمال', 'متابعة الملاحظات البلدية', 'الرجوع إلى سجلات الأعمال'],
    featuresEn: ['Report lookup', 'Work location access', 'Municipal observation follow-up', 'Work record reference']
  }
]

const translations = {
  ar: {
    eyebrow: 'الأعمال الموحّدة / المنصة',
    heroTitle: 'نظرة عامة',
    heroAccent: 'على المنصة',
    heroDesc: 'تتيح الأعمال الموحّدة توثيق أنشطة البنية التحتية ورفع أعمال المقاولين للمراجعة، مع حفظ الصور والملاحظات والقرارات في سجل لكل عمل',
    heroButton: 'استعراض الإجراءات',
    heroSecondary: 'عرض المستخدمين',
    heroTag: 'إدارة الأعمال الميدانية',

    fieldLabel: '01 / آلية العمل',
    fieldTitle: 'إجراءات',
    fieldAccent: 'العمل',
    fieldDesc: 'يُعد المقاول الطلب بصور التنفيذ وبيانات الموقع، ثم يراجعه المشرف ويسجل النتيجة وفق الإجراء المعتمد، وتساعد السجلات الموحدة في تقليل المتابعة اليدوية والزيارات غير الضرورية',
    fieldFeatures: [
      { title: 'إعداد الطلب', desc: 'إرفاق صور العمل وبيانات المشروع والمستندات اللازمة للمراجعة' },
      { title: 'تحديد الموقع', desc: 'ربط الطلب بموقع التنفيذ للرجوع إلى سجل العمل وأدلته' },
      { title: 'مراجعة الطلب', desc: 'يسجل المشرف قراره، ويشمل التطوير المخطط نموذجًا لكل جهة يُدرّب بضوابط على الصور وقرارات المراجعة المعتمدة لمساندة المراجعات اللاحقة' }
    ],

    rolesLabel: '02 / المستخدمون',
    rolesTitle: 'الأدوار والصلاحيات',
    rolesDesc: 'تُحدد مهام المقاول والمشرف وممثل الجهة وفق مسؤولياتهم وصلاحياتهم، ويمكن اختيار المستخدم أو القطاع أدناه للاطلاع على المهام ورابط الواجهة المتاح',
    roleFeatures: 'المهام المتاحة بحسب الصلاحية',
    openRole: 'فتح الواجهة',
    noLink: 'واجهة المقاول غير متاحة عبر هذا الموقع حاليًا',
    accessHint: 'يتطلب الاطلاع على السجلات صلاحية مناسبة',

    accessLabel: '03 / حساب المستخدم',
    accessTitle: 'الوصول إلى المنصة',
    accessDesc: 'استخدم حسابك المصرح له للوصول إلى مساحة العمل والطلبات والسجلات المتاحة لك',
    accessButton: 'تسجيل الدخول',
  },
  en: {
    eyebrow: 'UNIFIED WORKS / PLATFORM',
    heroTitle: 'Platform',
    heroAccent: 'overview',
    heroDesc: 'Unified Works supports infrastructure work documentation and contractor submissions for review, retaining photographs, observations, and decisions in a record for each activity',
    heroButton: 'View procedures',
    heroSecondary: 'View users',
    heroTag: 'FIELD OPERATIONS MANAGEMENT',

    fieldLabel: '01 / WORKFLOW',
    fieldTitle: 'Work',
    fieldAccent: 'procedures',
    fieldDesc: 'Contractors prepare submissions with photographs and location details for supervisor review under the applicable procedure; consolidated records can reduce manual follow-up and unnecessary inspection visits',
    fieldFeatures: [
      { title: 'Prepare a submission', desc: 'Attach work photographs, project details, and documents required for review' },
      { title: 'Identify the location', desc: 'Associate the submission with its worksite and supporting evidence' },
      { title: 'Review the submission', desc: 'Supervisors record decisions, with planned organization-specific AI trained through a controlled process on images and validated decisions to assist future reviews' }
    ],

    rolesLabel: '02 / USERS',
    rolesTitle: 'Roles and permissions',
    rolesDesc: 'Contractors, supervisors, and organization representatives have duties defined by their responsibilities and permissions; select a user group or sector below to view its tasks and available workspace link',
    roleFeatures: 'Tasks subject to permission',
    openRole: 'Open workspace',
    noLink: 'The contractor workspace is not currently accessible from this website',
    accessHint: 'Record access requires the appropriate permission',

    accessLabel: '03 / USER ACCOUNT',
    accessTitle: 'Platform access',
    accessDesc: 'Use your authorized account to access the workspace, submissions, and records available to you',
    accessButton: 'Sign in'
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
      ar: 'توثيق العمل',
      en: 'Work documentation',
      icon: Camera
    },
    {
      ar: 'موقع التنفيذ',
      en: 'Work location',
      icon: MapPinned
    },
    {
      ar: 'نتيجة المراجعة',
      en: 'Review outcome',
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
                  <small>{ar ? 'الأعمال الميدانية' : 'FIELD OPERATIONS'}</small>
                </div>
              </div>

              <span className={styles.phoneAvatar}>UW</span>
            </div>

            <div className={styles.phoneAppBody} key={activeFeature}>
              <div className={styles.phonePageTitle}>
                <span className={styles.phonePageEyebrow}>
                  {ar ? 'المشاريع / طلبات المراجعة' : 'PROJECTS / SUBMISSIONS'}
                </span>

                <h3>{ar ? active.ar : active.en}</h3>

                <p>
                  {ar
                    ? 'مثال توضيحي لمشروع بنية تحتية'
                    : 'Illustrative infrastructure project'}
                </p>
              </div>

              <div className={styles.phoneProjectInfo}>
                <div>
                  <small>{ar ? 'مرجع المشروع' : 'PROJECT REFERENCE'}</small>
                  <strong>UW-2026-014</strong>
                </div>

                <span className={styles.phoneProjectBadge}>
                  {ar ? 'أعمال جارية' : 'Work in progress'}
                </span>
              </div>

              {activeFeature === 0 && (
                <div className={styles.phoneFeatureScreen}>
                  <div className={styles.phoneImage}>
                    <img
                      src={IMAGES.field}
                      alt={ar ? 'أعمال تنفيذ شبكات المرافق' : 'Utility network construction work'}
                    />
                    <span>
                      <Camera size={12} />
                      01 / 03
                    </span>
                  </div>

                  <div className={styles.phoneFormField}>
                    <small>{ar ? 'النشاط' : 'ACTIVITY'}</small>
                    <strong>
                      {ar ? 'تمديد خط مياه' : 'Water pipeline installation'}
                    </strong>
                  </div>

                  <div className={styles.phoneFormField}>
                    <small>{ar ? 'موقع النشاط' : 'ACTIVITY LOCATION'}</small>
                    <strong>
                      <MapPinned size={13} />
                      {ar ? 'موقع التنفيذ المسجل' : 'Recorded work location'}
                    </strong>
                  </div>

                  <div className={styles.phoneUpload}>
                    <Camera size={17} />
                    <span>
                      {ar ? 'إرفاق صور التنفيذ' : 'Attach work photographs'}
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
                    <small>{ar ? 'نطاق التنفيذ' : 'WORK AREA'}</small>
                    <strong>
                      {ar ? 'منطقة التنفيذ / القطاع 04' : 'Work area / Sector 04'}
                    </strong>
                  </div>

                  <div className={styles.phoneInfoBanner}>
                    <Layers3 size={16} />
                    <span>
                      {ar
                        ? 'بيانات شبكات المرافق'
                        : 'Utility network data'}
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
                      {ar ? 'مراجعة المرفقات' : 'Supporting evidence review'}
                    </strong>

                    <span>
                      {ar
                        ? 'القرار النهائي للمشرف'
                        : 'Final decisions remain with supervisors'}
                    </span>
                  </div>

                  <div className={styles.phoneReviewRow}>
                    <CheckCircle2 size={17} />
                    <span>
                      {ar ? 'صور التنفيذ مرفقة' : 'Work photographs attached'}
                    </span>
                    <strong>01</strong>
                  </div>

                  <div className={styles.phoneReviewRow}>
                    <CheckCircle2 size={17} />
                    <span>
                      {ar ? 'موقع العمل مسجل' : 'Work location recorded'}
                    </span>
                    <strong>02</strong>
                  </div>

                  <div className={styles.phoneReviewRow}>
                    <Activity size={17} />
                    <span>
                      {ar ? 'بانتظار قرار المشرف' : 'Awaiting supervisor decision'}
                    </span>
                    <strong>03</strong>
                  </div>

                  <div className={styles.phoneReviewNotice}>
                    <ShieldCheck size={18} />
                    <span>
                      {ar
                        ? 'اعتماد أو رفض أو إعادة للتصحيح بحسب الإجراء المتاح'
                        : 'Approve, reject, or return for correction where supported'}
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
                <small>{ar ? 'الطلبات' : 'Submissions'}</small>
              </div>

              <div>
                <FileCheck2 size={18} />
                <small>{ar ? 'سجلات الأعمال' : 'Work records'}</small>
              </div>
            </div>
          </div>

          <div className={styles.phoneHomeIndicator} />
        </div>

        <div className={`${styles.eyebrow} ${styles.phoneStageCaption}`} dir={ar ? 'rtl' : 'ltr'}>
          <span className={styles.eyebrowLine} />
          {ar ? 'نموذج توضيحي للإجراءات' : 'ILLUSTRATIVE WORKFLOW PREVIEW'}
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
                    alt={ar ? 'لوحة متابعة الأعمال الميدانية' : 'Field operations monitoring dashboard'}
                    eager
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className={styles.heroBottomLine}>
            <span>{ar ? 'الأعمال الموحّدة / المنصة' : 'UNIFIED WORKS / PLATFORM'}</span>
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
                <span className={styles.roleOverline}>{ar ? 'المستخدم / القطاع' : 'USER GROUP / SECTOR'}</span>

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
