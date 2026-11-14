

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  MapPinned,
  Camera,
  Layers3,
  ShieldCheck,
  BrainCircuit,
  Target,
  Eye,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Quote,
  Database,
  ScanSearch
} from 'lucide-react'
import styles from './About.module.css'

const content = {
  ar: {
    eyebrow: 'UNIFIED WORKS / OUR STORY',
    heroSmall: 'رؤية أوضح لما يحدث في الميدان',
    heroTitle: 'ما لا يُرى',
    heroAccent: 'نكشفه',
    heroDesc:
      'يوثّق Unified Works الأعمال الميدانية بالصور والموقع الجغرافي، ويجمع المعلومات في مرجع يساعد على المتابعة والتحقق واتخاذ قرارات أدق',
    discover: 'تعرّف على المشروع',
    explore: 'استكشف التقنية',
    heroVisualLabel: 'FIELD INTELLIGENCE',
    heroVisualTop: 'من الميدان',
    heroVisualBottom: 'إلى معرفة موثوقة',
    concept: 'نموذج تجريبي',

    originLabel: '01 / THE CHALLENGE',
    originTitle: 'حين تغيب التفاصيل',
    originAccent: 'تصبح القرارات أصعب',
    originDesc:
      'بعد انتهاء أعمال الحفر وإغلاق المواقع، تختفي تفاصيل مهمة عن البنية التحتية المنفذة، وقد تتوزع الصور والبيانات بين جهات وأنظمة مختلفة، مما يصعّب الرجوع إليها عند الحاجة',
    originQuote:
      'ماذا لو أمكن الرجوع إلى تفاصيل الأعمال الميدانية حتى بعد اختفائها تحت الأرض؟',
    originCards: [
      {
        number: '01',
        title: 'أعمال متواصلة',
        desc: 'تنفّذ الفرق الميدانية أعمال الحفر والتمديدات في مواقع متعددة'
      },
      {
        number: '02',
        title: 'تفاصيل غير مرئية',
        desc: 'تختفي مكونات البنية التحتية عن الأنظار بعد إغلاق الموقع'
      },
      {
        number: '03',
        title: 'بيانات متفرقة',
        desc: 'تتوزع الصور والمعلومات بين سجلات وجهات مختلفة'
      }
    ],

    solutionLabel: '02 / THE APPROACH',
    solutionTitle: 'من صورة ميدانية',
    solutionAccent: 'إلى معرفة موثوقة',
    solutionDesc:
      'يجمع المشروع بين توثيق الموقع والتحليل الذكي والمراجعة البشرية، لتحويل الصور الميدانية إلى معلومات منظمة يمكن التحقق منها والرجوع إليها',
    solutionSteps: [
      {
        title: 'توثيق الموقع',
        desc: 'التقاط صورة مرتبطة بالموقع الجغرافي ووقت التنفيذ'
      },
      {
        title: 'تحليل ذكي',
        desc: 'مقارنة الصور بمراجع معتمدة لدعم عملية التحقق'
      },
      {
        title: 'مراجعة بشرية',
        desc: 'إحالة الحالات غير المؤكدة إلى المشرف لاتخاذ القرار'
      },
      {
        title: 'مرجع متنامٍ',
        desc: 'إضافة الصور المعتمدة إلى مكتبة مرجعية قابلة للتوسع'
      }
    ],

    visionLabel: '03 / OUR DIRECTION',
    visionTitle: 'رؤية تتجاوز',
    visionAccent: 'حدود الميدان',
    values: [
      {
        title: 'الرؤية',
        desc: 'بنية تحتية أكثر وضوحًا ومعلومات مكانية تدعم التخطيط واتخاذ القرار'
      },
      {
        title: 'الرسالة',
        desc: 'توحيد توثيق الأعمال الميدانية والتحقق منها ضمن مسار واضح ومترابط'
      },
      {
        title: 'المبدأ',
        desc: 'توظيف الذكاء الاصطناعي لدعم الإنسان مع الحفاظ على المراجعة البشرية عند الحاجة'
      }
    ],

    researchLabel: '04 / PROTOTYPE RESULTS',
    researchTitle: 'الفكرة تتحول',
    researchAccent: 'إلى واقع',
    researchDesc:
      'انتقل المشروع من التصور إلى نموذج تجريبي لاختبار تحليل الصور الميدانية والتعرف على مكونات البنية التحتية',
    researchStats: [
      ['148', 'صورة حقيقية ضمن التجربة'],
      ['99.5%', 'دقة مذكورة بعد 10 موافقات'],
      ['44/45', 'صورة كابلات تم التعرف عليها'],
      ['0', 'حالات قبول آلي خاطئ في التجربة الموصوفة']
    ],
    researchButton: 'استعرض النتائج',

    teamLabel: '05 / THE TEAM',
    teamTitle: 'وراء الفكرة',
    teamAccent: 'فريق يؤمن بها',
    teamDesc:
      'يجمع فريق Unified Works بين التفكير الهندسي وتطوير الحلول التقنية لفهم تحديات العمل الميداني ومعالجتها',
    teamMembers: [
    'ريم المزعل',
    'لينة اللويمي',
    'أحمد الحربي',
    'مازن القحطاني'
    ],
    teamBadge: 'PROJECT TEAM',

    nextLabel: '06 / THE ROAD AHEAD',
    nextTitle: 'من التجربة',
    nextAccent: 'إلى التطبيق والتوسع',
    nextDesc:
      'تركز المرحلة القادمة على اختبار النموذج في بيئات ميدانية متنوعة وتطوير إمكانات التكامل مع إجراءات الجهات ذات العلاقة',
    nextSteps: [
      [
        '01',
        'تجربة ميدانية',
        'اختبار النموذج في مواقع فعلية بالتعاون مع جهة شريكة'
      ],
      [
        '02',
        'توسيع نطاق الاختبار',
        'اختبار صور ومواقع وظروف تشغيل أكثر تنوعًا'
      ],
      [
        '03',
        'تكامل الأنظمة',
        'دراسة ربط التصاريح وبيانات المواقع بإجراءات العمل'
      ]
    ],

    ctaLabel: 'WHAT COMES NEXT',
    ctaTitle: 'من معرفة ما تحت الأرض',
    ctaAccent: 'إلى تخطيط ما فوقها',
    ctaDesc:
      'نبحث عن فرص للتعاون واختبار الحل وتطويره في بيئات ميدانية حقيقية',
    contact: 'تواصل معنا',
    platform: 'استكشف المنصة'
  },

  en: {
    eyebrow: 'UNIFIED WORKS / OUR STORY',
    heroSmall: 'Bringing clarity to field operations',
    heroTitle: 'Making the unseen',
    heroAccent: 'visible',
    heroDesc:
      'Unified Works documents field operations through images and geolocation, bringing information together to support monitoring, verification and better decisions',
    discover: 'Discover the project',
    explore: 'Explore the technology',
    heroVisualLabel: 'FIELD INTELLIGENCE',
    heroVisualTop: 'From the field',
    heroVisualBottom: 'to trusted knowledge',
    concept: 'Prototype',

    originLabel: '01 / THE CHALLENGE',
    originTitle: 'When details disappear',
    originAccent: 'decisions become harder',
    originDesc:
      'Once excavation sites are closed, important infrastructure details become hidden, while photos and records may remain scattered across different teams and systems',
    originQuote:
      'What if we could revisit fieldwork details long after they disappear underground?',
    originCards: [
      {
        number: '01',
        title: 'Work in progress',
        desc: 'Field teams carry out excavation and utility work across multiple sites'
      },
      {
        number: '02',
        title: 'Hidden details',
        desc: 'Infrastructure components become invisible once sites are restored'
      },
      {
        number: '03',
        title: 'Fragmented records',
        desc: 'Photos and information remain distributed across separate records'
      }
    ],

    solutionLabel: '02 / THE APPROACH',
    solutionTitle: 'From field evidence',
    solutionAccent: 'to trusted knowledge',
    solutionDesc:
      'The project connects geolocated field documentation, intelligent image analysis and human review to create structured, verifiable records',
    solutionSteps: [
      {
        title: 'Capture evidence',
        desc: 'Record field images with location and capture time'
      },
      {
        title: 'Intelligent analysis',
        desc: 'Compare images against approved references'
      },
      {
        title: 'Human verification',
        desc: 'Route uncertain cases to supervisors for review'
      },
      {
        title: 'Growing knowledge',
        desc: 'Expand the reference library with approved images'
      }
    ],

    visionLabel: '03 / OUR DIRECTION',
    visionTitle: 'A vision beyond',
    visionAccent: 'the field',
    values: [
      {
        title: 'Vision',
        desc: 'Make infrastructure more visible and spatial information more useful for planning and decision-making'
      },
      {
        title: 'Mission',
        desc: 'Bring field documentation and verification into one connected workflow'
      },
      {
        title: 'Principle',
        desc: 'Use AI to support human decisions while preserving oversight when needed'
      }
    ],

    researchLabel: '04 / PROTOTYPE RESULTS',
    researchTitle: 'Turning the concept',
    researchAccent: 'into reality',
    researchDesc:
      'The project progressed into a prototype designed to evaluate field-image analysis and infrastructure component recognition',
    researchStats: [
      ['148', 'Real images included in the experiment'],
      ['99.5%', 'Reported accuracy after 10 approvals'],
      ['44/45', 'Cable images recognized'],
      ['0', 'Incorrect automatic acceptances in the reported experiment']
    ],
    researchButton: 'Explore the results',

    teamLabel: '05 / THE TEAM',
    teamTitle: 'Behind the idea',
    teamAccent: 'a team that believes in it',
    teamDesc:
      'The Unified Works team combines engineering thinking and technical development to address real field-operation challenges',
    teamMembers: [
      'Mazin Alqahtani',
      'Ahmed Alharbi',
      'Linah Alwilmi',
      'Reem Almezeal'
    ],
    teamBadge: 'PROJECT TEAM',

    nextLabel: '06 / THE ROAD AHEAD',
    nextTitle: 'From prototype',
    nextAccent: 'to deployment and scale',
    nextDesc:
      'The next phase focuses on testing in diverse field environments and exploring integration with relevant organizational workflows',
    nextSteps: [
      [
        '01',
        'Field pilot',
        'Evaluate the prototype at real worksites with a partner organization'
      ],
      [
        '02',
        'Broader testing',
        'Expand testing across more images, locations and operating conditions'
      ],
      [
        '03',
        'System integration',
        'Explore connecting permits and site data with operational workflows'
      ]
    ],

    ctaLabel: 'WHAT COMES NEXT',
    ctaTitle: 'Understanding what lies below',
    ctaAccent: 'to plan what comes above',
    ctaDesc:
      'We welcome opportunities to collaborate, test and develop the solution in real field environments',
    contact: 'Get in touch',
    platform: 'Explore the platform'
  }
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ label, title, accent, desc }) {
  return (
    <Reveal className={styles.sectionHeading}>
      <span className={styles.eyebrow}>{label}</span>
      <h2>
        {title}
        <em>{accent}</em>
      </h2>
      {desc && <p>{desc}</p>}
    </Reveal>
  )
}

function StoryVisual({ t }) {
  const [active, setActive] = useState(0)

  const steps = [
    { icon: Camera, code: 'CAPTURE' },
    { icon: BrainCircuit, code: 'COMPARE' },
    { icon: ShieldCheck, code: 'VERIFY' },
    { icon: Database, code: 'PRESERVE' }
  ]

  const ActiveIcon = steps[active].icon

  return (
    <div className={styles.storyVisual}>
      <div className={styles.visualTop}>
        <span>{t.heroVisualLabel}</span>
        <span className={styles.demoPill}>
          <span />
          {t.concept}
        </span>
      </div>

      <div className={styles.storyCanvas}>
        <div className={styles.canvasGrid} />

        <div className={styles.storyRoad}>
          <div className={styles.storyRoadLine} />
          <div className={styles.storyExcavation} />
        </div>

        <div className={styles.storyDepth}>
          <div className={styles.storyPipeBlue} />
          <div className={styles.storyPipeGold} />
        </div>

        <div className={styles.storyCenter}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.75, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.12 }}
              transition={{ duration: 0.35 }}
              className={styles.storyCenterIcon}
            >
              <ActiveIcon size={42} strokeWidth={1.5} />
            </motion.div>
          </AnimatePresence>

          <span>{steps[active].code}</span>
          <strong>0{active + 1} / 04</strong>
        </div>

        <div className={styles.visualCornerOne}>
          <ScanSearch size={16} />
          AI / HUMAN REVIEW
        </div>

        <div className={styles.visualCornerTwo}>
          <MapPinned size={16} />
          LOCATION-LINKED
        </div>
      </div>

      <div className={styles.visualBottom}>
        <div>
          <span>{t.heroVisualTop}</span>
          <strong>{t.heroVisualBottom}</strong>
        </div>

        <div className={styles.visualControls}>
          {steps.map((step, i) => {
            const Icon = step.icon

            return (
              <button
                type="button"
                key={step.code}
                onClick={() => setActive(i)}
                className={active === i ? styles.activeStep : ''}
                aria-label={step.code}
                aria-pressed={active === i}
              >
                <Icon size={17} />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OriginTimeline({ t }) {
  return (
    <div className={styles.originTimeline}>
      {t.originCards.map((item, i) => (
        <Reveal
          key={item.number}
          delay={i * 0.1}
          className={styles.originItem}
        >
          <span className={styles.originNumber}>{item.number}</span>

          <div className={styles.originLine}>
            <span />
          </div>

          <div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function KnowledgeCycle({ t }) {
  const icons = [Camera, BrainCircuit, ShieldCheck, Database]
  const [selected, setSelected] = useState(0)

  return (
    <div className={styles.cycleLayout}>
      <div className={styles.cycleDiagram}>
        <div className={styles.cycleRing} />
        <div className={styles.cycleRingInner} />

        <div className={styles.cycleCenter}>
          <Layers3 size={36} />
          <strong>UNIFIED</strong>
          <strong>WORKS</strong>
          <small>KNOWLEDGE CYCLE</small>
        </div>

        {t.solutionSteps.map((step, i) => {
          const Icon = icons[i]

          return (
            <button
              key={i}
              type="button"
              className={`${styles.cycleNode} ${styles[`cycleNode${i}`]} ${
                selected === i ? styles.cycleNodeActive : ''
              }`}
              onClick={() => setSelected(i)}
              aria-label={step.title}
              aria-pressed={selected === i}
            >
              <Icon size={23} />
              <span>0{i + 1}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.cycleDetails}>
        <span className={styles.eyebrow}>
          INTERACTIVE PROCESS / 0{selected + 1}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
          >
            <span className={styles.cycleIndex}>
              0{selected + 1} / 04
            </span>
            <h3>{t.solutionSteps[selected].title}</h3>
            <p>{t.solutionSteps[selected].desc}</p>
          </motion.div>
        </AnimatePresence>

        <div className={styles.cycleSelector}>
          {t.solutionSteps.map((step, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={selected === i ? styles.cycleSelected : ''}
            >
              <span>0{i + 1}</span>
              {step.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamCard({ name, index, label }) {
  return (
    <Reveal className={styles.teamCard} delay={index * 0.07}>
      <div className={styles.teamCardTop}>
        <span>0{index + 1}</span>
        <Sparkles size={18} />
      </div>

      <div className={styles.teamAvatar}>
        <span>
          {name.split(' ').map(x => x[0]).join('')}
        </span>
      </div>

      <strong>{name}</strong>
      <small>{label}</small>

      <div className={styles.teamCardBottom}>
        <span>UNIFIED WORKS</span>
        <span>2026</span>
      </div>
    </Reveal>
  )
}

export default function About() {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('ar') ? 'ar' : 'en'
  const t = content[lang]
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight

  const valueIcons = [Eye, Target, HeartHandshake]

  return (
    <main
      className={styles.page}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                {t.eyebrow}
              </span>

              <span className={styles.heroSmall}>
                {t.heroSmall}
              </span>

              <h1>
                {t.heroTitle}
                <em>{t.heroAccent}</em>
              </h1>

              <p>{t.heroDesc}</p>

              <div className={styles.heroActions}>
                <a
                  href="#our-story"
                  className={styles.primaryButton}
                >
                  {t.discover}
                  <Arrow size={18} />
                </a>

                <Link
                  to="/technology"
                  className={styles.secondaryButton}
                >
                  {t.explore}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <StoryVisual t={t} />
            </Reveal>
          </div>

          <div className={styles.heroFooter}>
            <span>FROM EVIDENCE TO INTELLIGENCE</span>

            <a href="#our-story" aria-label={t.discover}>
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        id="our-story"
      >
        <div className={styles.container}>
          <div className={styles.originGrid}>
            <div>
              <SectionHeading
                label={t.originLabel}
                title={t.originTitle}
                accent={t.originAccent}
                desc={t.originDesc}
              />

              <Reveal className={styles.quoteBox}>
                <Quote size={26} />
                <blockquote>{t.originQuote}</blockquote>
              </Reveal>
            </div>

            <OriginTimeline t={t} />
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.altSection}`}
      >
        <div className={styles.container}>
          <SectionHeading
            label={t.solutionLabel}
            title={t.solutionTitle}
            accent={t.solutionAccent}
            desc={t.solutionDesc}
          />

          <Reveal>
            <KnowledgeCycle t={t} />
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHeading
            label={t.visionLabel}
            title={t.visionTitle}
            accent={t.visionAccent}
          />

          <div className={styles.valuesGrid}>
            {t.values.map((value, i) => {
              const Icon = valueIcons[i]

              return (
                <Reveal
                  key={i}
                  delay={i * 0.1}
                  className={styles.valueCard}
                >
                  <div className={styles.valueTop}>
                    <span>0{i + 1}</span>
                    <ArrowUpRight size={18} />
                  </div>

                  <Icon
                    size={37}
                    className={styles.valueIcon}
                  />

                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.researchSection}`}
      >
        <div className={styles.container}>
          <div className={styles.researchHeader}>
            <SectionHeading
              label={t.researchLabel}
              title={t.researchTitle}
              accent={t.researchAccent}
              desc={t.researchDesc}
            />

            <Link
              to="/impact"
              className={styles.secondaryButton}
            >
              {t.researchButton}
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className={styles.researchGrid}>
            {t.researchStats.map(([number, label], i) => (
              <Reveal
                key={i}
                className={styles.researchCard}
                delay={i * 0.07}
              >
                <span>EXPERIMENT / 0{i + 1}</span>
                <strong>{number}</strong>
                <p>{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.teamIntro}>
            <SectionHeading
              label={t.teamLabel}
              title={t.teamTitle}
              accent={t.teamAccent}
              desc={t.teamDesc}
            />

            <div className={styles.teamEmblem}>
              <Layers3 size={31} />
              <span>UNIFIED WORKS</span>
              <small>PROJECT TEAM</small>
            </div>
          </div>

          <div className={styles.teamGrid}>
            {t.teamMembers.map((name, i) => (
              <TeamCard
                key={name}
                name={name}
                index={i}
                label={t.teamBadge}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.altSection}`}
      >
        <div className={styles.container}>
          <SectionHeading
            label={t.nextLabel}
            title={t.nextTitle}
            accent={t.nextAccent}
            desc={t.nextDesc}
          />

          <div className={styles.futureTrack}>
            {t.nextSteps.map(([num, title, desc], i) => (
              <Reveal
                key={num}
                delay={i * 0.12}
                className={styles.futureStep}
              >
                <div className={styles.futureNumber}>
                  {num}
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <CheckCircle2 size={20} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <Reveal className={styles.cta}>
            <span className={styles.eyebrow}>
              {t.ctaLabel}
            </span>

            <h2>
              {t.ctaTitle}
              <em>{t.ctaAccent}</em>
            </h2>

            <p>{t.ctaDesc}</p>

            <div className={styles.heroActions}>
              <Link
                to="/contact"
                className={styles.primaryButton}
              >
                {t.contact}
                <Arrow size={18} />
              </Link>

              <Link
                to="/platform"
                className={styles.secondaryButton}
              >
                {t.platform}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
