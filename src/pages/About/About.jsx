
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
    heroLabel: "من نحن / الاعمال الموحد",
    heroFirst: "عن",
    heroSecond: "الاعمال الموحد",
    heroText:
      "الاعمال الموحد منصة رقمية لتوثيق أعمال البنية التحتية ومتابعة المقاولين ومراجعة جودة التنفيذ، من خلال الصور الميدانية وسجلات الأعمال وقرارات المشرفين",
    discover: "نبذة عن المنصة",
    heroNote: "منصة الاعمال الموحد",
    heroFoot: "التوثيق والإشراف على الأعمال",

    storyLabel: "01 — التعريف بالمنصة",
    storyTitle: "نبذة عن",
    storyAccent: "المنصة",
    storyLead:
      "طُوّرت الاعمال الموحد لتنظيم التوثيق الميداني ومساندة الجهات في الإشراف على تنفيذ أعمال البنية التحتية",
    storyText:
      "تعدد مواقع التنفيذ وتوزع الصور والملاحظات بين ملفات ومراسلات منفصلة يصعّبان متابعة المقاولين واسترجاع سجلات الأعمال والتحقق من معالجة الملاحظات",
    storyText2:
      "تجمع المنصة أدلة التنفيذ والمراجعة في سجلات مرتبطة بالأعمال، وتستخدم نموذج ذكاء اصطناعي مدرّبًا ومختبرًا على صور ميدانية فعلية، مع إمكانية تخصيص النماذج ببيانات الصور وقرارات المشرفين المعتمدة وبقاء الاعتماد النهائي للمشرف",
    storyStatement: "سجل العمل مرجع للتوثيق والملاحظات وقرارات المراجعة",

    challengeLabel: "02 — التحديات",
    challengeTitle: "تحديات",
    challengeAccent: "الأعمال الميدانية",
    challengeIntro:
      "تعالج المنصة صعوبات تنظيم الأدلة ومتابعة التنفيذ وتوثيق نتائج الإشراف عبر مواقع العمل المتعددة",
    challenges: [
      {
        number: "01",
        title: "تشتت التوثيق",
        short: "صور ومستندات في مصادر منفصلة",
        detail:
          "اختلاف أساليب توثيق المراحل وتوزع الأدلة يصعّبان الوصول إلى سجل مكتمل ومراجعة ما نُفذ فعليًا",
        tag: "التوثيق",
      },
      {
        number: "02",
        title: "تعدد مواقع التنفيذ",
        short: "صعوبة ربط الأدلة بالأعمال",
        detail:
          "غياب الربط بين الصور ومواقع الأعمال يحد من إمكانية تتبع التنفيذ والرجوع إلى البيانات التاريخية لكل موقع",
        tag: "المواقع",
      },
      {
        number: "03",
        title: "المتابعة اليدوية",
        short: "تكرار الاستفسارات وزيارات الفحص",
        detail:
          "عدم انتظام تسجيل الملاحظات وقرارات المراجعة يزيد صعوبة متابعة التصحيح، وقد يسهم في تكرار المشكلات وأعمال المعالجة",
        tag: "الإشراف",
      },
    ],

    processLabel: "03 — إجراءات العمل",
    processTitle: "منهجية",
    processAccent: "العمل",
    processIntro:
      "تربط المنهجية بيانات العمل بأدلة التنفيذ ومراجعة المشرف، مع تحديد مسؤولية كل طرف عن التوثيق والقرار",
    process: [
      {
        number: "01",
        en: "التسجيل",
        title: "تسجيل العمل",
        short: "تحديد بيانات النشاط وموقعه",
        detail:
          "إنشاء سجل للعمل يتضمن موقع التنفيذ والبيانات اللازمة للمتابعة من الجهات المختصة",
      },
      {
        number: "02",
        en: "التوثيق",
        title: "التوثيق الميداني",
        short: "إرفاق أدلة مراحل التنفيذ",
        detail:
          "حفظ صور الأعمال وبياناتها والملاحظات الميدانية ضمن السجل الخاص بالنشاط",
      },
      {
        number: "03",
        en: "التحقق",
        title: "التحقق من الصور",
        short: "مساندة المراجعة الأولية",
        detail:
          "تحليل الصور لمساعدة المشرف في تحديد الحالات التي تستدعي التدقيق، دون إسناد الاعتماد النهائي إلى النموذج",
      },
      {
        number: "04",
        en: "المراجعة",
        title: "توثيق قرار المشرف",
        short: "تسجيل النتيجة والملاحظات",
        detail:
          "مراجعة الأدلة وتسجيل قرار المشرف وملاحظاته، مع إتاحة السجلات للمستخدمين المخولين",
      },
    ],
    stage: "المرحلة",
    nextStage: "المرحلة التالية",

    directionLabel: "04 — التوجه والأهداف",
    directionTitle: "أهداف",
    directionAccent: "المنصة",
    vision: "الرؤية",
    visionText:
      "أن تكون الاعمال الموحد المنصة الرقمية الوطنية الموحدة لإدارة أعمال البنية التحتية الميدانية والإشراف عليها في المملكة العربية السعودية، بما يعزز التكامل بين الجهات ويوحّد التوثيق ومراجعة الجودة ومتابعة التزام المقاولين بالمتطلبات الفنية، ويرفع كفاءة العمليات وجودة التنفيذ",
    mission: "الرسالة",
    missionText:
      "تحسين ممارسات التوثيق ومتابعة الالتزام بالمتطلبات الفنية، وتسهيل التنسيق بين المقاولين والمشرفين والجهات لتقليل المتابعة والزيارات غير الضرورية",

    ecosystemLabel: "05 — مجالات الاستخدام",
    ecosystemTitle: "الجهات",
    ecosystemAccent: "المستفيدة",
    ecosystemIntro:
      "تستهدف المنصة الجهات المسؤولة عن مشروعات الكهرباء والمياه والصرف الصحي والاتصالات والخدمات البلدية، وفق اختصاصاتها وصلاحيات مستخدميها",
    stakeholders: [
      {
        number: "01",
        en: "التنظيم",
        title: "الجهات التنظيمية",
        short: "الاطلاع وفق الاختصاص",
        detail:
          "الرجوع إلى سجلات الأعمال والملاحظات ذات الصلة بالمسؤوليات التنظيمية عند توفر الصلاحية",
      },
      {
        number: "02",
        en: "الملكية والتشغيل",
        title: "الجهات المالكة والمشغلة",
        short: "متابعة الجودة وأداء المقاولين",
        detail:
          "مراجعة تقدم الأعمال وأدلة التنفيذ وقرارات الإشراف المرتبطة بالمرافق والمشروعات التابعة للجهة",
      },
      {
        number: "03",
        en: "التنفيذ",
        title: "المقاولون",
        short: "تقديم الأدلة ومعالجة الملاحظات",
        detail:
          "توثيق الأنشطة المسندة بالصور والبيانات وتحديث السجلات استجابة لملاحظات المشرف ومتطلبات التصحيح",
      },
      {
        number: "04",
        en: "الخدمات البلدية",
        title: "الأمانات والبلديات",
        short: "متابعة الأعمال ضمن الاختصاص",
        detail:
          "الاطلاع المصرح به على أعمال البنية التحتية ومواقعها وملاحظاتها لدعم المتابعة والتنسيق بين الجهات",
      },
    ],

    teamLabel: "06 — الفريق",
    teamTitle: "فريق",
    teamAccent: "الاعمال الموحد",
    teamIntro:
      "أعضاء الفريق القائم على تطوير منصة الاعمال الموحد لتوثيق أعمال البنية التحتية ومراجعتها",
    member: "عضو الفريق",
    teamEnglish: "TEAM",

    closingLabel: "الاعمال الموحد",
    closingTitle: "وظائف المنصة",
    closingAccent: "والتواصل",
    closingText:
      "للاطلاع على وظائف النظام وأدوار المستخدمين أو التواصل بشأن احتياجات التوثيق والإشراف الميداني",
    explore: "عرض المنصة",
    contact: "تواصل معنا",
  },

  en: {
    heroLabel: "ABOUT US / Unified Works",
    heroFirst: "About",
    heroSecond: "Unified Works",
    heroText:
      "Unified Works is a digital platform for infrastructure work documentation, contractor monitoring, and execution quality review through field photographs, work records, and supervisor decisions",
    discover: "Platform overview",
    heroNote: "Unified Works Platform",
    heroFoot: "Work documentation and supervision",

    storyLabel: "01 — INTRODUCTION",
    storyTitle: "Platform",
    storyAccent: "overview",
    storyLead:
      "Unified Works was developed to organize field documentation and support organizations supervising infrastructure execution",
    storyText:
      "Multiple worksites and photographs and observations held in separate files and correspondence make contractor monitoring, record retrieval, and corrective action follow-up more difficult",
    storyText2:
      "The platform links execution and review evidence to work records and uses an AI model trained and tested on real field images, with models adaptable through validated images and supervisor decisions and final approval retained by supervisors",
    storyStatement:
      "The work record provides a reference for evidence, observations, and review decisions",

    challengeLabel: "02 — CHALLENGES",
    challengeTitle: "Field operations",
    challengeAccent: "challenges",
    challengeIntro:
      "The platform addresses difficulties organizing evidence, monitoring execution, and recording supervision outcomes across multiple worksites",
    challenges: [
      {
        number: "01",
        title: "Fragmented documentation",
        short: "Photographs and documents held separately",
        detail:
          "Inconsistent stage documentation and dispersed evidence make it harder to retrieve complete records and verify completed work",
        tag: "DOCUMENTATION",
      },
      {
        number: "02",
        title: "Multiple worksites",
        short: "Evidence not linked to work activities",
        detail:
          "Photographs without links to work locations limit execution traceability and access to historical records for each site",
        tag: "LOCATION",
      },
      {
        number: "03",
        title: "Manual follow-up",
        short: "Repeated enquiries and inspection visits",
        detail:
          "Inconsistent observation and decision records complicate corrective action follow-up and can contribute to recurring issues and remedial work",
        tag: "OVERSIGHT",
      },
    ],

    processLabel: "03 — WORK PROCEDURES",
    processTitle: "Our",
    processAccent: "approach",
    processIntro:
      "The approach links work details to execution evidence and supervisor review, with defined responsibilities for documentation and decisions",
    process: [
      {
        number: "01",
        en: "REGISTER",
        title: "Register work",
        short: "Record activity and location details",
        detail:
          "Create a work record containing the execution location and information required for oversight by responsible organizations",
      },
      {
        number: "02",
        en: "DOCUMENT",
        title: "Field documentation",
        short: "Attach evidence of execution stages",
        detail:
          "Retain work photographs, supporting data, and field observations within the activity record",
      },
      {
        number: "03",
        en: "VERIFY",
        title: "Image verification",
        short: "Support preliminary review",
        detail:
          "Analyze photographs to help supervisors identify cases requiring examination, without assigning final approval to the model",
      },
      {
        number: "04",
        en: "REVIEW",
        title: "Supervisor decision records",
        short: "Record outcomes and observations",
        detail:
          "Review evidence and record supervisor decisions and observations, with records available to authorized users",
      },
    ],
    stage: "STAGE",
    nextStage: "Next stage",

    directionLabel: "04 — DIRECTION AND OBJECTIVES",
    directionTitle: "Platform",
    directionAccent: "objectives",
    vision: "Vision",
    visionText:
      "To become Saudi Arabia’s unified national digital platform for managing and overseeing infrastructure field operations, strengthening coordination among organizations, standardizing documentation and quality review, and supporting contractor compliance with technical requirements to improve operational efficiency and execution quality",
    mission: "Mission",
    missionText:
      "Improve documentation practices and technical compliance monitoring, and facilitate coordination between contractors, supervisors, and organizations to reduce unnecessary follow-up and site visits",

    ecosystemLabel: "05 — APPLICATION AREAS",
    ecosystemTitle: "Beneficiary",
    ecosystemAccent: "organizations",
    ecosystemIntro:
      "The platform is intended for organizations responsible for electricity, water and wastewater, telecommunications, and municipal projects, within their remit and user permissions",
    stakeholders: [
      {
        number: "01",
        en: "REGULATORS",
        title: "Regulatory authorities",
        short: "Access within regulatory responsibilities",
        detail:
          "Refer to work records and observations relevant to regulatory responsibilities where access is authorized",
      },
      {
        number: "02",
        en: "OWNERS AND OPERATORS",
        title: "Project owners and operators",
        short: "Quality and contractor performance monitoring",
        detail:
          "Review progress, execution evidence, and supervision decisions associated with their facilities and projects",
      },
      {
        number: "03",
        en: "CONTRACTORS",
        title: "Contractors",
        short: "Submit evidence and address observations",
        detail:
          "Document assigned activities with photographs and data, updating records in response to supervisor observations and corrective requirements",
      },
      {
        number: "04",
        en: "MUNICIPALITIES",
        title: "Municipalities",
        short: "Work oversight within municipal responsibilities",
        detail:
          "Access authorized infrastructure work records, locations, and observations to support oversight and interagency coordination",
      },
    ],

    teamLabel: "06 — TEAM",
    teamTitle: "Unified Works",
    teamAccent: "team",
    teamIntro:
      "The team developing Unified Works for infrastructure work documentation and review",
    member: "Team member",
    teamEnglish: "TEAM",

    closingLabel: "Unified Works",
    closingTitle: "Platform functions",
    closingAccent: "and enquiries",
    closingText:
      "View system functions and user roles or contact us about field documentation and supervision requirements",
    explore: "View the platform",
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
      ? "من نحن | الاعمال الموحد"
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
            <span>{isArabic ? "2026 / من نحن" : "2026 / ABOUT"}</span>
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
              <img src={LOGO} alt={isArabic ? "الاعمال الموحد" : "Unified Works"} />
              <span className={styles.heroBrandCaption}>
                {t.heroNote}
              </span>
            </Reveal>
          </div>

          <div className={styles.heroFooter}>
            <span>{t.heroFoot}</span>
            <span>{isArabic ? "متابعة القراءة" : "CONTINUE READING"} <ArrowDown className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
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
                {isArabic ? "الاعمال الموحد / التعريف" : "Unified Works / INTRODUCTION"}
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
                    <span>{isArabic ? "الاعمال الموحد" : "Unified Works"}</span>
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
                {isArabic ? "الاعمال الموحد / الأهداف" : "Unified Works / OBJECTIVES"}
              </span>
            </Reveal>

            <div className={styles.directionContent}>
              <Reveal>
                <article className={styles.directionBlock}>
                  <span className={styles.directionNumber}>
                    {isArabic ? "01 / الرؤية" : "01 / VISION"}
                  </span>
                  <h3>{t.vision}</h3>
                  <p>{t.visionText}</p>
                </article>
              </Reveal>

              <Reveal delay={100}>
                <article className={styles.directionBlock}>
                  <span className={styles.directionNumber}>
                    {isArabic ? "02 / الرسالة" : "02 / MISSION"}
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
                  <span>{isArabic ? "الاعمال الموحد" : "Unified Works"}</span>
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
                  <span>{isArabic ? "UW / الفريق" : "UW / TEAM"}</span>
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
