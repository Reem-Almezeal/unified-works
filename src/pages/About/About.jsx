
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
  GraduationCap,
  FlaskConical,
  Database,
  ScanSearch
} from 'lucide-react'
import styles from './About.module.css'

const content = {
  ar: {
    eyebrow: 'UNIFIED WORKS / OUR STORY',
    heroSmall: 'من فكرة بحثية إلى رؤية لمدينة أذكى',
    heroTitle: 'بعض الأعمال',
    heroAccent: 'تنتهي تحت الأرض.',
    heroEnd: 'لكن أثرها يبقى.',
    heroDesc:
      'بدأت Unified Works من سؤال بسيط: ماذا لو لم تختفِ معلومات العمل الميداني بمجرد إغلاق الحفرة؟ نعمل على تصور يحوّل الصور الميدانية والمراجعة البشرية إلى سجل مكاني مشترك يمكن الرجوع إليه مستقبلًا.',
    discover: 'اكتشف قصتنا',
    explore: 'استكشف التقنية',
    heroVisualLabel: 'THE IDEA / 001',
    heroVisualTop: 'من صورة واحدة',
    heroVisualBottom: 'إلى معرفة مشتركة',
    concept: 'تصور بحثي',

    originLabel: '01 / THE BEGINNING',
    originTitle: 'المشكلة لم تكن',
    originAccent: 'في الحفرة وحدها.',
    originDesc:
      'عندما تُنفذ أعمال الحفر والتمديدات، تصبح بعض التفاصيل غير مرئية بعد إعادة إغلاق الطريق. الصور قد تكون متفرقة، والمراجعة قد تحدث لاحقًا، والمعلومات المكانية قد لا تكون متاحة لجميع الأطراف.',
    originQuote:
      'ماذا لو أصبحت كل صورة ميدانية جزءًا من ذاكرة المدينة؟',
    originCards: [
      {
        number: '01',
        title: 'العمل يحدث',
        desc: 'فرق ميدانية تنفذ أعمالًا يومية في مواقع مختلفة.'
      },
      {
        number: '02',
        title: 'التفاصيل تختفي',
        desc: 'بعد إغلاق الموقع يصعب رؤية ما تم تنفيذه تحت السطح.'
      },
      {
        number: '03',
        title: 'المعرفة تتفرق',
        desc: 'قد تبقى الصور والمعلومات موزعة بين سجلات وأطراف متعددة.'
      }
    ],

    solutionLabel: '02 / THE TURNING POINT',
    solutionTitle: 'لم نرد مجرد',
    solutionAccent: 'تطبيق لرفع الصور.',
    solutionDesc:
      'الفكرة هي بناء دورة معرفة: يلتقط المقاول الصورة، يقارنها النظام بمراجع معتمدة، تُرسل الحالات غير المؤكدة إلى المشرف، وتصبح الصور المعتمدة جزءًا من مكتبة مرجعية قابلة للتوسع.',
    solutionSteps: [
      {
        title: 'التقاط الدليل',
        desc: 'صورة ميدانية مرتبطة بمكان وزمن العمل.'
      },
      {
        title: 'مقارنة ذكية',
        desc: 'مقارنة الصورة بمراجع سبق اعتمادها.'
      },
      {
        title: 'قرار بشري',
        desc: 'يراجع المشرف الحالات غير المؤكدة.'
      },
      {
        title: 'تعلم تراكمي',
        desc: 'تضاف الصور المعتمدة إلى المكتبة المرجعية.'
      }
    ],
    solutionNote:
      'هذا وصف لمنهجية النموذج البحثي المقترح، وليس ادعاءً بوجود منصة تشغيلية مرتبطة بالجهات.',

    visionLabel: '03 / WHAT DRIVES US',
    visionTitle: 'رؤيتنا أكبر',
    visionAccent: 'من توثيق مشروع.',
    values: [
      {
        title: 'الرؤية',
        desc: 'أن تصبح الأعمال الميدانية أكثر وضوحًا، وأن تتحول المعلومات المتفرقة إلى مرجع مكاني يساعد المدن على اتخاذ قرارات أفضل.'
      },
      {
        title: 'الرسالة',
        desc: 'استكشاف طريقة عملية تجمع الصور الميدانية والمراجعة البشرية والموقع الجغرافي في دورة توثيق واحدة.'
      },
      {
        title: 'المبدأ',
        desc: 'الذكاء الاصطناعي يدعم القرار، لكن المراجعة البشرية تظل مهمة عندما لا تكون النتيجة مؤكدة.'
      }
    ],

    researchLabel: '04 / RESEARCH JOURNEY',
    researchTitle: 'لم نتوقف',
    researchAccent: 'عند الفكرة.',
    researchDesc:
      'انتقلت الفكرة إلى نموذج بحثي وتجربة على صور حقيقية لأعمال الحفر والتمديدات. هذه نتائج أولية وليست قياسًا للأثر التشغيلي على مستوى المدينة.',
    researchStats: [
      ['148', 'صورة حقيقية ضمن التجربة'],
      ['99.5%', 'دقة مذكورة بعد 10 موافقات'],
      ['44/45', 'صورة كابلات تم التعرف عليها'],
      ['0', 'قبول آلي خاطئ في التجربة الموصوفة']
    ],
    researchDisclaimer:
      'النتائج مستندة إلى البروشور البحثي المقدم للمشروع، وتحتاج إلى تحقق ميداني أوسع قبل تعميمها.',
    researchButton: 'شاهد نتائج الأثر',

    teamLabel: '05 / THE PEOPLE',
    teamTitle: 'وراء الفكرة',
    teamAccent: 'فريق يؤمن بها.',
    teamDesc:
      'Unified Works مشروع بحثي طلابي يجمع التفكير الهندسي والتقنية وتحليل المشكلة الميدانية.',
    teamMembers: [
      'Mazin Alqahtani',
      'Ahmed Alharbi',
      'Linah Alwilmi',
      'Reem Almezeal'
    ],
    teamNote:
      'أسماء أعضاء الفريق كما وردت في البروشور البحثي.',
    teamBadge: 'PROJECT TEAM',

    nextLabel: '06 / WHAT COMES NEXT',
    nextTitle: 'هذه ليست',
    nextAccent: 'نهاية القصة.',
    nextDesc:
      'الخطوة التالية هي اختبار الفكرة على نطاق ميداني أوسع، وتقييم دقة النموذج في مواقع متنوعة، واستكشاف التكامل مع سير عمل الجهات.',
    nextSteps: [
      ['01', 'تجربة ميدانية', 'اختبار النموذج مع جهة واحدة وفي مواقع فعلية.'],
      ['02', 'مواقع أكثر', 'توسيع تنوع الصور والبيئات وظروف العمل.'],
      ['03', 'تصاريح وتكامل', 'دراسة ربط التحقق من التصاريح بسير العمل مستقبلًا.']
    ],

    ctaLabel: 'BUILD THE NEXT CHAPTER',
    ctaTitle: 'المدن الذكية تبدأ',
    ctaAccent: 'بمعلومات لا تضيع.',
    ctaDesc:
      'هل ترى فرصة لتجربة الفكرة أو تطويرها بالتعاون مع فريقنا؟',
    contact: 'تواصل معنا',
    platform: 'اكتشف المنصة'
  },

  en: {
    eyebrow: 'UNIFIED WORKS / OUR STORY',
    heroSmall: 'From research concept to smarter-city vision',
    heroTitle: 'Some work disappears',
    heroAccent: 'beneath the ground.',
    heroEnd: 'Its impact remains.',
    heroDesc:
      'Unified Works began with a simple question: what if fieldwork information did not disappear when an excavation was closed? We envision turning field photos and human review into a shared spatial record.',
    discover: 'Discover our story',
    explore: 'Explore the technology',
    heroVisualLabel: 'THE IDEA / 001',
    heroVisualTop: 'From one photo',
    heroVisualBottom: 'to shared knowledge',
    concept: 'Research concept',

    originLabel: '01 / THE BEGINNING',
    originTitle: 'The problem was never',
    originAccent: 'just the excavation.',
    originDesc:
      'During excavation and utility work, important details can become invisible once a road is restored. Photos may be scattered, reviews may happen later, and location information may not be shared.',
    originQuote:
      'What if every field photo became part of the city’s memory?',
    originCards: [
      {
        number: '01',
        title: 'Work happens',
        desc: 'Field teams operate across many different locations.'
      },
      {
        number: '02',
        title: 'Details disappear',
        desc: 'Once a site is closed, underground work is no longer visible.'
      },
      {
        number: '03',
        title: 'Knowledge fragments',
        desc: 'Photos and information may remain scattered across different records.'
      }
    ],

    solutionLabel: '02 / THE TURNING POINT',
    solutionTitle: 'We envisioned more than',
    solutionAccent: 'a photo-upload app.',
    solutionDesc:
      'The concept is a knowledge cycle: contractors capture photos, the system compares them with approved references, uncertain cases go to supervisors, and approved photos expand the reference library.',
    solutionSteps: [
      {
        title: 'Capture evidence',
        desc: 'A field photo linked to the worksite and capture time.'
      },
      {
        title: 'Intelligent comparison',
        desc: 'Compare the photo with previously approved references.'
      },
      {
        title: 'Human decision',
        desc: 'Supervisors review uncertain cases.'
      },
      {
        title: 'Continuous learning',
        desc: 'Approved photos expand the reference library.'
      }
    ],
    solutionNote:
      'This describes the research methodology, not a claim of live deployment or agency integration.',

    visionLabel: '03 / WHAT DRIVES US',
    visionTitle: 'Our vision goes',
    visionAccent: 'beyond one project.',
    values: [
      {
        title: 'Vision',
        desc: 'Make fieldwork more visible and turn fragmented information into a spatial reference for better city decisions.'
      },
      {
        title: 'Mission',
        desc: 'Explore a practical workflow connecting field photos, human review, and geolocation.'
      },
      {
        title: 'Principle',
        desc: 'AI supports decisions, while human oversight remains essential for uncertain results.'
      }
    ],

    researchLabel: '04 / RESEARCH JOURNEY',
    researchTitle: 'We moved',
    researchAccent: 'beyond the idea.',
    researchDesc:
      'The concept progressed into a research prototype tested with real excavation and utility photos. These are preliminary image-recognition results, not city-wide impact measurements.',
    researchStats: [
      ['148', 'Real photos in the experiment'],
      ['99.5%', 'Reported accuracy after 10 approvals'],
      ['44/45', 'Cable photos recognized'],
      ['0', 'Wrong auto-acceptances in the reported test']
    ],
    researchDisclaimer:
      'Figures are taken from the project research poster and require broader field validation.',
    researchButton: 'Explore impact results',

    teamLabel: '05 / THE PEOPLE',
    teamTitle: 'Behind the concept',
    teamAccent: 'is a team.',
    teamDesc:
      'Unified Works is a student research project combining engineering thinking, technology, and field-problem analysis.',
    teamMembers: [
      'Mazin Alqahtani',
      'Ahmed Alharbi',
      'Linah Alwilmi',
      'Reem Almezeal'
    ],
    teamNote:
      'Team members listed in the project research poster.',
    teamBadge: 'PROJECT TEAM',

    nextLabel: '06 / WHAT COMES NEXT',
    nextTitle: 'This is not',
    nextAccent: 'the end of the story.',
    nextDesc:
      'The next steps are broader field testing, evaluation across different sites, and exploring integration into agency workflows.',
    nextSteps: [
      ['01', 'Field pilot', 'Test the prototype with one agency at real worksites.'],
      ['02', 'More locations', 'Expand image diversity and operating conditions.'],
      ['03', 'Permits and integration', 'Explore future permit verification in the workflow.']
    ],

    ctaLabel: 'BUILD THE NEXT CHAPTER',
    ctaTitle: 'Smarter cities begin',
    ctaAccent: 'with knowledge that lasts.',
    ctaDesc:
      'See an opportunity to pilot or develop the concept with our team?',
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
      <h2>{title}<em>{accent}</em></h2>
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
          <span /> {t.concept}
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
        <span className={styles.eyebrow}>INTERACTIVE PROCESS / 0{selected + 1}</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
          >
            <span className={styles.cycleIndex}>0{selected + 1} / 04</span>
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
        <span>{name.split(' ').map(x => x[0]).join('')}</span>
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
    <main className={styles.page} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <span className={styles.eyebrow}>{t.eyebrow}</span>
              <span className={styles.heroSmall}>{t.heroSmall}</span>

              <h1>
                {t.heroTitle}
                <em>{t.heroAccent}</em>
                <span>{t.heroEnd}</span>
              </h1>

              <p>{t.heroDesc}</p>

              <div className={styles.heroActions}>
                <a href="#our-story" className={styles.primaryButton}>
                  {t.discover}
                  <Arrow size={18} />
                </a>
                <Link to="/technology" className={styles.secondaryButton}>
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
            <a href="#our-story">
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section className={styles.section} id="our-story">
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

      {/* SOLUTION */}
      <section className={`${styles.section} ${styles.altSection}`}>
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

          <p className={styles.disclaimer}>
            <FlaskConical size={17} />
            {t.solutionNote}
          </p>
        </div>
      </section>

      {/* VISION */}
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
                  <Icon size={37} className={styles.valueIcon} />
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className={`${styles.section} ${styles.researchSection}`}>
        <div className={styles.container}>
          <div className={styles.researchHeader}>
            <SectionHeading
              label={t.researchLabel}
              title={t.researchTitle}
              accent={t.researchAccent}
              desc={t.researchDesc}
            />
            <Link to="/impact" className={styles.secondaryButton}>
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

          <p className={styles.disclaimer}>
            <FlaskConical size={17} />
            {t.researchDisclaimer}
          </p>
        </div>
      </section>

      {/* TEAM */}
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
              <GraduationCap size={31} />
              <span>UNIFIED WORKS</span>
              <small>RESEARCH TEAM</small>
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

          <p className={styles.teamNote}>{t.teamNote}</p>
        </div>
      </section>

      {/* FUTURE */}
      <section className={`${styles.section} ${styles.altSection}`}>
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
                <div className={styles.futureNumber}>{num}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <CheckCircle2 size={20} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <Reveal className={styles.cta}>
            <span className={styles.eyebrow}>{t.ctaLabel}</span>
            <h2>{t.ctaTitle}<em>{t.ctaAccent}</em></h2>
            <p>{t.ctaDesc}</p>

            <div className={styles.heroActions}>
              <Link to="/contact" className={styles.primaryButton}>
                {t.contact}
                <Arrow size={18} />
              </Link>
              <Link to="/platform" className={styles.secondaryButton}>
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
