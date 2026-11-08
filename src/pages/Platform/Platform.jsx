
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
    kicker: 'منصة واحدة. رؤية أوسع.',
    title1: 'الميدان يتحرك.',
    title2: 'والمعلومة تواكبه.',
    description:
      'من أول صورة في موقع العمل إلى آخر قرار رقابي، تجمع الأعمال الموحّدة البيانات والمواقع والتصاريح والمسؤوليات في تجربة رقمية مترابطة.',
    explore: 'عش تجربة المنصة',
    contact: 'تواصل معنا',
    discover: 'اكتشف كيف تعمل',
    live: 'محاكاة تفاعلية',
    demo: 'بيانات توضيحية لعرض فكرة المنصة',
    sectionTag: '01 / CONNECTED JOURNEY',
    journeyTitle: 'كل خطوة تترك أثرًا.',
    journeyDesc:
      'رحلة واضحة تربط ما يحدث على الأرض بما تحتاج الجهات إلى معرفته ومتابعته.',
    journey: [
      {
        title: 'من قلب الميدان',
        text: 'يبدأ المقاول بتسجيل العمل وتحديد موقعه وإرفاق الصور والبيانات.',
        detail: 'توثيق الموقع والوقت والصور',
      },
      {
        title: 'بيانات مرتبطة بالمكان',
        text: 'ترتبط السجلات بالمشروع والتصاريح والجهة المنفذة.',
        detail: 'ربط جغرافي وسجل موحد',
      },
      {
        title: 'مراجعة مدعومة بالذكاء',
        text: 'تساعد أدوات التحليل في إبراز الحالات التي تحتاج إلى مراجعة.',
        detail: 'مؤشرات للمراجعة والتحقق',
      },
      {
        title: 'قرار ومتابعة',
        text: 'تظهر حالة العمل والملاحظات والجهات ذات العلاقة في لوحة واحدة.',
        detail: 'رؤية مشتركة لحالة المشروع',
      },
    ],
    experienceTag: '02 / EXPLORE BY ROLE',
    experienceTitle: 'ثلاث جهات. ثلاث زوايا للرؤية.',
    experienceDesc:
      'اختر دورك وشاهد كيف تتغير المعلومات والأدوات بحسب احتياج كل جهة.',
    roles: {
      contractor: {
        name: 'المقاول',
        subtitle: 'من موقع التنفيذ',
        headline: 'كل عمل يبدأ بتوثيق واضح.',
        desc:
          'تجربة ميدانية تسهّل تسجيل الأعمال، وإضافة الصور، وإرفاق التصاريح، وربط كل شيء بموقع المشروع.',
        label: 'تطبيق العمل الميداني',
        action: 'إرسال التوثيق',
        status: 'جاهز للإرسال',
        rows: [
          ['موقع المشروع', 'الرياض — موقع تجريبي'],
          ['نوع العمل', 'تمديد كابل كهربائي'],
          ['المرفقات', '3 صور + تصريح'],
        ],
        steps: ['تحديد الموقع', 'التقاط الصور', 'إرفاق التصريح', 'إرسال السجل'],
      },
      supervisor: {
        name: 'الجهة المشرفة',
        subtitle: 'رؤية موحدة للأعمال',
        headline: 'التفاصيل المهمة أمامك.',
        desc:
          'متابعة سجلات الأعمال، ومراجعة المستندات والصور، ورصد الملاحظات دون التنقل بين مصادر متفرقة.',
        label: 'لوحة الإشراف',
        action: 'مراجعة السجل',
        status: 'تحتاج مراجعة',
        rows: [
          ['الأعمال المسجلة', '24'],
          ['بانتظار المراجعة', '6'],
          ['ملاحظات مفتوحة', '3'],
        ],
        steps: ['استعراض المشاريع', 'مراجعة الأدلة', 'تسجيل ملاحظة', 'متابعة المعالجة'],
      },
      municipality: {
        name: 'البلدية',
        subtitle: 'رقابة مرتبطة بالموقع',
        headline: 'من موقع الملاحظة إلى المسؤولية.',
        desc:
          'استعراض الأعمال جغرافيًا وربط الموقع بالسجلات والتصاريح والجهات المسؤولة لدعم المتابعة الرقابية.',
        label: 'المراقبة الجغرافية',
        action: 'استعراض الموقع',
        status: 'ملاحظة ميدانية',
        rows: [
          ['الموقع', 'نقطة رقم 02'],
          ['الحالة', 'إعادة سفلتة غير مكتملة'],
          ['الجهة المنفذة', 'مقاول المشروع — تجريبي'],
        ],
        steps: ['اختيار الموقع', 'مطابقة السجلات', 'مراجعة التصريح', 'متابعة الملاحظة'],
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
    point1Desc: 'مسار حفر مقترح بالقرب من شبكات المرافق',
    point2Desc: 'إعادة تأهيل الموقع لم تكتمل بعد تنفيذ التمديدات',
    point1Status: 'قيد المراجعة',
    point2Status: 'تحتاج متابعة',
    insightTag: '03 / INTELLIGENT VISIBILITY',
    insightTitle: 'ليست مجرد بيانات.',
    insightAccent: 'إنها صورة أوضح للواقع.',
    insightDesc:
      'عندما ترتبط الصور والمواقع والتصاريح والسجلات، يصبح اكتشاف التعارضات ومتابعة المسؤوليات أكثر وضوحًا.',
    capabilities: [
      ['توثيق جغرافي', 'كل سجل مرتبط بموقعه.'],
      ['سجل بصري', 'الصور جزء من تاريخ العمل.'],
      ['تحليل ذكي', 'مؤشرات تساعد على المراجعة.'],
      ['متابعة مترابطة', 'حالة العمل والملاحظات في مكان واحد.'],
    ],
    endTag: 'THE FUTURE OF FIELD VISIBILITY',
    endTitle: 'مستقبل العمل الميداني',
    endAccent: 'يبدأ من وضوح المعلومة.',
    endDesc:
      'تعرّف على الرؤية التقنية وراء الأعمال الموحّدة، وكيف يمكن أن تتطور التجربة إلى منظومة أكثر تكاملًا.',
    technology: 'استكشف التقنية',
    about: 'عن المشروع',
    simulated: 'عرض تصوري — لا يمثل ربطًا فعليًا بالأنظمة الحكومية',
  },
  en: {
    eyebrow: 'UNIFIED WORKS / PLATFORM EXPERIENCE',
    kicker: 'One platform. Greater visibility.',
    title1: 'The field moves.',
    title2: 'Information keeps up.',
    description:
      'From the first site photo to the final review, Unified Works connects field records, locations, permits, and responsibilities in one digital experience.',
    explore: 'Explore the experience',
    contact: 'Contact us',
    discover: 'Discover how it works',
    live: 'Interactive simulation',
    demo: 'Illustrative data for product demonstration',
    sectionTag: '01 / CONNECTED JOURNEY',
    journeyTitle: 'Every step leaves a trace.',
    journeyDesc:
      'A connected journey between field activities and the information organizations need to review.',
    journey: [
      {
        title: 'On-site capture',
        text: 'Contractors record activities, locations, photos, and field details.',
        detail: 'Location, time, and visual evidence',
      },
      {
        title: 'Location-linked records',
        text: 'Each record connects to the project, permits, and responsible contractor.',
        detail: 'Geospatial context and records',
      },
      {
        title: 'AI-assisted review',
        text: 'Analysis tools help highlight cases that may require human review.',
        detail: 'Review signals and verification',
      },
      {
        title: 'Action and follow-up',
        text: 'Work status, observations, and stakeholders appear in one workspace.',
        detail: 'A shared operational picture',
      },
    ],
    experienceTag: '02 / EXPLORE BY ROLE',
    experienceTitle: 'Three roles. Three perspectives.',
    experienceDesc:
      'Select a role to see how the experience adapts to different operational needs.',
    roles: {
      contractor: {
        name: 'Contractor',
        subtitle: 'From the worksite',
        headline: 'Every project starts with clear evidence.',
        desc:
          'A field experience for recording activities, attaching photos and permits, and linking documentation to project locations.',
        label: 'Field application',
        action: 'Submit record',
        status: 'Ready to submit',
        rows: [
          ['Project location', 'Riyadh — demo site'],
          ['Activity', 'Electrical cable installation'],
          ['Attachments', '3 photos + permit'],
        ],
        steps: ['Locate site', 'Capture photos', 'Attach permit', 'Submit record'],
      },
      supervisor: {
        name: 'Supervisor',
        subtitle: 'A unified overview',
        headline: 'The important details, in focus.',
        desc:
          'Review project records, documents, photos, and observations from a connected workspace.',
        label: 'Supervision dashboard',
        action: 'Review record',
        status: 'Needs review',
        rows: [
          ['Registered activities', '24'],
          ['Pending review', '6'],
          ['Open observations', '3'],
        ],
        steps: ['Browse projects', 'Review evidence', 'Add observation', 'Track resolution'],
      },
      municipality: {
        name: 'Municipality',
        subtitle: 'Location-based oversight',
        headline: 'From observation to accountability.',
        desc:
          'Explore location-linked activities, permits, and responsible parties to support municipal oversight.',
        label: 'Geospatial monitoring',
        action: 'Inspect location',
        status: 'Field observation',
        rows: [
          ['Location', 'Point 02'],
          ['Status', 'Road restoration incomplete'],
          ['Responsible party', 'Project contractor — demo'],
        ],
        steps: ['Select location', 'Match records', 'Review permit', 'Track observation'],
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
    point1Desc: 'Proposed excavation near existing utility networks',
    point2Desc: 'Site restoration remains incomplete after cable installation',
    point1Status: 'Under review',
    point2Status: 'Follow-up needed',
    insightTag: '03 / INTELLIGENT VISIBILITY',
    insightTitle: 'More than data.',
    insightAccent: 'A clearer picture of reality.',
    insightDesc:
      'When imagery, locations, permits, and records are connected, potential conflicts and responsibilities become easier to review.',
    capabilities: [
      ['Geospatial records', 'Every record has a location.'],
      ['Visual history', 'Photos document the work.'],
      ['AI-assisted analysis', 'Signals support human review.'],
      ['Connected follow-up', 'Work status in one place.'],
    ],
    endTag: 'THE FUTURE OF FIELD VISIBILITY',
    endTitle: 'The future of fieldwork',
    endAccent: 'starts with clarity.',
    endDesc:
      'Discover the technology vision behind Unified Works and the potential for a more connected ecosystem.',
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
