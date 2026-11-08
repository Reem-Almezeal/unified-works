import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ScanEye,
  MapPinned,
  Camera,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BrainCircuit,
  Database,
  MapPin,
  Image as ImageIcon,
  RotateCcw,
  Play,
  Layers3,
  GitBranch,
  Fingerprint,
  Check,
  Sparkles,
  Activity,
  HardHat,
  FileCheck2,
  ScanLine,
  CircleHelp,
} from 'lucide-react'
import styles from './Technology.module.css'

const content = {
  ar: {
    eyebrow: 'UNIFIED WORKS / INTELLIGENCE LAB',
    heroSmall: 'التقنية وراء القرار',
    heroTitle: 'فحص ذكي',
    heroAccent: 'للأعمال الميدانية',
    heroEnd: '',
    heroDesc:
      'كيف نتحقق من أعمال الحفر قبل أن تختفي تحت الأرض؟ باستخدام صور ميدانية مرتبطة بالموقع، ومكتبة مرجعية تتطور بقرارات المشرفين، يمكن تحويل الصورة إلى دليل قابل للمراجعة',
    tryLab: 'جرّب المختبر',
    seeResults: 'نتائج التجربة',
    heroNote: 'FIELD PHOTO → AI CHECK → HUMAN REVIEW → SHARED RECORD',

    labEyebrow: '01 / INTERACTIVE AI LAB',
    labTitle: 'اختبر فحص',
    labAccent: 'الصور الميدانية',
    labDesc:
      'اختر حالة مختلفة ثم شغّل الفحص لتكتشف كيف يمكن أن يتعامل النظام مع صور الأعمال الميدانية',
    demo: 'محاكاة توضيحية',
    selectCase: 'اختر سيناريو الاختبار',
    analyze: 'ابدأ فحص الصورة',
    again: 'إعادة الفحص',
    waiting: 'بانتظار تشغيل الفحص',
    processing: 'جارٍ مقارنة الصورة بالمكتبة المرجعية',
    completed: 'اكتمل الفحص التوضيحي',
    imageTitle: 'FIELD EVIDENCE / UW-1042',
    imageNote: 'مشهد توضيحي قابل للاستبدال بصورة ميدانية',
    reference: 'REFERENCE LIBRARY',
    input: 'FIELD PHOTO',
    matching: 'VISUAL MATCHING',
    decision: 'DECISION ENGINE',
    analysisTitle: 'تقرير الفحص',
    analysisIdle: 'شغّل الفحص لعرض نتيجة الحالة المختارة',
    comparison: 'مقارنة بالصور المعتمدة',
    policy: 'قرار سير العمل',
    nextAction: 'الإجراء التالي',
    disclaimer: 'هذه محاكاة للمنطق المقترح وليست تشغيلًا لنموذج AI فعلي',
    confidenceNote: 'لا تُعرض نسبة ثقة مصطنعة؛ القرار هنا توضيحي',
    cases: [
      {
        id: 'match',
        label: 'صورة مطابقة',
        short: 'تطابق واضح',
        caption: 'صورة عمل مطابقة لمرجع معتمد',
        result: 'مؤهلة للقبول الآلي',
        resultText:
          'الصورة متوافقة مع مرجع معتمد ضمن شروط الفحص المصممة يمكن قبولها آليًا إذا استوفت بقية قواعد العمل',
        policyText: 'يمكن تطبيق قاعدة القبول الآلي عند تحقق الشروط',
        action: 'توثيق النتيجة وربطها بسجل المشروع',
        status: 'success',
        matchText: 'تطابق مرئي واضح',
      },
      {
        id: 'uncertain',
        label: 'صورة غير مؤكدة',
        short: 'تحتاج مراجعة',
        caption: 'اختلافات بصرية تحتاج إلى قرار بشري',
        result: 'لن يُطبّق القبول الآلي',
        resultText:
          'المقارنة لم تقدّم تطابقًا كافيًا لن يتم اعتماد الصورة تلقائيًا، وتُحال إلى المشرف للتحقق',
        policyText: 'إيقاف القبول الآلي وإحالة الحالة للمشرف',
        action:
          'يراجع المشرف الصورة، ويمكن إضافة الصورة المعتمدة إلى المكتبة المرجعية',
        status: 'warning',
        matchText: 'تطابق غير حاسم',
      },
      {
        id: 'invalid',
        label: 'صورة غير صحيحة',
        short: 'مرفوضة',
        caption: 'صورة لا تستوفي متطلبات التحقق',
        result: 'لن تُقبل الصورة',
        resultText:
          'الصورة غير مناسبة كدليل معتمد في هذا السيناريو تُرفض ولا تُضاف إلى المكتبة المرجعية',
        policyText: 'عدم تطبيق قاعدة الاعتماد',
        action: 'طلب صورة صحيحة وإعادة التحقق',
        status: 'danger',
        matchText: 'لا يوجد تطابق مقبول',
      },
    ],

    methodEyebrow: '02 / HUMAN-IN-THE-LOOP',
    methodTitle: 'التعلم من',
    methodAccent: 'قرارات المشرف',
    methodDesc:
      'الفكرة الابتكارية في المشروع هي الاستفادة من قرارات المشرفين لتوسيع مكتبة الصور المرجعية المعتمدة، بدل الاعتماد على نموذج ثابت لا يتطور',
    cycle: [
      {
        title: 'تصوير الموقع',
        desc: 'يلتقط المقاول صورة للعمل الميداني مع معلومات المكان والوقت',
      },
      {
        title: 'المقارنة الذكية',
        desc: 'تُقارن الصورة بالصور الموجودة في المكتبة المرجعية المعتمدة',
      },
      {
        title: 'اتخاذ القرار',
        desc: 'تطابق واضح يُقبل وفق الشروط، أو حالة غير مؤكدة تُحال للمشرف',
      },
      {
        title: 'المراجعة البشرية',
        desc: 'يقرر المشرف اعتماد الصورة أو رفضها بعد التحقق',
      },
      {
        title: 'توسيع المكتبة',
        desc: 'تُضاف الصور المعتمدة إلى المراجع لتفيد في الفحوص اللاحقة',
      },
    ],
    approved: 'صورة معتمدة',
    learned: 'تضاف للمكتبة المرجعية',
    notApproved: 'صورة مرفوضة',
    excluded: 'لا تدخل المكتبة المرجعية',
    loopNote:
      'إضافة الصور إلى المكتبة المرجعية ليست بالضرورة إعادة تدريب تلقائية لأوزان النموذج',

    resultsEyebrow: '03 / EXPERIMENTAL EVIDENCE',
    resultsTitle: 'دقة الفحص',
    resultsAccent: 'بالأرقام',
    resultsDesc:
      'هذه أرقام التجربة البحثية المذكورة في بروشور المشروع، وليست إحصاءات تشغيلية لمنصة منشورة',
    stats: [
      {
        value: '148',
        unit: '',
        label: 'صورة ميدانية حقيقية',
        desc: 'استخدمت ضمن مجموعة الاختبار الأولية',
      },
      {
        value: '99.5',
        unit: '%',
        label: 'دقة التعرف بعد 10 موافقات',
        desc: 'النتيجة المذكورة للتجربة البحثية',
      },
      {
        value: '44/45',
        unit: '',
        label: 'صور كابلات تم التعرف عليها',
        desc: 'بحسب النتائج الواردة في البروشور',
      },
      {
        value: '0',
        unit: '',
        label: 'قبول آلي خاطئ',
        desc: 'ضمن الاختبار الموصوف في البروشور',
      },
    ],
    growthTitle: 'كيف تحسنت النتائج؟',
    growthDesc:
      'مقارنة توضيحية لنتائج التعرف المذكورة في البروشور عند زيادة الصور المعتمدة',
    chartLegend: 'دقة التعرف',
    chartLabels: ['البداية', '5 موافقات', '10 موافقات', '20 موافقة'],
    chartValues: [79.4, 96.8, 99.5, 99.9],
    resultsNote:
      'الأرقام مرتبطة بعينة اختبار محددة يلزم اختبار مواقع وظروف وصور إضافية قبل تعميم النتائج',

    geoEyebrow: '04 / BEYOND THE PHOTO',
    geoTitle: 'توثيق الأعمال',
    geoAccent: 'تحت الأرض',
    geoDesc:
      'لا تنتهي الفكرة عند التحقق من الصورة؛ فالهدف هو إنشاء سجل مشترك لما نُفّذ تحت الأرض، مرتبط بالموقع والجهة والعمل والتوثيق',
    geoItems: [
      'موقع جغرافي للعمل',
      'صور وأدلة مرتبطة بالسجل',
      'معلومات المرافق المدفونة',
      'مرجع مشترك للجهات المعنية',
    ],
    mapDemo: 'خريطة توضيحية',
    mapLabel: 'سجل أعمال تحت الأرض',
    mapRoad: 'مسار مرافق موثق',
    mapRecord: 'UW-1042 / سجل تجريبي',
    mapDetails: 'أعمال حفر موثقة ومربوطة بالموقع',
    geoNote:
      'الطبقات والمسارات هنا افتراضية، وليست خرائط فعلية لمرافق أو خدمات حكومية',

    futureEyebrow: '05 / WHAT COMES NEXT',
    futureTitle: 'من النموذج',
    futureAccent: 'إلى التطبيق الميداني',
    futureDesc:
      'المرحلة التالية هي اختبار الحل مع جهات ومواقع إضافية، وتحسين إجراءات التحقق، ودراسة ربط التصاريح ضمن سير العمل',
    futureItems: [
      ['تجربة ميدانية', 'اختبار الحل مع جهة تشغيلية وفي مواقع حقيقية'],
      ['مواقع أكثر', 'التحقق من الأداء على صور ومدن وظروف مختلفة'],
      ['التحقق من التصاريح', 'دراسة إضافته كشرط سابق لاعتماد الأعمال'],
    ],
    finalTitle: 'اكتشف منصة',
    finalAccent: 'الأعمال الموحدة',
    platform: 'استكشف المنصة',
    contact: 'تواصل معنا',
  },

  en: {
    eyebrow: 'UNIFIED WORKS / INTELLIGENCE LAB',
    heroSmall: 'THE TECHNOLOGY BEHIND THE DECISION',
    heroTitle: 'Intelligent checks',
    heroAccent: 'for fieldwork',
    heroEnd: '',
    heroDesc:
      'How can we verify excavation work before it disappears underground? Field photos, location-linked evidence, and a reference library expanded through supervisor approvals help turn images into reviewable records',
    tryLab: 'Try the AI lab',
    seeResults: 'Explore results',
    heroNote: 'FIELD PHOTO → AI CHECK → HUMAN REVIEW → SHARED RECORD',

    labEyebrow: '01 / INTERACTIVE AI LAB',
    labTitle: 'Test field',
    labAccent: 'image checks',
    labDesc:
      'Choose a scenario and run a simulated check to explore how the proposed system handles field evidence',
    demo: 'Illustrative simulation',
    selectCase: 'Choose a test scenario',
    analyze: 'Run image check',
    again: 'Run again',
    waiting: 'Ready to analyze',
    processing: 'Comparing with approved references',
    completed: 'Illustrative check completed',
    imageTitle: 'FIELD EVIDENCE / UW-1042',
    imageNote: 'Illustrative scene — replaceable with a real field photo',
    reference: 'REFERENCE LIBRARY',
    input: 'FIELD PHOTO',
    matching: 'VISUAL MATCHING',
    decision: 'DECISION ENGINE',
    analysisTitle: 'Analysis report',
    analysisIdle: 'Run the check to see the selected scenario result',
    comparison: 'Approved reference comparison',
    policy: 'Workflow decision',
    nextAction: 'Next action',
    disclaimer: 'This is a workflow simulation, not live AI inference',
    confidenceNote: 'No fabricated confidence score is displayed',
    cases: [
      {
        id: 'match',
        label: 'Matching photo',
        short: 'Clear match',
        caption: 'Field image matching an approved reference',
        result: 'Eligible for automatic approval',
        resultText:
          'The photo matches an approved reference It may be accepted automatically if all other workflow rules are satisfied',
        policyText: 'Automatic approval can apply when all conditions are met',
        action: 'Document the result and link it to the project record',
        status: 'success',
        matchText: 'Clear visual match',
      },
      {
        id: 'uncertain',
        label: 'Uncertain photo',
        short: 'Needs review',
        caption: 'Visual differences require human judgment',
        result: 'Automatic approval will not apply',
        resultText:
          'The comparison is inconclusive The photo is not automatically accepted and is referred to a supervisor',
        policyText: 'Pause automatic approval and request supervisor review',
        action:
          'The supervisor reviews the photo An approved image may be added to the reference library',
        status: 'warning',
        matchText: 'Inconclusive match',
      },
      {
        id: 'invalid',
        label: 'Invalid photo',
        short: 'Rejected',
        caption: 'Evidence does not satisfy review requirements',
        result: 'Photo will not be accepted',
        resultText:
          'This photo is not suitable as approved evidence in the selected scenario and is excluded from the reference library',
        policyText: 'Approval rule does not apply',
        action: 'Request valid evidence and repeat the check',
        status: 'danger',
        matchText: 'No acceptable match',
      },
    ],

    methodEyebrow: '02 / HUMAN-IN-THE-LOOP',
    methodTitle: 'Learning from',
    methodAccent: 'supervisor decisions',
    methodDesc:
      'The innovation is a reference library that expands through approved supervisor decisions instead of relying only on a static collection',
    cycle: [
      { title: 'Capture the site', desc: 'The contractor takes a field photo with location and time context' },
      { title: 'Smart comparison', desc: 'The image is compared with approved reference photos' },
      { title: 'Decision', desc: 'Clear matches follow rules; uncertain cases go to a supervisor' },
      { title: 'Human review', desc: 'The supervisor approves or rejects the evidence' },
      { title: 'Grow the library', desc: 'Approved photos become references for future checks' },
    ],
    approved: 'Approved image',
    learned: 'Added to reference library',
    notApproved: 'Rejected image',
    excluded: 'Excluded from reference library',
    loopNote:
      'Adding references does not necessarily mean automatically retraining the model weights',

    resultsEyebrow: '03 / EXPERIMENTAL EVIDENCE',
    resultsTitle: 'Image-check accuracy',
    resultsAccent: 'in numbers',
    resultsDesc:
      'Figures from the project research poster, not production platform metrics',
    stats: [
      { value: '148', unit: '', label: 'Real field photos', desc: 'Used in the initial experimental dataset' },
      { value: '99.5', unit: '%', label: 'Recognition after 10 approvals', desc: 'Reported in the research experiment' },
      { value: '44/45', unit: '', label: 'Cable images recognized', desc: 'As reported in the poster' },
      { value: '0', unit: '', label: 'Wrong auto-acceptances', desc: 'Within the described test' },
    ],
    growthTitle: 'How did recognition improve?',
    growthDesc: 'Recognition results reported as approved references increased',
    chartLegend: 'Recognition accuracy',
    chartLabels: ['Baseline', '5 approvals', '10 approvals', '20 approvals'],
    chartValues: [79.4, 96.8, 99.5, 99.9],
    resultsNote:
      'Results reflect a limited test sample More locations and conditions must be evaluated before generalization',

    geoEyebrow: '04 / BEYOND THE PHOTO',
    geoTitle: 'Documenting',
    geoAccent: 'underground work',
    geoDesc:
      'The goal extends beyond image checking: creating a shared record of what was buried underground, connected to location, evidence, and responsible organizations',
    geoItems: [
      'Geographic work location',
      'Linked photographic evidence',
      'Buried utility records',
      'Shared reference for agencies',
    ],
    mapDemo: 'Illustrative map',
    mapLabel: 'Underground work record',
    mapRoad: 'Documented utility route',
    mapRecord: 'UW-1042 / DEMO RECORD',
    mapDetails: 'Documented excavation linked to its location',
    geoNote: 'Map layers and routes are fictional and do not represent live utility infrastructure',

    futureEyebrow: '05 / WHAT COMES NEXT',
    futureTitle: 'From prototype',
    futureAccent: 'to field deployment',
    futureDesc:
      'Next steps include testing more sites, improving verification, and exploring permit checks within the workflow',
    futureItems: [
      ['Field pilot', 'Test with an operating organization and real sites'],
      ['More locations', 'Validate across more cities, images, and conditions'],
      ['Permit verification', 'Explore permits as a pre-approval requirement'],
    ],
    finalTitle: 'Explore',
    finalAccent: 'Unified Works',
    platform: 'Explore platform',
    contact: 'Contact us',
  },
}

const scenarios = [
  { id: 'match', icon: CheckCircle2 },
  { id: 'uncertain', icon: CircleHelp },
  { id: 'invalid', icon: XCircle },
]

const cycleIcons = [
  Camera,
  ScanEye,
  GitBranch,
  ShieldCheck,
  Database,
]

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  )
}

function LabScene({ state, running }) {
  return (
    <div className={`${styles.labScene} ${styles[`scene_${state}`]}`}>
      <div className={styles.sceneBackdrop} />
      <div className={styles.sceneBuildings}>
        <span /><span /><span /><span /><span />
      </div>
      <div className={styles.sceneRoad} />
      <div className={styles.sceneCut} />
      <div className={styles.scenePipe} />
      <div className={styles.sceneBarrierOne} />
      <div className={styles.sceneBarrierTwo} />
      <div className={styles.sceneRoadMarks} />

      {running && (
        <motion.div
          className={styles.scanLine}
          initial={{ top: '5%' }}
          animate={{ top: '95%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      )}

      {state === 'complete' && (
        <>
          <motion.div
            className={styles.targetExcavation}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span>EXCAVATION / 01</span>
          </motion.div>
          <motion.div
            className={styles.targetBarrier}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span>SAFETY / 02</span>
          </motion.div>
          <div className={styles.targetPoint}>
            <MapPin size={20} />
          </div>
        </>
      )}

      <span className={styles.sceneTag}>
        <MapPin size={12} /> UW-1042 / FIELD SAMPLE
      </span>
      <span className={styles.sceneCorner}>CAM / 001</span>
    </div>
  )
}

function DecisionLab({ t }) {
  const [scenario, setScenario] = useState(1)
  const [stage, setStage] = useState('idle')
  const [runId, setRunId] = useState(0)

  const item = t.cases[scenario]
  const done = stage === 'complete'
  const running = stage === 'running'

  useEffect(() => {
    if (stage !== 'running') return
    const timer = setTimeout(() => setStage('complete'), 1400)
    return () => clearTimeout(timer)
  }, [stage, runId])

  const run = () => {
    setStage('running')
    setRunId(n => n + 1)
  }

  const selectScenario = index => {
    setScenario(index)
    setStage('idle')
  }

  return (
    <div className={styles.lab}>
      <div className={styles.labTopbar}>
        <span className={styles.labIdentity}>
          <ScanEye size={19} /> UW / INTELLIGENCE LAB
        </span>
        <span className={styles.labDemo}>
          <span /> CONCEPT SIMULATION
        </span>
      </div>

      <div className={styles.labBody}>
        <aside className={styles.labSidebar}>
          <div className={styles.sidebarHeading}>
            <span className={styles.microLabel}>TEST SCENARIOS / 03</span>
            <h3>{t.selectCase}</h3>
          </div>

          <div className={styles.scenarioList}>
            {scenarios.map(({ id, icon: Icon }, index) => (
              <button
                type="button"
                key={id}
                className={`${styles.scenarioButton} ${
                  scenario === index ? styles.scenarioActive : ''
                } ${styles[`option_${id}`]}`}
                onClick={() => selectScenario(index)}
                aria-pressed={scenario === index}
              >
                <span className={styles.scenarioIcon}>
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{t.cases[index].label}</strong>
                  <small>{t.cases[index].short}</small>
                </span>
                <span className={styles.scenarioNumber}>0{index + 1}</span>
              </button>
            ))}
          </div>

          <div className={styles.sidebarFooter}>
            <Fingerprint size={18} />
            <span>{t.confidenceNote}</span>
          </div>
        </aside>

        <div className={styles.labMain}>
          <div className={styles.imageHeader}>
            <div>
              <span className={styles.microLabel}>{t.imageTitle}</span>
              <strong>{item.caption}</strong>
            </div>
            <span className={styles.imageStatus}>
              <Camera size={15} /> FIELD CAPTURE
            </span>
          </div>

          <LabScene state={stage} running={running} />

          <div className={styles.labProcess}>
            {[t.input, t.matching, t.decision].map((label, i) => {
              const icons = [ImageIcon, ScanEye, GitBranch]
              const Icon = icons[i]
              return (
                <div className={styles.processPart} key={label}>
                  <Icon size={16} />
                  <span>{label}</span>
                  {i < 2 && <span className={styles.processArrow}>→</span>}
                </div>
              )
            })}
          </div>

          <div className={styles.labActions}>
            <span className={styles.labState}>
              <span className={`${styles.stateDot} ${running ? styles.pulsing : ''}`} />
              {running ? t.processing : done ? t.completed : t.waiting}
            </span>
            <button
              type="button"
              className={styles.runButton}
              onClick={run}
              disabled={running}
            >
              {done ? <RotateCcw size={17} /> : <Play size={17} />}
              {done ? t.again : t.analyze}
            </button>
          </div>
        </div>

        <aside className={styles.reportPanel}>
          <div className={styles.reportHeading}>
            <span className={styles.microLabel}>AI / DECISION REPORT</span>
            <h3>{t.analysisTitle}</h3>
          </div>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key={`${scenario}-${runId}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={styles.reportContent}
              >
                <div className={`${styles.decisionStatus} ${styles[`status_${item.status}`]}`}>
                  {item.status === 'success' && <CheckCircle2 size={27} />}
                  {item.status === 'warning' && <AlertTriangle size={27} />}
                  {item.status === 'danger' && <XCircle size={27} />}
                  <strong>{item.result}</strong>
                </div>

                <p className={styles.reportSummary}>{item.resultText}</p>

                <div className={styles.reportField}>
                  <span>{t.comparison}</span>
                  <strong>{item.matchText}</strong>
                </div>

                <div className={styles.reportField}>
                  <span>{t.policy}</span>
                  <strong>{item.policyText}</strong>
                </div>

                <div className={styles.nextAction}>
                  <span><ArrowUpRight size={15} /> {t.nextAction}</span>
                  <p>{item.action}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.emptyReport}
              >
                <ScanLine size={48} strokeWidth={1} />
                <p>{running ? t.processing : t.analysisIdle}</p>
                <span>AWAITING / ANALYSIS</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.reportDisclaimer}>
            <CircleHelp size={15} />
            <span>{t.disclaimer}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

function LearningCycle({ t }) {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.learningLayout}>
      <div className={styles.learningSteps}>
        {t.cycle.map((step, i) => {
          const Icon = cycleIcons[i]
          return (
            <button
              type="button"
              key={i}
              className={`${styles.learningStep} ${
                active === i ? styles.learningActive : ''
              }`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span className={styles.learningNumber}>0{i + 1}</span>
              <span className={styles.learningIcon}><Icon size={22} /></span>
              <span className={styles.learningText}>
                <strong>{step.title}</strong>
                <small>{step.desc}</small>
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.learningVisual}>
        <div className={styles.learningVisualTop}>
          <span>HUMAN-IN-THE-LOOP / REFERENCE LEARNING</span>
          <span>UW / 002</span>
        </div>

        <div className={styles.learningCore}>
          <div className={styles.learningOuterRing} />
          <div className={styles.learningInnerRing} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.learningCenter}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
            >
              {(() => {
                const Icon = cycleIcons[active]
                return <Icon size={48} strokeWidth={1.2} />
              })()}
              <strong>{t.cycle[active].title}</strong>
              <small>STAGE / 0{active + 1}</small>
            </motion.div>
          </AnimatePresence>
          <span className={`${styles.orbitDot} ${styles.orbitDotOne}`} />
          <span className={`${styles.orbitDot} ${styles.orbitDotTwo}`} />
          <span className={`${styles.orbitDot} ${styles.orbitDotThree}`} />
        </div>

        <div className={styles.learningBranches}>
          <div className={styles.branchApproved}>
            <CheckCircle2 size={19} />
            <strong>{t.approved}</strong>
            <span>{t.learned}</span>
          </div>
          <div className={styles.branchRejected}>
            <XCircle size={19} />
            <strong>{t.notApproved}</strong>
            <span>{t.excluded}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResearchChart({ t }) {
  const [selected, setSelected] = useState(2)
  const values = t.chartValues

  return (
    <div className={styles.chartPanel}>
      <div className={styles.chartTop}>
        <div>
          <span className={styles.microLabel}>RECOGNITION / EXPERIMENT</span>
          <h3>{t.growthTitle}</h3>
        </div>
        <span className={styles.chartLegend}>
          <span /> {t.chartLegend}
        </span>
      </div>

      <div className={styles.chartBody}>
        <div className={styles.chartGrid}>
          {[100, 75, 50, 25, 0].map(n => (
            <div className={styles.chartGridLine} key={n}>
              <span>{n}%</span>
              <i />
            </div>
          ))}
        </div>

        <div className={styles.chartBars}>
          {values.map((value, i) => (
            <button
              type="button"
              key={i}
              className={`${styles.chartColumn} ${
                selected === i ? styles.chartColumnActive : ''
              }`}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
            >
              <span className={styles.chartValue}>{value}%</span>
              <div className={styles.chartTrack}>
                <motion.div
                  className={styles.chartFill}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
              <span className={styles.chartLabel}>{t.chartLabels[i]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.chartFooter}>
        <Activity size={17} />
        <span>{t.chartLabels[selected]}</span>
        <strong>{values[selected]}%</strong>
      </div>
    </div>
  )
}

function UndergroundMap({ t }) {
  const [showUtilities, setShowUtilities] = useState(true)

  return (
    <div className={styles.mapShell}>
      <div className={styles.mapTopbar}>
        <span><MapPinned size={17} /> UW / UNDERGROUND REGISTRY</span>
        <span>{t.mapDemo}</span>
      </div>
      <div className={styles.mapCanvas}>
        <div className={styles.mapBlocks} />
        <div className={styles.mapRoadOne} />
        <div className={styles.mapRoadTwo} />
        <div className={styles.mapRoadThree} />

        {showUtilities && (
          <svg
            className={styles.mapPaths}
            viewBox="0 0 700 430"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M45 280 L240 225 L430 255 L650 125"
              fill="none" stroke="#48b8ff" strokeWidth="6"
              strokeDasharray="12 9" strokeLinecap="round" />
            <path d="M115 75 L300 170 L410 290 L590 370"
              fill="none" stroke="#efc775" strokeWidth="5"
              strokeDasharray="12 9" strokeLinecap="round" />
            <path d="M70 360 L260 310 L375 180 L620 70"
              fill="none" stroke="#ff9757" strokeWidth="4"
              strokeDasharray="10 10" strokeLinecap="round" />
          </svg>
        )}

        <div className={styles.mapMarker}>
          <MapPin size={25} />
          <span>UW-1042</span>
        </div>

        <button
          type="button"
          className={styles.mapToggle}
          onClick={() => setShowUtilities(v => !v)}
          aria-pressed={showUtilities}
        >
          <Layers3 size={16} />
          {t.mapRoad}
          <span className={`${styles.toggleDot} ${
            showUtilities ? styles.toggleOn : ''
          }`} />
        </button>

        <div className={styles.mapRecord}>
          <span className={styles.microLabel}>{t.mapLabel}</span>
          <strong>{t.mapRecord}</strong>
          <p>{t.mapDetails}</p>
          <span><CheckCircle2 size={14} /> DEMO RECORD</span>
        </div>
      </div>
    </div>
  )
}

export default function Technology() {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('ar') ? 'ar' : 'en'
  const t = content[lang]
  const rtl = lang === 'ar'
  const Arrow = rtl ? ArrowLeft : ArrowRight

  return (
    <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <Reveal className={styles.heroText}>
              <div className={styles.eyebrow}>
                <span /> {t.eyebrow}
              </div>
              <p className={styles.heroSmall}>{t.heroSmall}</p>
              <h1>
                {t.heroTitle}
                <span>{t.heroAccent}</span>
                <em>{t.heroEnd}</em>
              </h1>
              <p className={styles.heroDescription}>{t.heroDesc}</p>
              <div className={styles.heroButtons}>
                <a href="#ai-lab" className={styles.primaryButton}>
                  {t.tryLab} <Arrow size={18} />
                </a>
                <a href="#results" className={styles.outlineButton}>
                  {t.seeResults} <ArrowDown size={17} />
                </a>
              </div>
            </Reveal>

            <Reveal className={styles.heroVisual} delay={0.15}>
              <div className={styles.heroVisualTop}>
                <span><ScanEye size={15} /> IMAGE INTELLIGENCE</span>
                <span>PROTOTYPE / 01</span>
              </div>
              <div className={styles.heroPhotoFrame}>
                <div className={styles.heroPhotoImage}>
                  <div className={styles.heroPhotoBuildings} />
                  <div className={styles.heroPhotoGround} />
                  <div className={styles.heroPhotoTrench} />
                  <div className={styles.heroPhotoPipe} />
                  <div className={styles.heroPhotoBarrier} />
                  <div className={styles.heroPhotoScan} />
                </div>
                <div className={styles.heroDetection}>
                  <span>VISUAL EVIDENCE</span>
                  <ScanEye size={24} />
                </div>
              </div>
              <div className={styles.heroVisualBottom}>
                <span><Camera size={16} /> FIELD CAPTURE</span>
                <span><Arrow size={15} /> AI REVIEW</span>
                <span><ShieldCheck size={16} /> VERIFIED RECORD</span>
              </div>
              <div className={styles.heroFloatBadge}>
                <BrainCircuit size={22} />
                <span>HUMAN + AI<br />DECISION LOOP</span>
              </div>
            </Reveal>
          </div>

          <div className={styles.heroBottom}>
            <span>{t.heroNote}</span>
            <a href="#ai-lab"><ArrowDown size={17} /></a>
          </div>
        </div>
      </section>

      <section id="ai-lab" className={styles.labSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionIntro}>
            <span className={styles.sectionLabel}>{t.labEyebrow}</span>
            <h2>{t.labTitle}<span>{t.labAccent}</span></h2>
            <p>{t.labDesc}</p>
          </Reveal>
          <Reveal>
            <DecisionLab t={t} />
          </Reveal>
        </div>
      </section>

      <section className={styles.methodSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionIntro}>
            <span className={styles.sectionLabel}>{t.methodEyebrow}</span>
            <h2>{t.methodTitle}<span>{t.methodAccent}</span></h2>
            <p>{t.methodDesc}</p>
          </Reveal>
          <Reveal><LearningCycle t={t} /></Reveal>
        </div>
      </section>

      <section id="results" className={styles.resultsSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionIntro}>
            <span className={styles.sectionLabel}>{t.resultsEyebrow}</span>
            <h2>{t.resultsTitle}<span>{t.resultsAccent}</span></h2>
          </Reveal>

          <div className={styles.statsGrid}>
            {t.stats.map((stat, i) => (
              <Reveal className={styles.statCard} delay={i * 0.07} key={i}>
                <span className={styles.statNumber}>0{i + 1} / RESEARCH</span>
                <div className={styles.statValue}>
                  {stat.value}<small>{stat.unit}</small>
                </div>
                <h3>{stat.label}</h3>
              </Reveal>
            ))}
          </div>

          <Reveal><ResearchChart t={t} /></Reveal>
        </div>
      </section>

      <section className={styles.geoSection}>
        <div className={styles.container}>
          <div className={styles.geoLayout}>
            <Reveal className={styles.geoCopy}>
              <span className={styles.sectionLabel}>{t.geoEyebrow}</span>
              <h2>{t.geoTitle}<span>{t.geoAccent}</span></h2>
              <p>{t.geoDesc}</p>
              <div className={styles.geoFeatures}>
                {t.geoItems.map((item, i) => {
                  const icons = [MapPin, Camera, Layers3, Database]
                  const Icon = icons[i]
                  return (
                    <div key={i}>
                      <Icon size={19} />
                      <span>{item}</span>
                      <Check size={15} />
                    </div>
                  )
                })}
              </div>
            </Reveal>
            <Reveal className={styles.geoVisual} delay={0.12}>
              <UndergroundMap t={t} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.futureSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectionIntro}>
            <span className={styles.sectionLabel}>{t.futureEyebrow}</span>
            <h2>{t.futureTitle}<span>{t.futureAccent}</span></h2>
            <p>{t.futureDesc}</p>
          </Reveal>
          <div className={styles.futureGrid}>
            {t.futureItems.map(([title, desc], i) => {
              const icons = [HardHat, MapPinned, FileCheck2]
              const Icon = icons[i]
              return (
                <Reveal className={styles.futureItem} delay={i * 0.08} key={i}>
                  <span className={styles.futureIndex}>0{i + 1}</span>
                  <Icon size={28} />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </Reveal>
              )
            })}
          </div>

          <Reveal className={styles.finalPanel}>
            <span><Sparkles size={17} /> UNIFIED WORKS / NEXT STEP</span>
            <h2>{t.finalTitle}<em>{t.finalAccent}</em></h2>
            <div className={styles.finalActions}>
              <Link to="/platform" className={styles.primaryButton}>
                {t.platform} <Arrow size={18} />
              </Link>
              <Link to="/contact" className={styles.outlineButton}>
                {t.contact} <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
