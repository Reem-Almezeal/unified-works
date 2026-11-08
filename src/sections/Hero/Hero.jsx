
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  HardHat,
  ShieldCheck,
  ScanSearch,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Crosshair,
  MoveUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Layers3,
} from 'lucide-react'
import styles from './Hero.module.css'

const projects = [
  {
    id: 'UW-1042',
    x: 51,
    y: 35,
    contractor: 'شركة المدار للمقاولات',
    contractorEn: 'Al Madar Contracting',
    permit: 'PR-2026-1042',
    status: 'verified',
    progress: 86,
    location: 'طريق الملك فهد',
    locationEn: 'King Fahd Road',
    type: 'أعمال بنية تحتية',
    typeEn: 'Infrastructure Works',
    description:
      'استعراض شبكات المياه والكهرباء الموجودة قبل بدء أعمال الحفر لتقليل التعارضات',
    descriptionEn:
      'Visualize existing water and power networks before excavation to reduce conflicts',
  },
  {
    id: 'UW-1086',
    x: 24,
    y: 63,
    contractor: 'شركة الأفق للبنية التحتية',
    contractorEn: 'Al Ofoq Infrastructure',
    permit: 'PR-2026-1086',
    status: 'review',
    progress: 54,
    location: 'حي العليا',
    locationEn: 'Al Olaya District',
    type: 'تمديد شبكات',
    typeEn: 'Utility Network Installation',
    description:
      'مشروع تمديدات قيد المراجعة مع إظهار مسارات المرافق داخل نطاق العمل',
    descriptionEn:
      'Utility installation under review, with infrastructure routes visible within the work area',
  },
  {
    id: 'UW-1128',
    x: 76,
    y: 68,
    contractor: 'شركة مسارات الإنشاء',
    contractorEn: 'Masarat Construction',
    permit: 'PR-2026-1128',
    status: 'maintenance',
    progress: 72,
    location: 'طريق العروبة',
    locationEn: 'Al Urubah Road',
    type: 'تمديد كابل كهربائي',
    typeEn: 'Electrical Cable Installation',
    description:
      'اكتمل تمديد الكابل الكهربائي، لكن إعادة تأهيل الموقع لم تكتمل والمقاول المنفذ مسؤول عن المعالجة ضمن هذا النموذج',
    descriptionEn:
      'Electrical cable installation is complete, but site restoration is pending and the contractor is responsible for remediation in this demo',
  },
]

const statusConfig = {
  verified: {
    ar: 'موثق',
    en: 'Verified',
    Icon: CheckCircle2,
    className: 'verified',
  },
  review: {
    ar: 'قيد المراجعة',
    en: 'Under Review',
    Icon: ScanSearch,
    className: 'review',
  },
  maintenance: {
    ar: 'صيانة غير مكتملة',
    en: 'Restoration Pending',
    Icon: AlertTriangle,
    className: 'warning',
  },
}

function StatusBadge({ status, ar }) {
  const config = statusConfig[status]
  const Icon = config.Icon

  return (
    <span className={`${styles.statusBadge} ${styles[config.className]}`}>
      <Icon size={13} />
      {ar ? config.ar : config.en}
    </span>
  )
}

function CityMap({ selected, onSelect, ar }) {
  return (
    <div className={styles.mapScene}>
      <svg
        className={styles.mapArtwork}
        viewBox="0 0 800 560"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="uwCityGrid"
            width="100"
            height="92"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-15)"
          >
            <rect
              width="100"
              height="92"
              className={styles.mapGround}
            />

            <rect
              x="8"
              y="8"
              width="36"
              height="31"
              rx="3"
              className={styles.mapBuildingA}
            />

            <rect
              x="52"
              y="8"
              width="39"
              height="31"
              rx="3"
              className={styles.mapBuildingB}
            />

            <rect
              x="8"
              y="47"
              width="83"
              height="36"
              rx="3"
              className={styles.mapBuildingC}
            />

            <path
              d="M0 0 H100 M0 0 V92"
              className={styles.mapBlockLines}
              strokeWidth="5"
            />
          </pattern>

          <linearGradient
            id="uwMapEdge"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="white"
              stopOpacity="0"
            />
            <stop
              offset="8%"
              stopColor="white"
              stopOpacity="1"
            />
            <stop
              offset="92%"
              stopColor="white"
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor="white"
              stopOpacity="0"
            />
          </linearGradient>

          <mask id="uwMapMask">
            <rect
              width="800"
              height="560"
              fill="url(#uwMapEdge)"
            />
          </mask>
        </defs>

        <g mask="url(#uwMapMask)">
          <rect
            width="800"
            height="560"
            fill="url(#uwCityGrid)"
          />

          <g fill="none" strokeLinecap="round">
            <path
              d="M-60 465 L870 85"
              className={styles.mapRoadBorder}
              strokeWidth="52"
            />
            <path
              d="M-60 465 L870 85"
              className={styles.mapRoadSurface}
              strokeWidth="44"
            />

            <path
              d="M245 -80 L565 650"
              className={styles.mapRoadBorder}
              strokeWidth="58"
            />
            <path
              d="M245 -80 L565 650"
              className={styles.mapRoadSurface}
              strokeWidth="49"
            />

            <path
              d="M-60 465 L870 85"
              className={styles.mapRoadCenter}
              strokeWidth="2"
              strokeDasharray="13 18"
            />
            <path
              d="M245 -80 L565 650"
              className={styles.mapRoadCenter}
              strokeWidth="2"
              strokeDasharray="13 18"
            />
          </g>

          <g
            className={styles.mapCityLabels}
            fontSize="13"
          >
            <text x="105" y="155">
              AL OLAYA
            </text>
            <text x="605" y="310">
              RIYADH
            </text>
          </g>

          <g
            fill="none"
            className={styles.mapSurveyCircles}
            strokeWidth="1"
          >
            <circle
              cx="405"
              cy="260"
              r="110"
              strokeDasharray="4 9"
            />
            <circle
              cx="405"
              cy="260"
              r="170"
              strokeDasharray="4 12"
            />
          </g>

          <AnimatePresence mode="wait">
            <motion.g
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {selected.id === 'UW-1042' && (
                <>
                  <path
                    className={styles.waterRoute}
                    d="M70 175 L205 220 L390 195 L610 145"
                  />
                  <path
                    className={styles.powerRoute}
                    d="M145 420 L295 350 L405 260 L585 295"
                  />
                  <path
                    className={styles.digRoute}
                    d="M325 365 L405 260 L490 145"
                  />
                </>
              )}

              {selected.id === 'UW-1086' && (
                <>
                  <path
                    className={styles.waterRoute}
                    d="M65 395 L190 350 L330 390 L500 315"
                  />
                  <path
                    className={styles.powerRoute}
                    d="M110 480 L190 350 L285 265"
                  />
                </>
              )}

              {selected.id === 'UW-1128' && (
                <>
                  <path
                    className={styles.powerRoute}
                    d="M360 425 L485 345 L610 380 L735 280"
                  />
                  <circle
                    cx="610"
                    cy="380"
                    r="43"
                    className={styles.alertRing}
                  />
                  <circle
                    cx="610"
                    cy="380"
                    r="25"
                    className={styles.alertRing}
                  />
                </>
              )}
            </motion.g>
          </AnimatePresence>
        </g>
      </svg>

      <div className={styles.mapTopLabel}>
        <Crosshair size={14} />
        <span>
          {ar ? 'خريطة العمليات' : 'OPERATIONS MAP'}
        </span>
        <span className={styles.demoDot} />
        <small>
          {ar ? 'عرض توضيحي' : 'DEMO'}
        </small>
      </div>

      <div className={styles.mapPins}>
        {projects.map((project, index) => {
          const active = selected.id === project.id
          const warning = project.status === 'maintenance'

          return (
            <button
              key={project.id}
              type="button"
              className={[
                styles.mapPin,
                active ? styles.mapPinActive : '',
                warning ? styles.mapPinWarning : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                left: `${project.x}%`,
                top: `${project.y}%`,
              }}
              onClick={() => onSelect(project)}
              aria-pressed={active}
              aria-label={`${project.id} - ${
                ar ? project.location : project.locationEn
              }`}
            >
              <span className={styles.pinPulse} />

              <span className={styles.pinCore}>
                {warning ? (
                  <AlertTriangle size={19} />
                ) : (
                  <MapPin size={20} />
                )}
              </span>

              <span className={styles.pinName}>
                {project.id}
              </span>

              <span className={styles.pinNumber}>
                0{index + 1}
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.mapCoordinates}>
        <Crosshair size={12} />
        GIS / RIYADH
      </div>

      <div className={styles.mapLegend}>
        <span>
          <i className={styles.waterDot} />
          {ar ? 'مياه' : 'Water'}
        </span>
        <span>
          <i className={styles.powerDot} />
          {ar ? 'كهرباء' : 'Power'}
        </span>
        <span>
          <i className={styles.alertDot} />
          {ar ? 'تنبيه' : 'Alert'}
        </span>
      </div>
    </div>
  )
}

function ProjectPanel({ project, ar, onClose, onNext }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        className={styles.projectPanel}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.25 }}
        dir={ar ? 'rtl' : 'ltr'}
      >
        <div className={styles.panelHeader}>
          <div className={styles.panelIdentity}>
            <span className={styles.panelOverline}>
              {ar ? 'المشروع المحدد' : 'SELECTED PROJECT'}
            </span>
            <strong dir="ltr">{project.id}</strong>
          </div>

          <div className={styles.panelControls}>
            <button
              type="button"
              onClick={onNext}
              aria-label={
                ar ? 'المشروع التالي' : 'Next project'
              }
              title={
                ar ? 'المشروع التالي' : 'Next project'
              }
            >
              {ar ? (
                <ChevronLeft size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label={
                ar ? 'إغلاق التفاصيل' : 'Close details'
              }
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className={styles.panelStatus}>
          <StatusBadge
            status={project.status}
            ar={ar}
          />

          <span>
            <MapPin size={13} />
            {ar
              ? project.location
              : project.locationEn}
          </span>
        </div>

        <p className={styles.panelDescription}>
          {ar
            ? project.description
            : project.descriptionEn}
        </p>

        <div className={styles.panelMeta}>
          <div>
            <HardHat size={15} />
            <span>
              {ar ? 'المقاول' : 'Contractor'}
              <strong>
                {ar
                  ? project.contractor
                  : project.contractorEn}
              </strong>
            </span>
          </div>

          <div>
            <ShieldCheck size={15} />
            <span>
              {ar ? 'التصريح' : 'Permit'}
              <strong dir="ltr">
                {project.permit}
              </strong>
            </span>
          </div>
        </div>

        <div className={styles.panelProgress}>
          <div>
            <span>
              {ar ? 'تقدم العمل' : 'Progress'}
            </span>
            <strong>{project.progress}%</strong>
          </div>

          <div className={styles.progressTrack}>
            <motion.span
              initial={{ width: 0 }}
              animate={{
                width: `${project.progress}%`,
              }}
              transition={{ duration: 0.55 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Hero() {
  const { i18n } = useTranslation()
  const ar = i18n.language.startsWith('ar')

  const [selected, setSelected] = useState(projects[0])
  const [showDetails, setShowDetails] = useState(true)

  const selectProject = (project) => {
    setSelected(project)
    setShowDetails(true)
  }

  const nextProject = () => {
    const index = projects.findIndex(
      (project) => project.id === selected.id
    )

    setSelected(
      projects[(index + 1) % projects.length]
    )
    setShowDetails(true)
  }

  return (
    <section
      className={styles.hero}
      id="hero"
      dir={ar ? 'rtl' : 'ltr'}
    >
      <div
        className={styles.ambient}
        aria-hidden="true"
      />
      <div
        className={styles.gridLines}
        aria-hidden="true"
      />

      <div className={`container ${styles.container}`}>
        <div className={styles.heroLayout}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              UNIFIED WORKS
              <span className={styles.eyebrowSlash}>
                /
              </span>
              FIELD INTELLIGENCE
            </div>

            <h1 className={styles.title}>
              {ar ? (
                <>
                  من <em>الميدان</em>
                  <br />
                  <span>تبدأ الرؤية</span>
                </>
              ) : (
                <>
                  From the <em>Field</em>
                  <br />
                  <span>Comes Clarity</span>
                </>
              )}
            </h1>

            <p className={styles.description}>
              {ar
                ? 'كل مشروع تحت الرصد، وكل معلومة تقود لقرار أذكى'
                : 'Every project in view, every insight leading to smarter decisions'}
            </p>

            <div className={styles.actions}>
              <Link
                to="/platform"
                className={styles.primaryButton}
              >
                {ar
                  ? 'استكشف التجربة'
                  : 'Explore the Experience'}
                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/contact"
                className={styles.secondaryButton}
              >
                {ar
                  ? 'تعاون معنا'
                  : 'Partner With Us'}
                <MoveUpRight size={16} />
              </Link>
            </div>

            <div className={styles.capabilities}>
              <span>
                <MapPin size={17} />
                {ar
                  ? 'توثيق جغرافي'
                  : 'Geospatial'}
              </span>

              <span>
                <ScanSearch size={17} />
                {ar
                  ? 'تحليل ذكي'
                  : 'AI Analysis'}
              </span>

              <span>
                <Building2 size={17} />
                {ar
                  ? 'ربط الجهات'
                  : 'Connected Entities'}
              </span>
            </div>
          </motion.div>

          <motion.div
            className={styles.visual}
            initial={{
              opacity: 0,
              x: ar ? -35 : 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.95,
              delay: 0.12,
            }}
          >
            <div className={styles.mapComposition}>
              <CityMap
                selected={selected}
                onSelect={selectProject}
                ar={ar}
              />

              {showDetails && (
                <div className={styles.panelPosition}>
                  <ProjectPanel
                    project={selected}
                    ar={ar}
                    onClose={() =>
                      setShowDetails(false)
                    }
                    onNext={nextProject}
                  />
                </div>
              )}
            </div>

            <div className={styles.projectTabs}>
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    selectProject(project)
                  }
                  aria-pressed={
                    selected.id === project.id
                  }
                  className={`${
                    styles.projectTab
                  } ${
                    selected.id === project.id
                      ? styles.projectTabActive
                      : ''
                  }`}
                >
                  <span>0{index + 1}</span>
                  {project.id}

                  {project.status ===
                    'maintenance' && (
                    <AlertTriangle size={13} />
                  )}
                </button>
              ))}
            </div>

            <div className={styles.demoCaption}>
              <span
                className={styles.demoIndicator}
              />
              {ar
                ? 'نموذج تفاعلي — البيانات والمواقع توضيحية'
                : 'Interactive concept — illustrative data and locations'}
            </div>
          </motion.div>
        </div>

        <a
          href="#story"
          className={styles.scrollHint}
        >
          <ArrowDown size={15} />
          {ar
            ? 'اكتشف الفكرة'
            : 'SCROLL TO EXPLORE'}
        </a>
      </div>
    </section>
  )
}

export default Hero

