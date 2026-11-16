

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import styles from "./Impact.module.css";

const IMG = "/images/impact/";
const ORG = "/images/organizations/";

const sectors = [
  { id: "energy", logo: `${ORG}saudi-energy.png`, image: `${IMG}impact-energy.webp`, url: "https://uw.81-208-191-204.sslip.io/p/el/#dash", ar: { name: "الطاقة والكهرباء", title: "متابعة أعمال الكهرباء", description: "صور مراحل التنفيذ وسجلات المواقع تدعم مراجعة أعمال المقاولين وفق المتطلبات الفنية وتوثيق الملاحظات وإجراءات المعالجة" }, en: { name: "Energy and electricity", title: "Electrical work monitoring", description: "Execution photographs and site records support contractor work reviews against technical requirements, with documented observations and corrective actions" } },
  { id: "water", logo: `${ORG}water.png`, image: `${IMG}impact-water.webp`, url: "https://uw.81-208-191-204.sslip.io/p/wa/#dash", ar: { name: "المياه والصرف الصحي", title: "توثيق أعمال الشبكات", description: "ربط صور أعمال التركيب والصيانة بمواقعها وملاحظات المشرف يتيح الرجوع إلى أدلة التنفيذ عند مراجعة أعمال المياه والصرف الصحي" }, en: { name: "Water and wastewater", title: "Network work documentation", description: "Linking installation and maintenance photographs to locations and supervisor observations provides evidence for water and wastewater work reviews" } },
  { id: "telecom", logo: `${ORG}telecom.png`, image: `${IMG}impact-telecom.webp`, url: "https://uw.81-208-191-204.sslip.io/p/tc/#dash", ar: { name: "الاتصالات", title: "متابعة تنفيذ شبكات الاتصالات", description: "توثيق التمديدات وأعمال الصيانة ونتائج المراجعة يساعد في متابعة تقدم الأعمال وتقييم أداء المقاولين ومعالجة الملاحظات" }, en: { name: "Telecommunications", title: "Telecommunications execution oversight", description: "Installation and maintenance records and review outcomes support progress monitoring, contractor performance assessment, and observation follow-up" } },
  { id: "municipality", logo: `${ORG}municipality.png`, image: `${IMG}impact-municipality.webp`, url: "https://uw.81-208-191-204.sslip.io/muni#query", ar: { name: "الأمانات والبلديات", title: "سجلات الأعمال البلدية", description: "إتاحة سجلات أعمال البنية التحتية ومواقعها وملاحظاتها للمستخدمين المخولين تدعم المتابعة البلدية والتنسيق بين الجهات المعنية" }, en: { name: "Municipal authorities", title: "Municipal work records", description: "Authorized access to infrastructure work records, locations, and observations supports municipal oversight and coordination between relevant entities" } },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => !("IntersectionObserver" in window));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ "--reveal-delay": `${delay}ms` }} className={`${styles.reveal} ${visible ? styles.revealed : ""} ${className}`}>{children}</div>;
}

function Count({ value, suffix = "" }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let observer;
    const start = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(value); return; }
      const begin = performance.now();
      const tick = (now) => {
        const p = Math.min((now - begin) / 1400, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) start();
    else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { start(); observer.disconnect(); }
      }, { threshold: 0.5 });
      observer.observe(el);
    }
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref} className={styles.count}>{count}{suffix}</span>;
}

function Image(props) {
  return <ImageContent key={props.src} {...props} />;
}

function ImageContent({ src, alt, className = "", eager = false }) {
  const [error, setError] = useState(false);
  return error ? <div className={`${styles.imageFallback} ${className}`} role="img" aria-label={alt}><span>{alt}</span></div> : <img src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setError(true)} />;
}

export default function Impact() {
  const { i18n } = useTranslation();
  const ar = i18n.language?.startsWith("ar");
  const t = (a, e) => ar ? a : e;
  const [activeSector, setActiveSector] = useState("energy");
  const active = sectors.find(s => s.id === activeSector) || sectors[0];
  const activeText = ar ? active.ar : active.en;

  const benefits = [
    { number: "01", image: `${IMG}impact-documentation.webp`, ar: { eyebrow: "أدلة التنفيذ", title: "التوثيق والمساءلة", desc: "تُحفظ صور مراحل العمل مع بيانات الموقع والوقت وملاحظات المشرف وقراراته، لتوفير سجل يمكن الرجوع إليه في متابعة المشروع وتقييم المقاول" }, en: { eyebrow: "Execution evidence", title: "Documentation and accountability", desc: "Work stage photographs are retained with location, time, supervisor observations, and decisions, providing a reference for project follow-up and contractor evaluation" } },
    { number: "02", image: `${IMG}impact-ai-validation.webp`, ar: { eyebrow: "مساندة المشرف", title: "كفاءة المراجعة", desc: "دُرّب النموذج واختُبر على صور ميدانية فعلية لمساندة الفحص الأولي، وتتيح منهجية تخصيصه استخدام الصور والقرارات المعتمدة لتحسين اتساق المراجعة وتقليل تكرارها، مع بقاء الاعتماد للمشرف" }, en: { eyebrow: "Supervisor assistance", title: "Review efficiency", desc: "The model was trained and tested on real field images to support preliminary checks; organization-specific training can use validated images and decisions to improve review consistency and reduce repetition, with approval retained by supervisors" } },
    { number: "03", image: `${IMG}impact-after.webp`, ar: { eyebrow: "إجراءات المعالجة", title: "تكاليف إعادة العمل والصيانة", desc: "مراجعة أدلة التنفيذ مبكرًا وتوثيق العيوب وإجراءات معالجتها يساعدان في الحد من تكرار الأعمال وزيارات المتابعة وتكاليف الصيانة التي يمكن تجنبها" }, en: { eyebrow: "Corrective action", title: "Rework and maintenance costs", desc: "Early review of execution evidence and documented defects and corrective actions can help limit repeated work, follow-up visits, and avoidable maintenance costs" } },
  ];

  return (
    <main className={styles.page} dir={ar ? "rtl" : "ltr"}>
      {/* 01 — HERO: same side-by-side composition as other pages */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <span className={styles.eyebrow}>{t("الأعمال الموحّدة", "UNIFIED WORKS")} / {t("الأثر", "IMPACT")}</span>
              <h1>{t("الأثر التشغيلي", "Operational impact")}<span>{t("وكفاءة الإنفاق", "Cost efficiency")}</span></h1>
              <p>{t("تساعد مراجعة صور التنفيذ وسجلات المشرفين الجهات المالكة والمشغلة في متابعة جودة أعمال المقاولين وترشيد زيارات التفتيش وتكاليف إعادة العمل والصيانة", "Reviewing execution photographs and supervisor records helps project owners and operators monitor contractor quality and manage inspection, rework, and maintenance costs")}</p>
              <a href="#impact-value" className={styles.primaryLink}>{t("استعراض مجالات الأثر", "View operational benefits")}<ArrowDown size={17} /></a>
            </Reveal>
            <Reveal className={styles.heroImageWrap} delay={130}>
              <Image src={`${IMG}impact-hero.webp`} alt={t("أعمال البنية التحتية في الميدان", "Infrastructure field operations")} className={styles.heroImage} eager />
              <div className={styles.heroImageCaption}><span className={styles.captionLine} />{t("متابعة تنفيذ الأعمال", "WORK EXECUTION MONITORING")}</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — THE WHY: editorial impact statement + refined cards */}
      <section className={styles.whySection} id="impact-value">
        <div className={styles.container}>
          <Reveal className={styles.whyHeading}>
            <span className={styles.eyebrow}>{t("الإشراف على التنفيذ", "EXECUTION OVERSIGHT")}</span>
            <h2>{t("متابعة المقاولين", "Contractor monitoring")}<span>{t("وجودة التنفيذ", "Execution quality")}</span></h2>
          </Reveal>
          <div className={styles.whyLayout}>
            <Reveal className={styles.whyPhoto}>
              <Image src={`${IMG}impact-regulator.webp`} alt={t("متابعة أعمال البنية التحتية", "Infrastructure operations oversight")} />
              <div className={styles.photoBottomText}>{t("سجلات التنفيذ وقرارات المراجعة", "EXECUTION AND REVIEW RECORDS")}</div>
            </Reveal>
            <div className={styles.whyCards}>
              <Reveal className={styles.whyCard} delay={80}>
                <span className={styles.cardIndex}>01 / {t("التحدي", "THE CHALLENGE")}</span>
                <h3>{t("تشتت سجلات الأعمال", "Fragmented work records")}</h3>
                <p>{t("توزع الصور والملاحظات بين الملفات والمراسلات يصعّب تتبع حالة العمل ويزيد المتابعة اليدوية وتكرار طلب المعلومات", "Photographs and observations scattered across files and correspondence make work status harder to track and increase manual follow-up and repeated information requests")}</p>
              </Reveal>
              <Reveal className={`${styles.whyCard} ${styles.whyCardAccent}`} delay={150}>
                <span className={styles.cardIndex}>02 / {t("دور المنصة", "PLATFORM SUPPORT")}</span>
                <h3>{t("مراجعة الالتزام بالمتطلبات", "Requirements review")}</h3>
                <p>{t("تجمع المنصة أدلة الأعمال والملاحظات وقرارات المراجعة للتحقق من المتطلبات الفنية ومتابعة إجراءات المعالجة وإتاحة السجلات للمخولين", "The platform brings together work evidence, observations, and decisions to check technical requirements, track corrective actions, and provide records to authorized users")}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — VALIDATION: compact, premium metrics */}
      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <Reveal className={styles.metricsTop}>
            <div><span className={styles.eyebrow}>{t("تقييم النموذج", "MODEL EVALUATION")}</span><h2>{t("نتائج الاختبارات", "Test results")}</h2></div>
            <p>{t("شملت اختبارات التحقق 148 صورة ميدانية فعلية، وسُجل قبول صحيح لـ94 صورة من أصل 100 بعد 10 اعتمادات من المشرف، وتعكس النتائج شروط التقييم ولا تقيس وفورات مالية أو تضمن أداءً مماثلًا في كل بيئة", "Verification testing covered 148 real field images, with 94 correctly accepted images out of 100 after 10 supervisor approvals; results reflect evaluation conditions, not measured financial savings or guaranteed performance in every environment")}</p>
          </Reveal>
          <div className={styles.metricCards}>
            <Reveal className={`${styles.metricCard} ${styles.metricFeatured}`}><span className={styles.metricLabel}>{t("القبول الصحيح للصور", "CORRECT IMAGE ACCEPTANCE")}</span><Count value={94} suffix="%" /><p>{t("بعد 10 اعتمادات من المشرف وفق شروط التقييم", "after 10 supervisor approvals under evaluation conditions")}</p></Reveal>
            <Reveal className={styles.metricCard} delay={100}><span className={styles.metricLabel}>{t("صور اختبار القبول", "ACCEPTANCE TEST IMAGES")}</span><Count value={100} /><p>{t("صورة في نتيجة القبول المسجلة", "images in the recorded acceptance result")}</p></Reveal>
            <Reveal className={styles.metricCard} delay={180}><span className={styles.metricLabel}>{t("مراحل العمل", "WORKFLOW STAGES")}</span><Count value={4} /><p>{t("من تسجيل الموقع إلى قرار المشرف", "from field check-in to the supervisor decision")}</p></Reveal>
          </div>
        </div>
      </section>

      {/* 04 — BENEFITS: large editorial photographic stories */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <Reveal className={styles.benefitsHeader}>
            <span className={styles.eyebrow}>{t("كفاءة العمليات", "OPERATIONAL EFFICIENCY")}</span>
            <h2>{t("التوثيق والمراجعة", "Documentation and review")}<span>{t("وإدارة التكاليف", "Cost management")}</span></h2>
            <p>{t("تتيح الأدلة المركزية مراجعة العمل عن بُعد وتوجيه الزيارات للحالات التي تستدعي الفحص، بما يساعد في ترشيد الإنفاق والتنسيق بين المقاول والمشرف ومالك المشروع", "Centralized evidence supports remote review and helps direct visits to cases requiring inspection, enabling cost control and coordination between contractors, supervisors, and project owners")}</p>
          </Reveal>
          <div className={styles.benefitStories}>
            {benefits.map((item, index) => {
              const content = ar ? item.ar : item.en;
              return (
                <Reveal className={`${styles.benefitStory} ${index % 2 ? styles.benefitReverse : ""}`} key={item.number}>
                  <div className={styles.benefitPhoto}><Image src={item.image} alt={content.title} /><span className={styles.benefitImageIndex}>{item.number} / 03</span></div>
                  <div className={styles.benefitCopy}><span className={styles.storyNumber}>{item.number}</span><span className={styles.storyEyebrow}>{content.eyebrow}</span><h3>{content.title}</h3><p>{content.desc}</p><span className={styles.storyUnderline} /></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 — SECTORS: editorial photographic showcase, no drawn maps */}
      <section className={styles.sectorsSection}>
        <div className={styles.container}>
          <Reveal className={styles.sectorsHeader}>
            <div><span className={styles.eyebrow}>{t("مجالات الاستخدام", "APPLICATION AREAS")}</span><h2>{t("القطاعات المستفيدة", "Beneficiary sectors")}<span>{t("في البنية التحتية", "Infrastructure operations")}</span></h2></div>
            <p>{t("تدعم وظائف التوثيق والمراجعة احتياجات الجهات في قطاعات الكهرباء والمياه والاتصالات والبلديات، بحسب اختصاص كل جهة وصلاحيات مستخدميها", "Documentation and review functions support electricity, water, telecommunications, and municipal responsibilities according to each organization’s remit and user permissions")}</p>
          </Reveal>
          <div className={styles.sectorTabs} role="group" aria-label={t("اختر القطاع", "Choose a sector")}>
            {sectors.map((item) => <button type="button" key={item.id} className={`${styles.sectorTab} ${activeSector === item.id ? styles.sectorTabActive : ""}`} aria-pressed={activeSector === item.id} onClick={() => setActiveSector(item.id)}>{ar ? item.ar.name : item.en.name}</button>)}
          </div>
          <div className={styles.sectorShowcase} key={active.id}>
            <div className={styles.sectorShowcaseImage}><Image src={active.image} alt={activeText.name} /><div className={styles.sectorImageShade} /><span className={styles.sectorImageText}>{activeText.name}</span></div>
            <div className={styles.sectorShowcaseContent}>
              <span className={styles.sectorSmall}>{t("الاستخدام القطاعي", "SECTOR APPLICATION")}</span>
              {active.logo && <img className={styles.sectorLogo} src={active.logo} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />}
              <h3>{activeText.title}</h3><p>{activeText.description}</p>
              <a href={active.url} target="_blank" rel="noopener noreferrer">{t("عرض واجهة القطاع", "View sector workspace")}<ArrowUpRight size={19} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CLOSING */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <Reveal className={styles.closingInner}><div><span className={styles.closingEyebrow}>{t("الأعمال الموحّدة", "UNIFIED WORKS")}</span><h2>{t("وظائف المنصة", "Platform functions")}<span>{t("للجهات والشركات", "For organizations")}</span></h2></div><a href="/platform">{t("عرض المنصة", "View the platform")}<ArrowUpRight size={19} /></a></Reveal>
        </div>
      </section>
    </main>
  );
}
