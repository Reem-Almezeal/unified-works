
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import styles from "./About.module.css";

const LOGO = "/images/unified-works-logo.png";

const team = [
  { ar: "ريم المزعل", en: "Reem Almezeal" },
  { ar: "لينه اللويمي", en: "Linah Alwimi" },
  { ar: "أحمد الحربي", en: "Ahmed Alharbi" },
  { ar: "مازن القحطاني", en: "Mazin Alqahtani" },
];

const content = {
  ar: {
    heroLabel: "من نحن / UNIFIED WORKS",
    heroFirst: "نحو ميدان",
    heroSecond: "أكثر وضوحًا",
    heroText:
      "نحوّل تفاصيل أعمال البنية التحتية إلى معلومات مترابطة تدعم التوثيق والتحقق والمتابعة وتمنح الجهات المعنية رؤية أوضح لما يحدث على أرض الواقع",
    discover: "اكتشف قصتنا",
    heroNote: "منصة الأعمال الموحّدة",
    heroFoot: "من الميدان إلى القرار",

    storyLabel: "01 — قصتنا",
    storyTitle: "من تحدٍ ميداني",
    storyAccent: "إلى فكرة مترابطة",
    storyLead:
      "بدأت الفكرة من سؤال بسيط: كيف يمكن أن تكون أعمال البنية التحتية أكثر وضوحًا للجهات التي تنفذها وتشرف عليها؟",
    storyText:
      "في بيئة تتعدد فيها الجهات والمقاولون ومواقع التنفيذ، قد تتوزع الصور والملاحظات والمستندات بين مصادر مختلفة، مما يجعل متابعة الأعمال والرجوع إلى تفاصيلها أكثر تعقيدًا",
    storyText2:
      "من هنا جاءت الأعمال الموحّدة لتجمع بيانات العمل وموقعه وتوثيقه وملاحظاته ضمن تجربة رقمية واحدة، مع الاستفادة من الذكاء الاصطناعي لدعم المراجعة",
    storyStatement: "كل عمل له موقع، وكل مرحلة لها توثيق، وكل معلومة لها سياق",

    challengeLabel: "02 — التحديات",
    challengeTitle: "تحديات واقعية",
    challengeAccent: "تستحق حلولًا أذكى",
    challengeIntro:
      "نركز على التحديات التي تؤثر في وضوح المعلومات وسهولة متابعة الأعمال الميدانية",
    challenges: [
      {
        number: "01",
        title: "تشتت التوثيق",
        short: "عندما تتفرق تفاصيل العمل بين مصادر متعددة",
        detail:
          "توزع الصور والمستندات والملاحظات يجعل الوصول إلى سجل واضح لكل عمل أكثر صعوبة، لذلك نربط الأدلة بسجل العمل نفسه",
        tag: "DOCUMENTATION",
      },
      {
        number: "02",
        title: "ضعف الترابط المكاني",
        short: "عندما تنفصل المعلومات عن موقع التنفيذ",
        detail:
          "ربط التوثيق بالموقع الجغرافي يمنح الجهات المعنية سياقًا أوضح للأعمال المنفذة ويساعدها على فهم ارتباطها بالمرافق المحيطة",
        tag: "LOCATION",
      },
      {
        number: "03",
        title: "تعقيد المتابعة",
        short: "عندما تتعدد الجهات ومسارات المراجعة",
        detail:
          "تنظيم البيانات والملاحظات في سجل مترابط يسهّل المراجعة والتنسيق بين الجهات وفق مسؤولياتها وصلاحياتها",
        tag: "OVERSIGHT",
      },
    ],

    processLabel: "03 — منهجيتنا",
    processTitle: "من الميدان",
    processAccent: "إلى القرار",
    processIntro:
      "أربع مراحل مترابطة تجمع دورة العمل الميداني في مسار واحد واضح وقابل للتتبع",
    process: [
      {
        number: "01",
        en: "REGISTER",
        title: "تسجيل العمل",
        short: "بداية منظمة لكل مهمة",
        detail:
          "تسجيل بيانات العمل وتحديد موقعه الجغرافي والجهة المرتبطة به لإنشاء مرجع رقمي موحد",
      },
      {
        number: "02",
        en: "DOCUMENT",
        title: "التوثيق الميداني",
        short: "كل مرحلة موثقة",
        detail:
          "إرفاق صور التنفيذ والمستندات والملاحظات وربطها مباشرة بالعمل المسجل",
      },
      {
        number: "03",
        en: "VERIFY",
        title: "التحقق الذكي",
        short: "تقنية تدعم المراجعة",
        detail:
          "الاستفادة من الذكاء الاصطناعي لمراجعة الصور وإبراز الملاحظات المحتملة لدعم التحقق البشري",
      },
      {
        number: "04",
        en: "OVERSEE",
        title: "المراجعة والإشراف",
        short: "رؤية تدعم القرار",
        detail:
          "تمكين الجهات المختصة من مراجعة بيانات الأعمال وتوثيقها وملاحظاتها وفق الصلاحيات المحددة",
      },
    ],
    stage: "المرحلة",
    nextStage: "المرحلة التالية",

    directionLabel: "04 — رؤيتنا ورسالتنا",
    directionTitle: "نؤمن بأن وضوح",
    directionAccent: "الميدان يصنع الفرق",
    vision: "رؤيتنا",
    visionText:
      "المساهمة في مستقبل تصبح فيه أعمال البنية التحتية أكثر وضوحًا وترابطًا وقابلية للمتابعة",
    mission: "رسالتنا",
    missionText:
      "توحيد التوثيق الميداني والمعلومات المكانية والتحقق الذكي في منظومة رقمية تدعم الإشراف وجودة التنفيذ",

    ecosystemLabel: "05 — منظومة العمل",
    ecosystemTitle: "جهات مختلفة",
    ecosystemAccent: "ضمن رؤية واحدة",
    ecosystemIntro:
      "تجمع المنصة الأطراف المرتبطة بأعمال البنية التحتية مع الحفاظ على اختصاصات كل جهة",
    stakeholders: [
      {
        number: "01",
        en: "REGULATORS",
        title: "الجهات التنظيمية",
        short: "متابعة وتنظيم",
        detail:
          "استعراض الأعمال والمعلومات المرتبطة بها وفق الاختصاصات والمسؤوليات التنظيمية",
      },
      {
        number: "02",
        en: "OPERATORS",
        title: "الجهات المالكة والمشغلة",
        short: "رؤية للمرافق والشبكات",
        detail:
          "متابعة الأعمال ذات العلاقة بالمرافق وشبكات البنية التحتية التابعة للجهة",
      },
      {
        number: "03",
        en: "CONTRACTORS",
        title: "المقاولون",
        short: "التنفيذ يبدأ من الميدان",
        detail:
          "تسجيل الأعمال وتوثيق مراحل التنفيذ وإرفاق الأدلة والملاحظات الميدانية",
      },
      {
        number: "04",
        en: "MUNICIPALITIES",
        title: "الأمانات والبلديات",
        short: "متابعة النطاق الحضري",
        detail:
          "استعراض الأعمال المرتبطة بالشوارع والمواقع الحضرية لدعم أعمال المتابعة",
      },
    ],

    teamLabel: "06 — فريق المشروع",
    teamTitle: "العقول خلف",
    teamAccent: "الأعمال الموحّدة",
    teamIntro:
      "فريق جمعته رؤية مشتركة لتطوير تجربة رقمية أكثر ترابطًا ووضوحًا للأعمال الميدانية",
    member: "عضو فريق المشروع",
    teamEnglish: "PROJECT TEAM",

    closingLabel: "UNIFIED WORKS",
    closingTitle: "لنصنع مستقبلًا",
    closingAccent: "أكثر وضوحًا",
    closingText:
      "اكتشف كيف تربط الأعمال الموحّدة الميدان بالتوثيق والمعلومات والمتابعة",
    explore: "استكشف المنصة",
    contact: "تواصل معنا",
  },

  en: {
    heroLabel: "ABOUT US / UNIFIED WORKS",
    heroFirst: "A clearer view",
    heroSecond: "of the field",
    heroText:
      "We connect infrastructure work details into meaningful information that supports documentation verification and oversight across stakeholders",
    discover: "Discover our story",
    heroNote: "Unified Works Platform",
    heroFoot: "From the field to decisions",

    storyLabel: "01 — OUR STORY",
    storyTitle: "From a field challenge",
    storyAccent: "to a connected idea",
    storyLead:
      "It began with one question: how can infrastructure operations become clearer for everyone involved?",
    storyText:
      "With multiple stakeholders contractors and work locations, photographs documents and observations may become scattered across separate sources",
    storyText2:
      "Unified Works brings work records locations documentation and observations into one digital experience while using AI to support review",
    storyStatement:
      "Every activity has a location, every stage has evidence, and every detail has context",

    challengeLabel: "02 — CHALLENGES",
    challengeTitle: "Real challenges",
    challengeAccent: "deserve smarter solutions",
    challengeIntro:
      "We focus on the challenges affecting information clarity and effective field oversight",
    challenges: [
      {
        number: "01",
        title: "Fragmented documentation",
        short: "When work details are scattered",
        detail:
          "Photographs documents and observations across different sources make complete work records harder to maintain",
        tag: "DOCUMENTATION",
      },
      {
        number: "02",
        title: "Disconnected locations",
        short: "When evidence loses its location context",
        detail:
          "Connecting documentation with geographic locations provides clearer context for infrastructure activities",
        tag: "LOCATION",
      },
      {
        number: "03",
        title: "Complex oversight",
        short: "When stakeholders follow separate review paths",
        detail:
          "Organized records support review and coordination according to stakeholder responsibilities and permissions",
        tag: "OVERSIGHT",
      },
    ],

    processLabel: "03 — OUR APPROACH",
    processTitle: "From the field",
    processAccent: "to the decision",
    processIntro:
      "Four connected stages bringing field operations into one traceable workflow",
    process: [
      {
        number: "01",
        en: "REGISTER",
        title: "Register work",
        short: "An organized starting point",
        detail:
          "Record work information its geographic location and relevant stakeholders",
      },
      {
        number: "02",
        en: "DOCUMENT",
        title: "Field documentation",
        short: "Evidence for every stage",
        detail:
          "Attach execution photographs documents and observations directly to each work record",
      },
      {
        number: "03",
        en: "VERIFY",
        title: "Intelligent verification",
        short: "Technology supporting review",
        detail:
          "Use AI assistance to review photographs and highlight potential observations for human verification",
      },
      {
        number: "04",
        en: "OVERSEE",
        title: "Review and oversight",
        short: "Clarity supporting decisions",
        detail:
          "Enable authorized stakeholders to review work records documentation and observations",
      },
    ],
    stage: "STAGE",
    nextStage: "Next stage",

    directionLabel: "04 — VISION & MISSION",
    directionTitle: "We believe clarity",
    directionAccent: "makes the difference",
    vision: "Our vision",
    visionText:
      "To contribute to a future where infrastructure operations are clearer more connected and easier to oversee",
    mission: "Our mission",
    missionText:
      "To unify field documentation geospatial information and AI-assisted verification in one digital ecosystem supporting execution quality",

    ecosystemLabel: "05 — OUR ECOSYSTEM",
    ecosystemTitle: "Different stakeholders",
    ecosystemAccent: "one connected view",
    ecosystemIntro:
      "The platform connects infrastructure stakeholders while respecting each organization's responsibilities",
    stakeholders: [
      {
        number: "01",
        en: "REGULATORS",
        title: "Regulatory authorities",
        short: "Regulation and oversight",
        detail:
          "Review relevant work information within regulatory responsibilities",
      },
      {
        number: "02",
        en: "OPERATORS",
        title: "Infrastructure operators",
        short: "Visibility across utility networks",
        detail:
          "Monitor activities associated with their facilities and infrastructure networks",
      },
      {
        number: "03",
        en: "CONTRACTORS",
        title: "Contractors",
        short: "Execution starts in the field",
        detail:
          "Register activities and document execution stages with field evidence",
      },
      {
        number: "04",
        en: "MUNICIPALITIES",
        title: "Municipalities",
        short: "Urban infrastructure oversight",
        detail:
          "Review activities associated with streets and urban environments",
      },
    ],

    teamLabel: "06 — PROJECT TEAM",
    teamTitle: "The people behind",
    teamAccent: "Unified Works",
    teamIntro:
      "A team united by a shared vision for clearer and more connected field operations",
    member: "Project team member",
    teamEnglish: "PROJECT TEAM",

    closingLabel: "UNIFIED WORKS",
    closingTitle: "A clearer future",
    closingAccent: "starts in the field",
    closingText:
      "Discover how Unified Works connects field documentation information and oversight",
    explore: "Explore the platform",
    contact: "Contact us",
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() =>
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${
        visible ? styles.revealVisible : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ label, first, accent, center = false }) {
  return (
    <div
      className={`${styles.sectionHeading} ${
        center ? styles.headingCenter : ""
      }`}
    >
      <span className={styles.sectionEyebrow}>{label}</span>
      <h2>
        {first}
        <span>{accent}</span>
      </h2>
    </div>
  );
}

export default function About() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const t = isArabic ? content.ar : content.en;

  const [activeStep, setActiveStep] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [activeMember, setActiveMember] = useState(-1);

  useEffect(() => {
    document.title = isArabic
      ? "من نحن | الأعمال الموحّدة"
      : "About | Unified Works";
  }, [isArabic]);

  return (
    <main
      className={styles.about}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroMeta}>
            <span>{t.heroLabel}</span>
            <span>2026 / ABOUT</span>
          </div>

          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <div className={styles.heroTitle}>
                <span className={styles.heroIndex}>UW / 01</span>
                <h1>
                  {t.heroFirst}
                  <span>{t.heroSecond}</span>
                </h1>
              </div>

              <p>{t.heroText}</p>

              <a className={styles.heroButton} href="#our-story">
                <span>{t.discover}</span>
                <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
              </a>
            </Reveal>

            <Reveal className={styles.heroBrand} delay={120}>
              <img src={LOGO} alt="Unified Works" />
              <span className={styles.heroBrandCaption}>
                {t.heroNote}
              </span>
            </Reveal>
          </div>

          <div className={styles.heroFooter}>
            <span>{t.heroFoot}</span>
            <span>SCROLL TO EXPLORE <ArrowDown className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="our-story" className={styles.story}>
        <div className={styles.container}>
          <Reveal>
            <SectionHeading
              label={t.storyLabel}
              first={t.storyTitle}
              accent={t.storyAccent}
            />
          </Reveal>

          <div className={styles.storyComposition}>
            <Reveal className={styles.storyFeature}>
              <span className={styles.storyFeatureIndex}>
                UNIFIED WORKS / ORIGIN
              </span>
              <strong>{t.storyLead}</strong>
              <span className={styles.storyFeatureEnd}>01 / 06</span>
            </Reveal>

            <div className={styles.storyNarrative}>
              <Reveal delay={90}>
                <p>{t.storyText}</p>
              </Reveal>
              <Reveal delay={140}>
                <p>{t.storyText2}</p>
              </Reveal>

              <Reveal className={styles.storySignature}>
                <span>UW</span>
                <strong>{t.storyStatement}</strong>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className={styles.challenges}>
        <div className={styles.container}>
          <Reveal>
            <SectionHeading
              label={t.challengeLabel}
              first={t.challengeTitle}
              accent={t.challengeAccent}
              center
            />
            <p className={styles.centerIntro}>
              {t.challengeIntro}
            </p>
          </Reveal>

          <div className={styles.challengeGrid}>
            {t.challenges.map((item, index) => (
              <Reveal key={item.number} delay={index * 85}>
                <button
                  type="button"
                  className={`${styles.challengeCard} ${
                    activeChallenge === index
                      ? styles.challengeActive
                      : ""
                  }`}
                  onMouseEnter={() => setActiveChallenge(index)}
                  onFocus={() => setActiveChallenge(index)}
                  onClick={() => setActiveChallenge(index)}
                  aria-expanded={activeChallenge === index}
                >
                  <span className={styles.challengeTop}>
                    <span>{item.number} / 03</span>
                    <span>{item.tag}</span>
                  </span>

                  <span className={styles.challengeBody}>
                    <strong>{item.title}</strong>
                    <span className={styles.challengeShort}>
                      {item.short}
                    </span>
                    <span className={styles.challengeDetail}>
                      {item.detail}
                    </span>
                  </span>

                  <span className={styles.challengeBottom}>
                    <span>UNIFIED WORKS</span>
                    <span><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.process}>
        <div className={styles.container}>
          <Reveal className={styles.processHeading}>
            <SectionHeading
              label={t.processLabel}
              first={t.processTitle}
              accent={t.processAccent}
            />
            <p>{t.processIntro}</p>
          </Reveal>

          <div className={styles.processTrack}>
            {t.process.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onMouseEnter={() => setActiveStep(index)}
                onFocus={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`${styles.processStep} ${
                  activeStep === index
                    ? styles.processStepActive
                    : ""
                }`}
                aria-expanded={activeStep === index}
              >
                <span className={styles.processStepTop}>
                  <span>{step.number}</span>
                  <span>{step.en}</span>
                </span>

                <span className={styles.processStepBody}>
                  <strong>{step.title}</strong>
                  <span className={styles.processStepShort}>
                    {step.short}
                  </span>
                  <span className={styles.processStepDetail}>
                    {step.detail}
                  </span>
                </span>

                <span className={styles.processStepFooter}>
                  <span>{t.stage} {step.number}</span>
                  <span><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
                </span>
              </button>
            ))}
          </div>

          <div className={styles.processProgress}>
            {t.process.map((step, index) => (
              <button
                key={step.number}
                type="button"
                aria-label={step.title}
                onClick={() => setActiveStep(index)}
                className={
                  activeStep === index ? styles.progressActive : ""
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className={styles.direction}>
        <div className={styles.container}>
          <div className={styles.directionLayout}>
            <Reveal className={styles.directionHeading}>
              <span className={styles.directionLabel}>
                {t.directionLabel}
              </span>
              <h2>
                {t.directionTitle}
                <span>{t.directionAccent}</span>
              </h2>
              <span className={styles.directionSignature}>
                UNIFIED WORKS / OUR DIRECTION
              </span>
            </Reveal>

            <div className={styles.directionContent}>
              <Reveal>
                <article className={styles.directionBlock}>
                  <span className={styles.directionNumber}>
                    01 / VISION
                  </span>
                  <h3>{t.vision}</h3>
                  <p>{t.visionText}</p>
                </article>
              </Reveal>

              <Reveal delay={100}>
                <article className={styles.directionBlock}>
                  <span className={styles.directionNumber}>
                    02 / MISSION
                  </span>
                  <h3>{t.mission}</h3>
                  <p>{t.missionText}</p>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className={styles.ecosystem}>
        <div className={styles.container}>
          <Reveal>
            <SectionHeading
              label={t.ecosystemLabel}
              first={t.ecosystemTitle}
              accent={t.ecosystemAccent}
              center
            />
            <p className={styles.centerIntro}>
              {t.ecosystemIntro}
            </p>
          </Reveal>

          <div className={styles.ecosystemGrid}>
            {t.stakeholders.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={`${styles.ecosystemCard} ${
                  activeStakeholder === index
                    ? styles.ecosystemCardActive
                    : ""
                }`}
                onMouseEnter={() => setActiveStakeholder(index)}
                onFocus={() => setActiveStakeholder(index)}
                onClick={() => setActiveStakeholder(index)}
                aria-expanded={activeStakeholder === index}
              >
                <span className={styles.ecosystemCardTop}>
                  <span>{item.number}</span>
                  <span>{item.en}</span>
                </span>

                <span className={styles.ecosystemCardBody}>
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                  <span className={styles.ecosystemDetail}>
                    {item.detail}
                  </span>
                </span>

                <span className={styles.ecosystemCardFooter}>
                  <span>UNIFIED WORKS</span>
                  <span><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="our-team" className={styles.team}>
        <div className={styles.container}>
          <Reveal>
            <SectionHeading
              label={t.teamLabel}
              first={t.teamTitle}
              accent={t.teamAccent}
              center
            />
            <p className={styles.centerIntro}>
              {t.teamIntro}
            </p>
          </Reveal>

          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <button
                type="button"
                key={member.ar}
                className={`${styles.teamCard} ${
                  activeMember === index
                    ? styles.teamCardActive
                    : ""
                }`}
                onMouseEnter={() => setActiveMember(index)}
                onMouseLeave={() => setActiveMember(-1)}
                onFocus={() => setActiveMember(index)}
                onBlur={() => setActiveMember(-1)}
                onClick={() =>
                  setActiveMember(
                    activeMember === index ? -1 : index
                  )
                }
                aria-expanded={activeMember === index}
              >
                <span className={styles.teamCardTop}>
                  <span>0{index + 1}</span>
                  <span>UW / TEAM</span>
                </span>

                <span className={styles.teamCardCenter}>
                  <span className={styles.teamMonogram}>
                    {isArabic
                      ? member.ar.charAt(0)
                      : member.en.charAt(0)}
                  </span>
                </span>

                <span className={styles.teamCardInfo}>
                  <strong>
                    {isArabic ? member.ar : member.en}
                  </strong>
                  <span>{t.member}</span>
                  <span className={styles.teamCardExtra}>
                    {isArabic ? member.en : member.ar}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <Reveal className={styles.closingContent}>
            <span className={styles.closingEyebrow}>
              {t.closingLabel}
            </span>
            <h2>
              {t.closingTitle}
              <span>{t.closingAccent}</span>
            </h2>
            <p>{t.closingText}</p>

            <div className={styles.closingActions}>
              <Link to="/platform" className={styles.primaryButton}>
                {t.explore}
                <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
              </Link>
              <Link to="/contact" className={styles.outlineButton}>
                {t.contact}
                <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
