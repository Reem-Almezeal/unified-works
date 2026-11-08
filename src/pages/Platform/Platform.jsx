
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Camera,
  FileCheck2,
  ScanSearch,
  Building2,
  HardHat,
  ShieldCheck,
  Layers3,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Activity,
  Crosshair,
  Fingerprint,
  Database,
  ArrowDown,
  Image,
  ClipboardCheck,
  Send,
  LocateFixed,
  Sparkles,

} from 'lucide-react'
import styles from './Platform.module.css'

const translations = {
  ar: {
    eyebrow: 'UNIFIED WORKS / PLATFORM EXPERIENCE',
    kicker: 'من موقع العمل إلى رؤية موثوقة',
    title1: 'الميدان أمامك',
    title2: 'والقرار بيدك',
    description: 'تبدأ الأعمال الموحدة بصورة من موقع الحفر، ثم تتحقق منها بالذكاء الاصطناعي وتستفيد من مراجعة المشرف لبناء سجل مرئي مشترك لما يجري تحت الأرض',
    explore: 'استكشف المنصة',
    contact: 'تواصل معنا',
    discover: 'اكتشف كيف تعمل',
    live: 'محاكاة تفاعلية',
    demo: 'بيانات توضيحية لعرض فكرة المنصة',
    sectionTag: '01 / CONNECTED WORKFLOW',
    journeyTitle: 'من الميدان إلى القرار',
    journeyDesc: 'رحلة تبدأ بصورة موثقة من موقع الحفر، وتمر بالتحقق الذكي ومراجعة المشرف، لتنتهي بسجل يساعد الجهات على المتابعة',
    journey: [
      {
        title: 'توثيق من موقع العمل',
        text: 'يلتقط المقاول صورة لأعمال الحفر مع بيانات الموقع والوقت',
        detail: 'صورة ميدانية مرتبطة بالموقع والوقت',
      },
      {
        title: 'تحقق ذكي من الصورة',
        text: 'يقارن النظام الصورة بصور سبق اعتمادها للتحقق من العمل الموثق',
        detail: 'مقارنة الصور بمكتبة المراجع المعتمدة',
      },
      {
        title: 'مراجعة عند الحاجة',
        text: 'تُحال الحالات غير الواضحة إلى المشرف ليقرر اعتماد الصورة أو رفضها',
        detail: 'المشرف يراجع الحالات غير المؤكدة',
      },
      {
        title: 'سجل يتطور باستمرار',
        text: 'تُضاف الصور المعتمدة إلى المكتبة لتتحسن دقة التحقق وتُوثق الأعمال على خريطة مشتركة',
        detail: 'كل اعتماد يثري السجل ويساعد على تحسين التحقق',
      },
    ],
    experienceTag: '02 / BUILT FOR EVERY ROLE',
    experienceTitle: 'منظومة واحدة تجمع كل الأطراف',
    experienceDesc: 'تجربة تصورية توضّح كيف يمكن للمقاول والجهة المشرفة والبلدية الاستفادة من التوثيق الميداني والتحقق الذكي والسجل المشترك',
    roles: {
      contractor: {
        name: 'المقاول',
        subtitle: 'توثيق من موقع التنفيذ',
        headline: 'صورة من الموقع تبدأ التوثيق',
        desc: 'يوثق المقاول أعمال الحفر بالصور وبيانات الموقع والوقت، لتصبح الأدلة جاهزة للتحقق والمراجعة',
        label: 'تطبيق التوثيق الميداني',
        action: 'إرسال الصورة',
        status: 'جاهز للتحقق',
        rows: [
          ['موقع العمل', 'الرياض — موقع تجريبي'],
          ['نوع العمل', 'تمديد كابل كهربائي'],
          ['المرفقات', '3 صور ميدانية'],
        ],
        steps: ['تحديد الموقع', 'التقاط الصورة', 'إضافة بيانات العمل', 'إرسال التوثيق'],
      },
      supervisor: {
        name: 'الجهة المشرفة',
        subtitle: 'مراجعة الصور غير المؤكدة',
        headline: 'المراجعة البشرية تعزز دقة النظام',
        desc: 'يراجع المشرف الصور التي لا يستطيع النظام حسمها، وتُستخدم الصور المعتمدة كمرجع للتحقق من الأعمال التالية',
        label: 'لوحة مراجعة الصور',
        action: 'مراجعة الصورة',
        status: 'بانتظار قرار المشرف',
        rows: [
          ['صور توضيحية', '24'],
          ['بانتظار المراجعة', '6'],
          ['ملاحظات تجريبية', '3'],
        ],
        steps: ['استعراض الصور', 'مقارنة الأدلة', 'اعتماد أو رفض', 'إثراء مكتبة الصور'],
      },
      municipality: {
        name: 'البلدية',
        subtitle: 'رؤية للأعمال على الخريطة',
        headline: 'معرفة ما جرى في الموقع',
        desc: 'توضح الخريطة المشتركة مواقع الأعمال الموثقة وما تم دفنه تحت الأرض، بما يدعم معرفة تاريخ الموقع ومتابعة الملاحظات',
        label: 'خريطة الأعمال الموثقة',
        action: 'استعراض الموقع',
        status: 'ملاحظة تجريبية',
        rows: [
          ['الموقع', 'نقطة رقم 02'],
          ['الحالة', 'إعادة سفلتة غير مكتملة'],
          ['الجهة المنفذة', 'مقاول المشروع — تجريبي'],
        ],
        steps: ['تحديد الموقع', 'استعراض السجل', 'مراجعة الصور', 'متابعة الملاحظة'],
      },
    },
    sample: 'UW — DEMO',
    location: 'موقع عمل تجريبي',
    water: 'مياه',
    power: 'كهرباء',
    excavation: 'أعمال حفر',
    alert: 'ملاحظة',
    mapTitle: 'طبقات البنية التحتية',
    mapSubtitle: 'تمثيل توضيحي للمرافق وموقع العمل',
    choosePoint: 'اختر إحدى النقطتين',
    point1: 'موقع العمل',
    point2: 'ملاحظة صيانة',
    point1Desc: 'مسار حفر توضيحي بالقرب من شبكات المرافق',
    point2Desc: 'إعادة تأهيل الموقع لم تكتمل بعد تنفيذ التمديدات',
    point1Status: 'قيد المراجعة',
    point2Status: 'تحتاج متابعة',
    insightTag: '03 / INTELLIGENT FIELD MONITORING',
    insightTitle: 'كل التفاصيل تحت الرصد',
    insightAccent: 'وكل صورة تعزز المعرفة',
    insightDesc: 'يقارن النظام صور الحفر بالمراجع المعتمدة، ويستفيد من قرارات المشرف لتحسين دقة التحقق، مع توثيق الأعمال على خريطة مشتركة',
    capabilities: [
      ['توثيق جغرافي', 'ربط صور العمل بالموقع والوقت'],
      ['سجل مرئي', 'الاحتفاظ بأدلة مصورة لما نُفذ تحت الأرض'],
      ['تحقق ذكي', 'مقارنة الصور بمكتبة الصور المعتمدة'],
      ['تعلم من المراجعة', 'الاستفادة من اعتماد المشرف لتحسين التحقق'],
    ],
    endTag: 'THE FUTURE OF FIELD OPERATIONS',
    endTitle: 'رؤية أوضح للميدان',
    endAccent: 'ومستقبل أكثر ذكاءً',
    endDesc: 'يقدم النموذج الأولي طريقة للتحقق من صور الحفر وتوثيق الأعمال، مع فرص مستقبلية لتوسيع التجربة إلى جهات ومواقع أكثر وإضافة التحقق من التصاريح',
    technology: 'استكشف التقنية',
    about: 'تعرّف على المشروع',
    simulated: 'عرض تصوري — لا يمثل ربطًا فعليًا بالأنظمة الحكومية',
  },
  en: {
    eyebrow: 'UNIFIED WORKS / PLATFORM EXPERIENCE',
    kicker: 'From field evidence to trusted visibility',
    title1: 'See the field',
    title2: 'Make informed decisions',
    description: 'Unified Works starts with an excavation site photo, uses AI to check it against approved examples, and learns from supervisor reviews to build a shared visual record of underground work',
    explore: 'Explore the platform',
    contact: 'Contact us',
    discover: 'Discover how it works',
    live: 'Interactive simulation',
    demo: 'Illustrative data for product demonstration',
    sectionTag: '01 / CONNECTED WORKFLOW',
    journeyTitle: 'From field evidence to action',
    journeyDesc: 'A connected process that captures site photos, checks them with AI, involves supervisors when needed, and builds a shared record for oversight',
    journey: [
      {
        title: 'Capture on site',
        text: 'The contractor takes an excavation photo with location and time information',
        detail: 'Field photos linked to location and time',
      },
      {
        title: 'AI photo verification',
        text: 'The system compares each photo against previously approved reference photos',
        detail: 'Comparison against an approved photo library',
      },
      {
        title: 'Supervisor review',
        text: 'Uncertain cases are sent to a supervisor for an approval decision',
        detail: 'Human review when confidence is insufficient',
      },
      {
        title: 'A growing shared record',
        text: 'Approved photos expand the reference library and help map documented underground work',
        detail: 'Each approval improves the reference collection',
      },
    ],
    experienceTag: '02 / BUILT FOR EVERY ROLE',
    experienceTitle: 'One system connecting every role',
    experienceDesc: 'A conceptual experience showing how contractors, supervisors, and municipalities could use field evidence, AI verification, and a shared record',
    roles: {
      contractor: {
        name: 'Contractor',
        subtitle: 'Evidence from the worksite',
        headline: 'One site photo starts the record',
        desc: 'Contractors document excavation work with photos, location, and time information for verification and review',
        label: 'Field documentation app',
        action: 'Submit photo',
        status: 'Ready for verification',
        rows: [
          ['Worksite', 'Riyadh — demo site'],
          ['Activity', 'Electrical cable installation'],
          ['Attachments', '3 field photos'],
        ],
        steps: ['Locate site', 'Capture photo', 'Add work details', 'Submit evidence'],
      },
      supervisor: {
        name: 'Supervisor',
        subtitle: 'Review uncertain results',
        headline: 'Human review strengthens AI checks',
        desc: 'Supervisors review photos that the system cannot confidently classify, and approved images become references for future checks',
        label: 'Photo review dashboard',
        action: 'Review photo',
        status: 'Awaiting supervisor decision',
        rows: [
          ['Illustrative photos', '24'],
          ['Pending review', '6'],
          ['Demo observations', '3'],
        ],
        steps: ['Browse photos', 'Compare evidence', 'Approve or reject', 'Grow reference library'],
      },
      municipality: {
        name: 'Municipality',
        subtitle: 'Mapped work history',
        headline: 'See what happened at each site',
        desc: 'A shared map shows documented work and what has been buried underground, supporting site history and observation follow-up',
        label: 'Documented works map',
        action: 'Inspect location',
        status: 'Demo observation',
        rows: [
          ['Location', 'Point 02'],
          ['Status', 'Road restoration incomplete'],
          ['Responsible party', 'Project contractor — demo'],
        ],
        steps: ['Select site', 'View records', 'Review photos', 'Track observation'],
      },
    },
    sample: 'UW — DEMO',
    location: 'Illustrative worksite',
    water: 'Water',
    power: 'Electricity',
    excavation: 'Excavation',
    alert: 'Observation',
    mapTitle: 'Infrastructure layers',
    mapSubtitle: 'Illustrative utility and worksite visualization',
    choosePoint: 'Select one of two points',
    point1: 'Worksite',
    point2: 'Maintenance observation',
    point1Desc: 'Illustrative excavation near existing utility networks',
    point2Desc: 'Site restoration remains incomplete after cable installation',
    point1Status: 'Under review',
    point2Status: 'Follow-up needed',
    insightTag: '03 / INTELLIGENT FIELD MONITORING',
    insightTitle: 'Every detail in view',
    insightAccent: 'Every photo builds knowledge',
    insightDesc: 'The system compares excavation photos with approved references, learns from supervisor decisions, and documents underground work on a shared map',
    capabilities: [
      ['Geospatial evidence', 'Link field photos to location and time'],
      ['Visual history', 'Keep photo evidence of underground work'],
      ['AI verification', 'Compare photos against approved references'],
      ['Learning from review', 'Use supervisor approvals to improve future checks'],
    ],
    endTag: 'THE FUTURE OF FIELD OPERATIONS',
    endTitle: 'A clearer view of the field',
    endAccent: 'A smarter way forward',
    endDesc: 'The prototype demonstrates AI photo verification and excavation documentation, with future opportunities to expand to more agencies and sites and introduce permit checks',
    technology: 'Explore technology',
    about: 'About the project',
    simulated: 'Conceptual demonstration — no live government-system integration',
  },
}

const roles = [
  { id: 'contractor', icon: HardHat },
  { id: 'supervisor', icon: Eye },
  { id: 'municipality', icon: Building2 },
]

const journeyIcons = [Camera, MapPin, ScanSearch, ClipboardCheck]
const capabilityIcons = [LocateFixed, Image, Sparkles, Activity]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function FieldMap({ t, activePoint, onPointChange }) {
  return (
    <div className={styles.mapCanvas}>
      <div className={styles.mapGrid} />

      <div className={styles.mapHeader}>
        <span><Radio size={13} /> {t.sample}</span>
        <span><Crosshair size={13} /> GIS / 24.7136</span>
      </div>

      <svg
        className={styles.mapSvg}
        viewBox="0 0 800 460"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="uwBlocks" width="130" height="105" patternUnits="userSpaceOnUse">
            <rect x="10" y="10" width="91" height="69" rx="6" fill="currentColor" opacity=".07" />
            <rect x="22" y="19" width="48" height="35" rx="3" fill="currentColor" opacity=".06" />
          </pattern>
        </defs>

        <rect width="800" height="460" fill="url(#uwBlocks)" />

        <g className={styles.roads} fill="none" strokeLinecap="round">
          <path d="M-80 105 L880 105" strokeWidth="34" />
          <path d="M-80 326 L880 326" strokeWidth="28" />
          <path d="M175 -70 L175 530" strokeWidth="30" />
          <path d="M610 -70 L610 530" strokeWidth="26" />
          <path d="M-50 470 L760 -40" strokeWidth="24" />
        </g>

        <g className={styles.roadCenters} fill="none" strokeDasharray="7 12">
          <path d="M-80 105 L880 105" />
          <path d="M-80 326 L880 326" />
          <path d="M175 -70 L175 530" />
          <path d="M610 -70 L610 530" />
        </g>

        <g fill="none" strokeWidth="5" strokeLinecap="round">
          <path
            className={styles.waterLine}
            d="M-20 230 C180 230 225 165 410 165 S670 215 830 170"
          />
          <path
            className={styles.powerLine}
            d="M70 490 L240 320 L410 320 L560 170 L790 -30"
          />
          <path
            className={styles.excavationLine}
            d="M260 400 L345 285 L450 250 L545 210"
          />
        </g>

        <g className={activePoint === 1 ? styles.mapFocus : styles.mapMuted}>
          <circle cx="420" cy="235" r="88" fill="none" stroke="#edc37c" strokeWidth="1.5" strokeDasharray="7 8" />
          <circle cx="420" cy="235" r="55" fill="#e8b96d" fillOpacity=".08" />
        </g>

        <g className={activePoint === 2 ? styles.mapFocus : styles.mapMuted}>
          <circle cx="660" cy="325" r="56" fill="#ff6777" fillOpacity=".08" />
          <circle cx="660" cy="325" r="45" fill="none" stroke="#ff6777" strokeWidth="2" strokeDasharray="6 7" />
        </g>
      </svg>

      <button
        type="button"
        className={`${styles.mapMarker} ${styles.markerOne} ${activePoint === 1 ? styles.markerActive : ''}`}
        onClick={() => onPointChange(1)}
        aria-pressed={activePoint === 1}
        aria-label={t.point1}
      >
        <MapPin size={21} />
        <span>01</span>
      </button>

      <button
        type="button"
        className={`${styles.mapMarker} ${styles.markerTwo} ${styles.markerWarning} ${activePoint === 2 ? styles.markerActive : ''}`}
        onClick={() => onPointChange(2)}
        aria-pressed={activePoint === 2}
        aria-label={t.point2}
      >
        <AlertTriangle size={20} />
        <span>02</span>
      </button>

      <div className={styles.mapLegend}>
        <span><i className={styles.waterDot} />{t.water}</span>
        <span><i className={styles.powerDot} />{t.power}</span>
        <span><i className={styles.digDot} />{t.excavation}</span>
      </div>
    </div>
  )
}

function RolePreview({ t, role, activePoint, onPointChange }) {
  const current = t.roles[role]

  return (
    <div className={styles.previewShell}>
      <div className={styles.previewTopbar}>
        <div className={styles.previewBrand}>
          <div className={styles.brandSymbol}><Layers3 size={19} /></div>
          <div>
            <strong>UNIFIED WORKS</strong>
            <small>{current.label}</small>
          </div>
        </div>
        <div className={styles.previewTopRight}>
          <span className={styles.previewLive}><i /> DEMO MODE</span>
          <span className={styles.previewAvatar}>UW</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
          transition={{ duration: 0.32 }}
          className={styles.previewBody}
        >
          {role === 'contractor' && (
            <div className={styles.contractorScene}>
              <div className={styles.phone}>
                <div className={styles.phoneIsland} />
                <div className={styles.phoneHeader}>
                  <span><MapPin size={13} /> UW-1042</span>
                  <span><CheckCircle2 size={13} /></span>
                </div>
                <div className={styles.phoneImage}>
                  <div className={styles.siteDrawing}>
                    <div className={styles.siteRoad} />
                    <div className={styles.siteTrench} />
                    <div className={styles.siteCone} />
                  </div>
                  <span className={styles.photoCount}><Camera size={12} /> 03</span>
                </div>
                <div className={styles.phoneContent}>
                  <strong>{current.label}</strong>
                  {current.rows.map(([label, value]) => (
                    <div key={label} className={styles.phoneRow}>
                      <span>{label}</span>
                      <b>{value}</b>
                    </div>
                  ))}
                  <div className={styles.phoneAction}>
                    {current.action} <Send size={13} />
                  </div>
                </div>
              </div>

              <div className={styles.floatingEvidence}>
                <span className={styles.evidenceIcon}><Fingerprint size={21} /></span>
                <div>
                  <small>FIELD RECORD / UW-1042</small>
                  <strong>{current.status}</strong>
                  <span><CheckCircle2 size={12} /> GPS + TIME + MEDIA</span>
                </div>
              </div>
              <div className={styles.floatingGeo}>
                <LocateFixed size={16} />
                <span>24.7136° N<br />46.6753° E</span>
              </div>
            </div>
          )}

          {role === 'supervisor' && (
            <div className={styles.supervisorScene}>
              <div className={styles.dashboardHeading}>
                <div>
                  <small>PROJECT OVERVIEW / DEMO</small>
                  <strong>{current.label}</strong>
                </div>
                <span><Activity size={15} /> {current.status}</span>
              </div>
              <div className={styles.dashboardStats}>
                {current.rows.map(([label, value], i) => (
                  <div className={styles.statCard} key={label}>
                    <small>{label}</small>
                    <strong>{value}</strong>
                    <span className={styles[`statAccent${i}`]} />
                  </div>
                ))}
              </div>
              <div className={styles.dashboardLower}>
                <div className={styles.reviewList}>
                  <div className={styles.reviewHeading}>
                    <span>{t.location}</span>
                    <span>UW / REVIEW</span>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div className={styles.reviewItem} key={i}>
                      <div className={styles.reviewIcon}>
                        {i === 0 ? <Camera size={16} /> : i === 1 ? <FileCheck2 size={16} /> : <MapPin size={16} />}
                      </div>
                      <div>
                        <strong>{current.steps[i]}</strong>
                        <small>UW-104{i + 1}</small>
                      </div>
                      <span className={i === 1 ? styles.reviewAmber : styles.reviewGreen}>
                        {i === 1 ? '!' : '✓'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={styles.chartCard}>
                  <small>WORKFLOW / DEMO</small>
                  <div className={styles.barChart}>
                    {[38, 63, 48, 88, 72, 100, 82].map((height, i) => (
                      <div key={i} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <strong>FIELD ACTIVITY</strong>
                </div>
              </div>
            </div>
          )}

          {role === 'municipality' && (
            <div className={styles.municipalityScene}>
              <div className={styles.municipalityMap}>
                <FieldMap t={t} activePoint={activePoint} onPointChange={onPointChange} />
              </div>
              <div className={styles.municipalityDetails}>
                <div className={styles.detailTop}>
                  <span><AlertTriangle size={15} /> {current.status}</span>
                  <strong>UW-1042</strong>
                </div>
                <h4>{activePoint === 1 ? t.point1 : t.point2}</h4>
                <p>{activePoint === 1 ? t.point1Desc : t.point2Desc}</p>
                <div className={styles.detailStatus}>
                  <span>{activePoint === 1 ? t.point1Status : t.point2Status}</span>
                  <span>GIS / DEMO</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.previewFooter}>
        <span><Radio size={12} /> {t.demo}</span>
        <span>UNIFIED WORKS ©</span>
      </div>
    </div>
  )
}

export default function Platform() {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('ar') ? 'ar' : 'en'
  const t = translations[lang]
  const rtl = lang === 'ar'

  const [activeRole, setActiveRole] = useState('contractor')
  const [activePoint, setActivePoint] = useState(2)
  const [activeJourney, setActiveJourney] = useState(0)

  const role = t.roles[activeRole]
  const DirectionArrow = rtl ? ArrowLeft : ArrowRight

  return (
    <main className={styles.platform} dir={rtl ? 'rtl' : 'ltr'}>
      <div className={styles.pageGlow} />

      <section className={styles.intro}>
        <div className={styles.container}>
          <Reveal className={styles.introInner}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {t.eyebrow}
            </div>

            <div className={styles.introLayout}>
              <div className={styles.introText}>
                <span className={styles.kicker}>{t.kicker}</span>
                <h1>
                  {t.title1}
                  <span>{t.title2}</span>
                </h1>
                <p>{t.description}</p>
                <div className={styles.introActions}>
                  <a className={styles.primaryButton} href="#experience">
                    {t.explore} <DirectionArrow size={17} />
                  </a>
                  <Link className={styles.ghostButton} to="/contact">
                    {t.contact} <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>

              <div className={styles.orbitScene} aria-hidden="true">
                <div className={styles.orbitOuter} />
                <div className={styles.orbitMiddle} />
                <div className={styles.orbitInner} />
                <div className={styles.orbitCore}>
                  <Layers3 size={43} strokeWidth={1.4} />
                  <strong>UW</strong>
                  <small>CONNECTED FIELD</small>
                </div>
                <div className={`${styles.orbitSatellite} ${styles.satelliteA}`}>
                  <Camera size={19} />
                </div>
                <div className={`${styles.orbitSatellite} ${styles.satelliteB}`}>
                  <MapPin size={19} />
                </div>
                <div className={`${styles.orbitSatellite} ${styles.satelliteC}`}>
                  <ShieldCheck size={19} />
                </div>
                <div className={styles.orbitLabelA}>FIELD / 01</div>
                <div className={styles.orbitLabelB}>GIS / 02</div>
                <div className={styles.orbitLabelC}>REVIEW / 03</div>
              </div>
            </div>
          </Reveal>

          <a href="#journey" className={styles.scrollLink}>
            <ArrowDown size={16} /> {t.discover}
          </a>
        </div>
      </section>

      <section id="journey" className={styles.journeySection}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>{t.sectionTag}</span>
              <h2>{t.journeyTitle}</h2>
              <p>{t.journeyDesc}</p>
            </div>
          </Reveal>

          <div className={styles.journeyLayout}>
            <div className={styles.journeySteps}>
              {t.journey.map((step, index) => {
                const Icon = journeyIcons[index]
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setActiveJourney(index)}
                    aria-pressed={activeJourney === index}
                    className={`${styles.journeyStep} ${activeJourney === index ? styles.journeyStepActive : ''}`}
                  >
                    <span className={styles.stepNumber}>0{index + 1}</span>
                    <span className={styles.stepIcon}><Icon size={22} /></span>
                    <span className={styles.stepText}>
                      <strong>{step.title}</strong>
                      <small>{step.text}</small>
                    </span>
                    <DirectionArrow className={styles.stepArrow} size={18} />
                  </button>
                )
              })}
            </div>

            <div className={styles.journeyDisplay}>
              <div className={styles.displayChrome}>
                <span><i /><i /><i /></span>
                <span>UNIFIED / FLOW VISUALIZER</span>
                <span>0{activeJourney + 1} / 04</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJourney}
                  className={styles.journeyVisual}
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.03, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.visualHalo} />
                  <div className={styles.visualRing} />
                  <div className={styles.visualCenter}>
                    {(() => {
                      const Icon = journeyIcons[activeJourney]
                      return <Icon size={56} strokeWidth={1.25} />
                    })()}
                  </div>
                  <span className={styles.visualNodeA}><Database size={17} /></span>
                  <span className={styles.visualNodeB}><MapPin size={17} /></span>
                  <span className={styles.visualNodeC}><CheckCircle2 size={17} /></span>
                  <div className={styles.visualInfo}>
                    <small>WORKFLOW / 0{activeJourney + 1}</small>
                    <strong>{t.journey[activeJourney].title}</strong>
                    <p>{t.journey[activeJourney].detail}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className={styles.displayProgress}>
                {t.journey.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`${index + 1}`}
                    aria-pressed={activeJourney === index}
                    onClick={() => setActiveJourney(index)}
                    className={activeJourney === index ? styles.progressActive : ''}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className={styles.experienceSection}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionEyebrow}>{t.experienceTag}</span>
              <h2>{t.experienceTitle}</h2>
              <p>{t.experienceDesc}</p>
            </div>
          </Reveal>

          <div className={styles.roleSelector} role="group" aria-label={t.experienceTitle}>
            {roles.map(({ id, icon: Icon }) => (
              <button
                type="button"
                key={id}
                aria-pressed={activeRole === id}
                className={`${styles.roleButton} ${activeRole === id ? styles.roleButtonActive : ''}`}
                onClick={() => setActiveRole(id)}
              >
                <span className={styles.roleIcon}><Icon size={21} /></span>
                <span className={styles.roleButtonText}>
                  <strong>{t.roles[id].name}</strong>
                  <small>{t.roles[id].subtitle}</small>
                </span>
                <span className={styles.roleSelected}><CheckCircle2 size={16} /></span>
              </button>
            ))}
          </div>

          <div className={styles.experienceLayout}>
            <Reveal className={styles.roleDescription}>
              <span className={styles.roleIndex}>
                {activeRole === 'contractor' ? '01' : activeRole === 'supervisor' ? '02' : '03'} / ROLE EXPERIENCE
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3>{role.headline}</h3>
                  <p>{role.desc}</p>
                  <div className={styles.roleChecklist}>
                    {role.steps.map((step, index) => (
                      <div key={step}>
                        <span>0{index + 1}</span>
                        <strong>{step}</strong>
                        <CheckCircle2 size={16} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className={styles.roleDisclaimer}>
                <Radio size={14} /> {t.simulated}
              </div>
            </Reveal>

            <Reveal className={styles.previewArea} delay={0.1}>
              <RolePreview
                t={t}
                role={activeRole}
                activePoint={activePoint}
                onPointChange={setActivePoint}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.insightSection}>
        <div className={styles.container}>
          <div className={styles.insightLayout}>
            <Reveal className={styles.insightText}>
              <span className={styles.sectionEyebrow}>{t.insightTag}</span>
              <h2>
                {t.insightTitle}
                <span>{t.insightAccent}</span>
              </h2>
              <p>{t.insightDesc}</p>
              <div className={styles.insightRule}>
                <span><Radio size={15} /> GEO-INTELLIGENCE</span>
                <span>UNIFIED WORKS / CONCEPT</span>
              </div>
            </Reveal>

            <div className={styles.capabilityGrid}>
              {t.capabilities.map(([title, description], index) => {
                const Icon = capabilityIcons[index]
                return (
                  <Reveal key={title} delay={index * 0.07}>
                    <div className={styles.capabilityCard}>
                      <span className={styles.capabilityIndex}>0{index + 1}</span>
                      <div className={styles.capabilityIcon}><Icon size={24} /></div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                      <span className={styles.capabilityLine} />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={styles.container}>
          <Reveal className={styles.closingInner}>
            <div className={styles.closingDecoration}><Layers3 size={110} strokeWidth={0.7} /></div>
            <span className={styles.sectionEyebrow}>{t.endTag}</span>
            <h2>
              {t.endTitle}
              <span>{t.endAccent}</span>
            </h2>
            <p>{t.endDesc}</p>
            <div className={styles.closingActions}>
              <Link className={styles.primaryButton} to="/technology">
                {t.technology} <DirectionArrow size={17} />
              </Link>
              <Link className={styles.ghostButton} to="/about">
                {t.about} <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
