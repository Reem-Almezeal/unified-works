
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight,
  ArrowRightLeft, Camera, MapPin, CheckCircle2,
  ShieldCheck, HardHat, Building2, AlertTriangle,
  Waves, Zap, Layers3, Database, Eye, FileCheck2,
  Activity, CircleHelp, Sparkles
} from 'lucide-react'
import styles from './Impact.module.css'

const dictionary = {
  ar: {
    label: 'UNIFIED WORKS / IMPACT',
    kicker: 'الأثر يبدأ قبل إغلاق الحفرة',
    headline: 'المدينة لا تنسى،',
    accent: 'حين نوثّق ما تحتها.',
    intro: 'أعمال تُنجز تحت شوارعنا ثم تختفي عن الأنظار. نطمح لتحويل كل موقع عمل إلى دليل مرئي وسجل مشترك يساعد الجهات على اتخاذ قرارات أفضل.',
    explore: 'اكشف الفرق',
    evidence: 'نتائج التجربة',
    heroDemo: 'تصور بصري توضيحي',
    heroRoad: 'سطح الطريق',
    heroBelow: 'ما تحت السطح',
    heroRecord: 'سجل موقع موثق',
    heroCamera: 'صورة ميدانية',
    heroPermit: 'مراجعة واعتماد',
    heroHint: 'من العمل المخفي إلى المعرفة المشتركة',

    compareLabel: '01 / BEFORE & AFTER',
    compareTitle: 'نفس الشارع.',
    compareAccent: 'لكن برؤية مختلفة.',
    compareDesc: 'اسحب المؤشر لكشف التمديدات المدفونة. قبل الحل لا تظهر أي معلومات عن الشبكات، ومع Unified Works تظهر طبقة توثيق توضيحية مرتبطة بالموقع.',
    before: 'قبل الحل',
    after: 'مع Unified Works',
    beforeText: 'الأعمال المدفونة غير مرئية في هذا التصور، وقد تكون سجلاتها متفرقة.',
    afterText: 'عرض توضيحي لمواقع التمديدات وسجل توثيق مشترك.',
    beforeTags: ['معلومات متفرقة', 'لا توجد رؤية للتمديدات', 'مراجعة أصعب'],
    afterTags: ['موقع موثق', 'تمديدات مرئية', 'مرجع مشترك'],
    drag: 'اسحب للكشف',
    sceneNote: 'مشهد تصوري، وليس خريطة فعلية للمرافق',
    record: 'سجل موثق',

    rolesLabel: '02 / CONNECTED IMPACT',
    rolesTitle: 'ثلاث جهات.',
    rolesAccent: 'أثر مترابط.',
    rolesDesc: 'اختر الجهة لترى دورها في دورة المعلومات. المحاكاة توضيحية ولا تمثل ربطًا فعليًا بأنظمة الجهات.',
    roles: [
      {
        title: 'المقاول',
        subtitle: 'يوثّق العمل قبل أن يختفي',
        desc: 'يضيف صور الموقع والبيانات والمستندات اللازمة إلى سجل مرتبط بمكان التنفيذ.',
        steps: ['تحديد موقع العمل', 'إرفاق الصور والمستندات', 'إرسال السجل للمراجعة']
      },
      {
        title: 'الجهة المشرفة',
        subtitle: 'تراجع الدليل بدل البحث عنه',
        desc: 'تراجع السجلات والحالات غير المؤكدة وتوثق قرار الاعتماد قبل إضافتها إلى المرجع.',
        steps: ['استقبال السجل', 'مراجعة الصور غير المؤكدة', 'اعتماد أو طلب تصحيح']
      },
      {
        title: 'البلدية',
        subtitle: 'ترى الصورة الأوسع',
        desc: 'يمكن أن تستفيد مستقبلًا من رؤية مكانية للأعمال الموثقة والحالات التي تتطلب متابعة، دون افتراض تكامل حالي مع التصاريح.',
        steps: ['استعراض الأعمال على الخريطة', 'تحديد الحالات المحتاجة للمتابعة', 'دعم التنسيق بين الجهات']
      }
    ],
    flow: 'مسار العمل المقترح',
    flowSteps: ['توثيق', 'مراجعة', 'مرجع مشترك'],
    mapLabel: 'CITY RECORD / CONCEPT',
    mapNote: 'مواقع وسجلات افتراضية',

    outcomesLabel: '03 / EXPECTED IMPACT',
    outcomesTitle: 'قيمة تتجاوز',
    outcomesAccent: 'حدود الحفرة.',
    outcomesDesc: 'هذه الفوائد تمثل أثرًا مستهدفًا يحتاج إلى قياس في تجربة ميدانية.',
    outcomes: [
      { title: 'وضوح أكبر', desc: 'معرفة ما نُفّذ وأين من خلال سجلات مرتبطة بالموقع.' },
      { title: 'مراجعة مبكرة', desc: 'إتاحة التحقق من الأدلة قبل إغلاق العمل بدل انتظار ظهور المشكلة.' },
      { title: 'تنسيق أفضل', desc: 'تقليل تشتت السجلات بين الأطراف المشاركة.' },
      { title: 'مساءلة قابلة للتتبع', desc: 'الرجوع إلى الصور والمستندات وقرارات المراجعة.' }
    ],
    outcomesNote: 'لم تُقَس بعد نسب انخفاض الشكاوى أو التكلفة أو زمن المعالجة.',

    evidenceLabel: '04 / RESEARCH EVIDENCE',
    evidenceTitle: 'من الفكرة',
    evidenceAccent: 'إلى اختبار أولي.',
    evidenceDesc: 'الأرقام التالية واردة في البروشور البحثي للمشروع، وتخص تجربة التعرف على الصور لا الأثر التشغيلي للمدن.',
    stats: [
      { value: '148', label: 'صورة حقيقية', note: 'استُخدمت ضمن مجموعة التجربة.' },
      { value: '99.5%', label: 'دقة بعد 10 موافقات', note: 'بحسب النتائج المذكورة في البروشور.' },
      { value: '44/45', label: 'صورة كابلات تم التعرف عليها', note: 'ضمن الاختبار المعروض.' },
      { value: '0', label: 'قبول آلي خاطئ', note: 'في الاختبار الموصوف فقط.' }
    ],
    evidenceNote: 'نتائج أولية لعينة محددة. يلزم اختبار ميداني أوسع للتحقق من الأداء.',

    futureLabel: '05 / CITY MEMORY',
    futureTitle: 'كل سجل اليوم،',
    futureAccent: 'معرفة للغد.',
    futureDesc: 'كل صورة معتمدة وموقع موثق يمكن أن يضيف معلومة جديدة إلى مرجع مكاني يساعد في التخطيط والتنسيق مستقبلًا.',
    futureSteps: [
      ['01', 'توثيق', 'صورة وموقع ومعلومات العمل'],
      ['02', 'مراجعة', 'قرار اعتماد موثق'],
      ['03', 'تراكم المعرفة', 'مرجع مكاني مشترك']
    ],
    futureNote: 'رؤية مستقبلية تتطلب تطبيقًا ميدانيًا واتفاقيات مشاركة بيانات.',

    ctaLabel: 'WHAT COMES NEXT',
    ctaTitle: 'الأثر لا يُفترض.',
    ctaAccent: 'بل يُختبر ويُقاس.',
    ctaDesc: 'لنناقش تجربة ميدانية أو شراكة تساعد على اختبار الفكرة في الواقع.',
    platform: 'استكشف المنصة',
    contact: 'ناقش شراكة'
  },

  en: {
    label: 'UNIFIED WORKS / IMPACT',
    kicker: 'Impact begins before the trench is closed',
    headline: 'A city remembers',
    accent: 'when we document what lies beneath.',
    intro: 'Work happens below our streets and then disappears from view. Our vision is to turn every worksite into visible evidence and a shared record for better decisions.',
    explore: 'Reveal the difference',
    evidence: 'Research results',
    heroDemo: 'Illustrative concept',
    heroRoad: 'Road surface',
    heroBelow: 'Below the surface',
    heroRecord: 'Documented site record',
    heroCamera: 'Field photo',
    heroPermit: 'Review and approval',
    heroHint: 'From hidden work to shared knowledge',

    compareLabel: '01 / BEFORE & AFTER',
    compareTitle: 'The same street.',
    compareAccent: 'A different perspective.',
    compareDesc: 'Drag the divider to reveal buried utilities. Before, no utility information is visible. With Unified Works, an illustrative documentation layer appears.',
    before: 'Before',
    after: 'With Unified Works',
    beforeText: 'Buried work is invisible in this concept, and records may be fragmented.',
    afterText: 'Illustrative utility locations and a shared documentation record.',
    beforeTags: ['Fragmented information', 'No utility visibility', 'Harder review'],
    afterTags: ['Documented location', 'Visible utilities', 'Shared reference'],
    drag: 'Drag to reveal',
    sceneNote: 'Concept illustration, not a real utility map',
    record: 'Verified record',

    rolesLabel: '02 / CONNECTED IMPACT',
    rolesTitle: 'Three stakeholders.',
    rolesAccent: 'One connected impact.',
    rolesDesc: 'Choose a stakeholder to explore its proposed role. This is a concept simulation, not a live integration.',
    roles: [
      {
        title: 'Contractor',
        subtitle: 'Document work before it disappears',
        desc: 'Adds site photos, details, and documents to a location-linked record.',
        steps: ['Locate the worksite', 'Attach photos and documents', 'Submit for review']
      },
      {
        title: 'Supervising agency',
        subtitle: 'Review evidence, not scattered files',
        desc: 'Reviews records and uncertain cases, then documents the approval decision.',
        steps: ['Receive the record', 'Review uncertain photos', 'Approve or request correction']
      },
      {
        title: 'Municipality',
        subtitle: 'See the bigger picture',
        desc: 'Could eventually benefit from a spatial view of documented work and flagged cases; permit integration is not yet assumed.',
        steps: ['Explore mapped records', 'Identify cases for follow-up', 'Support coordination']
      }
    ],
    flow: 'Proposed information flow',
    flowSteps: ['Capture', 'Review', 'Shared reference'],
    mapLabel: 'CITY RECORD / CONCEPT',
    mapNote: 'Illustrative locations and records',

    outcomesLabel: '03 / EXPECTED IMPACT',
    outcomesTitle: 'Value beyond',
    outcomesAccent: 'the excavation.',
    outcomesDesc: 'These are intended benefits that require measurement in a field pilot.',
    outcomes: [
      { title: 'Greater visibility', desc: 'Know what was done and where through location-linked records.' },
      { title: 'Earlier review', desc: 'Support evidence checks before closing the work.' },
      { title: 'Better coordination', desc: 'Reduce fragmented records across stakeholders.' },
      { title: 'Traceable accountability', desc: 'Retrieve photos, documents, and review decisions.' }
    ],
    outcomesNote: 'No operational reduction in complaints, costs, or resolution time has yet been measured.',

    evidenceLabel: '04 / RESEARCH EVIDENCE',
    evidenceTitle: 'From an idea',
    evidenceAccent: 'to initial testing.',
    evidenceDesc: 'These figures come from the project research poster and concern image recognition, not city-wide operational impact.',
    stats: [
      { value: '148', label: 'Real field photos', note: 'Included in the experiment set.' },
      { value: '99.5%', label: 'Accuracy after 10 approvals', note: 'As reported in the research poster.' },
      { value: '44/45', label: 'Cable photos recognized', note: 'Within the reported test.' },
      { value: '0', label: 'Wrong auto-acceptances', note: 'In the described experiment only.' }
    ],
    evidenceNote: 'Early results from a limited sample. Broader field validation is needed.',

    futureLabel: '05 / CITY MEMORY',
    futureTitle: 'Every record today',
    futureAccent: 'informs tomorrow.',
    futureDesc: 'Every approved photo and documented site could add to a spatial reference that supports future planning and coordination.',
    futureSteps: [
      ['01', 'Capture', 'A photo, location, and work details'],
      ['02', 'Review', 'A documented approval decision'],
      ['03', 'Build knowledge', 'A shared spatial reference']
    ],
    futureNote: 'A future vision requiring field deployment and data-sharing agreements.',

    ctaLabel: 'WHAT COMES NEXT',
    ctaTitle: 'Impact is not assumed.',
    ctaAccent: 'It is tested and measured.',
    ctaDesc: 'Discuss a potential field pilot or partnership to validate the concept.',
    platform: 'Explore the platform',
    contact: 'Discuss partnership'
  }
}

const roleIcons = [HardHat, Building2, ShieldCheck]
const outcomeIcons = [Eye, AlertTriangle, Layers3, FileCheck2]

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  )
}

function Heading({ label, title, accent, description }) {
  return (
    <Reveal className={styles.sectionHeading}>
      <span className={styles.eyebrow}>{label}</span>
      <h2>{title}<em>{accent}</em></h2>
      <p>{description}</p>
    </Reveal>
  )
}

/* NEW HERO: CITY CUTAWAY */

function CityCutaway({ t }) {
  return (
    <div className={styles.cutaway} aria-label={t.heroDemo}>
      <div className={styles.cutawayTop}>
        <span><Activity size={14} /> IMPACT / CITY SECTION</span>
        <span>{t.heroDemo}</span>
      </div>

      <div className={styles.cutawayScene}>
        <div className={styles.cutawaySky}>
          <div className={styles.cutawayBuildings}>
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        <div className={styles.cutawayRoad}>
          <div className={styles.cutawayRoadLine} />
        </div>

        <div className={styles.cutawayGround}>
          <div className={styles.cutawaySoil} />
          <div className={styles.cutawayWater}>
            <Waves size={18} />
          </div>
          <div className={styles.cutawayPower}>
            <Zap size={18} />
          </div>
          <div className={styles.cutawayTrench} />
        </div>

        <div className={styles.cutawayScan}>
          <div className={styles.scanBeam} />
          <div className={styles.scanPulse} />
        </div>

        <div className={styles.cutawayRoadLabel}>
          <MapPin size={14} />
          {t.heroRoad}
        </div>

        <div className={styles.cutawayGroundLabel}>
          <Layers3 size={14} />
          {t.heroBelow}
        </div>

        <motion.div
          className={`${styles.floatingData} ${styles.floatingPhoto}`}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Camera size={18} />
          <span>{t.heroCamera}</span>
        </motion.div>

        <motion.div
          className={`${styles.floatingData} ${styles.floatingApproval}`}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <ShieldCheck size={18} />
          <span>{t.heroPermit}</span>
        </motion.div>

        <div className={styles.recordTag}>
          <Database size={17} />
          <div>
            <strong>UW-1042</strong>
            <small>{t.heroRecord}</small>
          </div>
          <CheckCircle2 size={17} />
        </div>
      </div>

      <div className={styles.cutawayBottom}>
        <span><span className={styles.liveDot} /> {t.heroHint}</span>
        <span>CONCEPT / 001</span>
      </div>
    </div>
  )
}

/* BEFORE & AFTER: UTILITIES ARE HIDDEN BEFORE REVEAL */

function StreetScene({ t, value, rtl }) {
  return (
    <div className={styles.streetScene}>
      <div className={styles.skyline}>
        {Array.from({ length: 9 }, (_, i) => <span key={i} />)}
      </div>

      <div className={styles.streetSurface}>
        <div className={styles.roadStripe} />
      </div>

      <div className={styles.underground}>
        <div className={styles.soilLayers} />
        <div className={styles.excavation} />
      </div>

      <div
        className={styles.afterLayer}
        style={{
          clipPath: rtl
            ? `inset(0 0 0 ${100 - value}%)`
            : `inset(0 ${100 - value}% 0 0)`
        }}
      >
        <div className={styles.digitalGrid} />

        <div className={styles.waterPipe}>
          <Waves size={17} />
        </div>

        <div className={styles.powerPipe}>
          <Zap size={17} />
        </div>

        <div className={styles.verifiedPipeOne} />
        <div className={styles.verifiedPipeTwo} />

        <div className={styles.verifiedMarker}>
          <CheckCircle2 size={24} />
          <span>UW-1042</span>
        </div>

        <div className={styles.digitalRecord}>
          <CheckCircle2 size={17} />
          <span>{t.record}</span>
        </div>
      </div>

      <div
        className={styles.comparisonHandle}
        style={{ left: `${rtl ? 100 - value : value}%` }}
      >
        <div className={styles.handleButton}>
          <ArrowRightLeft size={20} />
        </div>
      </div>

      <div className={styles.sceneBeforeLabel}>{t.before}</div>
      <div className={styles.sceneAfterLabel}>{t.after}</div>
      <div className={styles.sceneDisclaimer}>{t.sceneNote}</div>
    </div>
  )
}

function BeforeAfter({ t, rtl }) {
  const [value, setValue] = useState(50)

  return (
    <Reveal className={styles.comparison}>
      <div className={styles.comparisonTop}>
        <span><Activity size={16} /> IMPACT COMPARISON / 001</span>
        <span>CONCEPT SCENARIO</span>
      </div>

      <div className={styles.comparisonVisual}>
        <StreetScene t={t} value={value} rtl={rtl} />

        <input
          className={styles.comparisonRange}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          aria-label={t.drag}
          dir="ltr"
        />
      </div>

      <div className={styles.comparisonBottom}>
        <div className={styles.comparisonDescription}>
          <i className={styles.beforeDot} />
          <div>
            <strong>{t.before}</strong>
            <p>{t.beforeText}</p>
            <div className={styles.issueTags}>
              {t.beforeTags.map(x => <span key={x}>{x}</span>)}
            </div>
          </div>
        </div>

        <div className={styles.comparisonCenter}>
          <ArrowRightLeft size={21} />
          <small>{t.drag}</small>
          <strong>{value}%</strong>
        </div>

        <div className={styles.comparisonDescription}>
          <i className={styles.afterDot} />
          <div>
            <strong>{t.after}</strong>
            <p>{t.afterText}</p>
            <div className={styles.issueTags}>
              {t.afterTags.map(x => <span key={x}>{x}</span>)}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* INTERACTIVE STAKEHOLDERS */

function NetworkMap({ t, active }) {
  const locations = [
    { x: 19, y: 34, color: 'blue' },
    { x: 72, y: 26, color: 'gold' },
    { x: 39, y: 73, color: 'orange' },
    { x: 78, y: 72, color: 'blue' }
  ]

  return (
    <div className={styles.network}>
      <div className={styles.networkHead}>
        <span><MapPin size={15} /> {t.mapLabel}</span>
        <span>DEMO</span>
      </div>

      <div className={styles.networkMap}>
        <div className={styles.mapBlocks} />
        <div className={styles.mapRoadOne} />
        <div className={styles.mapRoadTwo} />

        <svg
          className={styles.networkLines}
          viewBox="0 0 600 390"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M114 133 L300 195 L432 101 L468 280 L234 285 Z"
            stroke="#f0c775"
            strokeWidth="2"
            strokeDasharray="7 9"
            fill="none"
          />
          <path
            d="M114 133 L468 280 M234 285 L432 101"
            stroke="#48b8ff"
            strokeWidth="2"
            strokeDasharray="6 9"
            fill="none"
          />
        </svg>

        {locations.map((loc, i) => (
          <div
            key={i}
            className={`${styles.networkPin} ${styles[`pin_${loc.color}`]}`}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            <MapPin size={16} />
          </div>
        ))}

        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.networkFocus}
        >
          <span>UW / 0{active + 1}</span>
          <strong>{t.roles[active].title}</strong>
          <CheckCircle2 size={19} />
        </motion.div>

        <span className={styles.networkDisclaimer}>{t.mapNote}</span>
      </div>

      <div className={styles.networkFoot}>
        <span><i className={styles.blueDot} /> WATER</span>
        <span><i className={styles.goldDot} /> POWER</span>
        <span><i className={styles.orangeDot} /> FIELDWORK</span>
      </div>
    </div>
  )
}

function RoleExperience({ t }) {
  const [active, setActive] = useState(0)
  const role = t.roles[active]
  const Icon = roleIcons[active]

  return (
    <Reveal className={styles.roleExperience}>
      <div className={styles.roleTabs}>
        {t.roles.map((r, i) => {
          const TabIcon = roleIcons[i]
          return (
            <button
              key={i}
              type="button"
              aria-pressed={active === i}
              className={`${styles.roleTab} ${active === i ? styles.roleTabActive : ''}`}
              onClick={() => setActive(i)}
            >
              <TabIcon size={22} />
              <span>{r.title}</span>
              <small>0{i + 1}</small>
            </button>
          )
        })}
      </div>

      <div className={styles.roleBody}>
        <div className={styles.roleCopy}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.roleIcon}>
                <Icon size={30} />
              </div>
              <span className={styles.miniLabel}>ROLE / 0{active + 1}</span>
              <h3>{role.subtitle}</h3>
              <p>{role.desc}</p>

              <div className={styles.roleSteps}>
                {role.steps.map((s, i) => (
                  <div key={s}>
                    <CheckCircle2 size={17} />
                    <span>0{i + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.flowBox}>
            <small>{t.flow}</small>
            <div>
              {t.flowSteps.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < 2 && <ArrowLeft size={13} />}
                </span>
              ))}
            </div>
          </div>
        </div>

        <NetworkMap t={t} active={active} />
      </div>
    </Reveal>
  )
}

/* COMPLETE PAGE */

export default function Impact() {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('ar') ? 'ar' : 'en'
  const t = dictionary[lang]
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight

  return (
    <main className={styles.page} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Reveal className={styles.heroCopy}>
            <span className={styles.eyebrow}>{t.label}</span>
            <span className={styles.heroKicker}>{t.kicker}</span>

            <h1>{t.headline}<em>{t.accent}</em></h1>
            <p>{t.intro}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#comparison">
                {t.explore}
                <Arrow size={18} />
              </a>
              <a className={styles.secondaryButton} href="#evidence">
                {t.evidence}
                <ArrowDown size={18} />
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.heroVisual} delay={0.1}>
            <CityCutaway t={t} />
          </Reveal>

          <div className={styles.heroBottom}>
            <span>CAPTURE / VERIFY / PRESERVE</span>
            <a href="#comparison"><ArrowDown size={17} /></a>
          </div>
        </div>
      </section>

      <section className={styles.section} id="comparison">
        <div className={styles.container}>
          <Heading
            label={t.compareLabel}
            title={t.compareTitle}
            accent={t.compareAccent}
            description={t.compareDesc}
          />
          <BeforeAfter t={t} rtl={lang === 'ar'} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={styles.container}>
          <Heading
            label={t.rolesLabel}
            title={t.rolesTitle}
            accent={t.rolesAccent}
            description={t.rolesDesc}
          />
          <RoleExperience t={t} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <Heading
            label={t.outcomesLabel}
            title={t.outcomesTitle}
            accent={t.outcomesAccent}
            description={t.outcomesDesc}
          />

          <div className={styles.outcomesGrid}>
            {t.outcomes.map((o, i) => {
              const Icon = outcomeIcons[i]
              return (
                <Reveal
                  className={styles.outcomeCard}
                  key={i}
                  delay={i * 0.07}
                >
                  <div className={styles.cardTop}>
                    <span>0{i + 1} / EXPECTED</span>
                    <ArrowUpRight size={17} />
                  </div>
                  <Icon className={styles.outcomeIcon} size={32} />
                  <h3>{o.title}</h3>
                  <p>{o.desc}</p>
                </Reveal>
              )
            })}
          </div>

          <div className={styles.notice}>
            <CircleHelp size={17} />
            {t.outcomesNote}
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.altSection}`}
        id="evidence"
      >
        <div className={styles.container}>
          <Heading
            label={t.evidenceLabel}
            title={t.evidenceTitle}
            accent={t.evidenceAccent}
            description={t.evidenceDesc}
          />

          <div className={styles.statsGrid}>
            {t.stats.map((s, i) => (
              <Reveal
                className={styles.statCard}
                key={i}
                delay={i * 0.07}
              >
                <span>RESEARCH / 0{i + 1}</span>
                <strong>{s.value}</strong>
                <h3>{s.label}</h3>
                <p>{s.note}</p>
                <div className={styles.statFoot}>
                  <Activity size={14} />
                  EXPERIMENTAL RESULT
                </div>
              </Reveal>
            ))}
          </div>

          <div className={styles.notice}>
            <AlertTriangle size={17} />
            {t.evidenceNote}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.futureLayout}>
            <Reveal className={styles.futureCopy}>
              <span className={styles.eyebrow}>{t.futureLabel}</span>
              <h2>{t.futureTitle}<em>{t.futureAccent}</em></h2>
              <p>{t.futureDesc}</p>

              <div className={styles.futureSteps}>
                {t.futureSteps.map(([n, title, desc]) => (
                  <div key={n}>
                    <span>{n}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.notice}>
                <CircleHelp size={17} />
                {t.futureNote}
              </div>
            </Reveal>

            <Reveal className={styles.futureVisual} delay={0.1}>
              <div className={styles.futureVisualHead}>
                <span><Database size={17} /> CITY MEMORY</span>
                <span>CONCEPT</span>
              </div>

              <div className={styles.layerStack}>
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    className={`${styles.layerCard} ${styles[`layer${i}`]}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.14 }}
                  >
                    <Layers3 size={23} />
                    <span>RECORD / 0{i + 1}</span>
                  </motion.div>
                ))}
              </div>

              <div className={styles.futureVisualFoot}>
                <CheckCircle2 size={16} />
                SHARED SPATIAL REFERENCE
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <Reveal className={styles.cta}>
            <span className={styles.eyebrow}>
              <Sparkles size={16} />
              {t.ctaLabel}
            </span>

            <h2>{t.ctaTitle}<em>{t.ctaAccent}</em></h2>
            <p>{t.ctaDesc}</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/platform">
                {t.platform}
                <Arrow size={18} />
              </Link>
              <Link className={styles.secondaryButton} to="/contact">
                {t.contact}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
