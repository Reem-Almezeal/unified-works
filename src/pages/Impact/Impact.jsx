

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import styles from "./Impact.module.css";

const IMG = "/images/impact/";
const ORG = "/images/organizations/";

const sectors = [
  { id: "energy", logo: `${ORG}saudi-energy.png`, image: `${IMG}impact-energy.webp`, url: "https://uw.81-208-191-204.sslip.io/p/el/#dash", ar: { name: "الطاقة والكهرباء", title: "متابعة أعمال الشبكات الكهربائية", description: "توثيق الأعمال الميدانية وربط سجلات التنفيذ بمواقعها، لتصبح مراجعة أعمال الشبكات أكثر وضوحًا" }, en: { name: "Energy & electricity", title: "Visibility across electrical works", description: "Link field evidence and execution records to their locations for clearer oversight of electrical networks" } },
  { id: "water", logo: `${ORG}water.png`, image: `${IMG}impact-water.webp`, url: "https://uw.81-208-191-204.sslip.io/p/wa/#dash", ar: { name: "المياه والصرف الصحي", title: "سجل متصل لأعمال المياه والصرف", description: "جمع الصور والملاحظات الميدانية لأعمال المياه والصرف الصحي في سياق مكاني واضح وقابل للمراجعة" }, en: { name: "Water & wastewater", title: "Connected records for water works", description: "Bring water and wastewater field images and observations into a clear, reviewable location context" } },
  { id: "telecom", logo: `${ORG}telecom.png`, image: `${IMG}impact-telecom.webp`, url: "https://uw.81-208-191-204.sslip.io/p/tc/#dash", ar: { name: "الاتصالات", title: "متابعة أوضح لأعمال الاتصالات", description: "تجميع أدلة التنفيذ الميداني وربطها بمواقع الأعمال لتسهيل مراجعة أعمال شبكات الاتصالات" }, en: { name: "Telecommunications", title: "Clearer telecom work oversight", description: "Connect field evidence with work locations to simplify the review of telecommunications network activity" } },
  { id: "municipality", logo: `${ORG}municipality.png`, image: `${IMG}impact-municipality.webp`, url: "https://uw.81-208-191-204.sslip.io/muni#query", ar: { name: "الأمانات والبلديات", title: "رؤية أشمل للأعمال داخل المدينة", description: "دعم متابعة مواقع أعمال البنية التحتية والملاحظات المرتبطة بها، بما يعزز التنسيق بين الجهات" }, en: { name: "Municipal authorities", title: "A wider view of city works", description: "Support oversight of infrastructure worksites and related observations, helping stakeholders coordinate" } },
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
    { number: "01", image: `${IMG}impact-documentation.webp`, ar: { eyebrow: "توثيق مرتبط بالواقع", title: "توثيق ميداني موحد", desc: "بدل أن تبقى الصور والملاحظات موزعة بين قنوات مختلفة، تصبح جزءًا من سجل مرتبط بالعمل وموقعه ويمكن الرجوع إليه عند الحاجة" }, en: { eyebrow: "Evidence with context", title: "Unified Field Documentation", desc: "Instead of leaving photos and observations scattered across channels, keep them connected to the work and its location in a traceable record" } },
    { number: "02", image: `${IMG}impact-ai-validation.webp`, ar: { eyebrow: "مراجعة أكثر كفاءة", title: "مراجعة أكثر كفاءة", desc: "تساعد المراجعة المدعومة بالذكاء الاصطناعي في تنظيم الأدلة المرئية وإبراز ما يحتاج إلى تدقيق بشري، دون استبدال دور المسؤول عن القرار" }, en: { eyebrow: "More focused review", title: "More Efficient Review", desc: "AI-assisted review helps organize visual evidence and highlight what may need human attention, without replacing the decision-maker" } },
    { number: "03", image: `${IMG}impact-after.webp`, ar: { eyebrow: "رؤية تدعم القرار", title: "متابعة تدعم القرار", desc: "عندما تتصل السجلات بالمواقع والملاحظات، يصبح من الأسهل متابعة الأعمال ومراجعة حالتها والتنسيق حول الخطوات التالية" }, en: { eyebrow: "Decision-ready visibility", title: "Decision-Ready Oversight", desc: "When records connect to locations and observations, stakeholders can more easily review progress and coordinate next steps" } },
  ];

  return (
    <main className={styles.page} dir={ar ? "rtl" : "ltr"}>
      {/* 01 — HERO: same side-by-side composition as other pages */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <span className={styles.eyebrow}>UNIFIED WORKS / {t("الأثر", "IMPACT")}</span>
              <h1>{t("أثر يتجاوز الميدان", "Impact Beyond the Field")}<span>{t("من التوثيق إلى القرار", "From Documentation to Decisions")}</span></h1>
              <p>{t("لأن جودة متابعة البنية التحتية لا تعتمد على تنفيذ الأعمال وحده، بل على وضوح ما يحدث في الميدان، وإمكانية توثيقه ومراجعته والتنسيق بشأنه", "Because better infrastructure oversight is not only about completing the work. It is about making field activity visible, traceable and easier to coordinate")}</p>
              <a href="#impact-value" className={styles.primaryLink}>{t("اكتشف قيمة المنصة", "Discover the value")}<ArrowDown size={17} /></a>
            </Reveal>
            <Reveal className={styles.heroImageWrap} delay={130}>
              <Image src={`${IMG}impact-hero.webp`} alt={t("أعمال البنية التحتية في الميدان", "Infrastructure field operations")} className={styles.heroImage} eager />
              <div className={styles.heroImageCaption}><span className={styles.captionLine} />{t("من الموقع إلى الرؤية الشاملة", "FROM FIELD TO VISIBILITY")}</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — THE WHY: editorial impact statement + refined cards */}
      <section className={styles.whySection} id="impact-value">
        <div className={styles.container}>
          <Reveal className={styles.whyHeading}>
            <span className={styles.eyebrow}>{t("لماذا يهم؟", "WHY IT MATTERS")}</span>
            <h2>{t("متابعة موحدة للأعمال الميدانية", "Unified Field Oversight")}<span>{t("بيانات مترابطة ورؤية أوضح", "Connected Data and Clarity")}</span></h2>
          </Reveal>
          <div className={styles.whyLayout}>
            <Reveal className={styles.whyPhoto}>
              <Image src={`${IMG}impact-regulator.webp`} alt={t("متابعة أعمال البنية التحتية", "Infrastructure operations oversight")} />
              <div className={styles.photoBottomText}>{t("رؤية واحدة لأعمال متعددة", "ONE VIEW. MULTIPLE OPERATIONS")}</div>
            </Reveal>
            <div className={styles.whyCards}>
              <Reveal className={styles.whyCard} delay={80}>
                <span className={styles.cardIndex}>01 / {t("التحدي", "THE CHALLENGE")}</span>
                <h3>{t("تشتت البيانات الميدانية", "Fragmented Field Data")}</h3>
                <p>{t("صور وملاحظات ومواقع وأطراف متعددة، دون سياق موحد يسهل الرجوع إليه", "Photos, observations, locations and stakeholders without a shared context")}</p>
              </Reveal>
              <Reveal className={`${styles.whyCard} ${styles.whyCardAccent}`} delay={150}>
                <span className={styles.cardIndex}>02 / {t("الفرصة", "THE OPPORTUNITY")}</span>
                <h3>{t("توثيق ومتابعة مترابطة", "Connected Documentation & Oversight")}</h3>
                <p>{t("تجمع المنصة الأدلة الميدانية في مسار منظم يدعم وضوح الحالة والتنسيق", "Bring field evidence into a structured workflow that supports visibility and coordination")}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — VALIDATION: compact, premium metrics */}
      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <Reveal className={styles.metricsTop}>
            <div><span className={styles.eyebrow}>{t("نتائج تجربة التحقق", "VALIDATION EXPERIMENT")}</span><h2>{t("كفاءة التحقق التقني", "Technical Verification")}</h2></div>
            <p>{t("أظهرت تجربة التحقق الأولية قبول 94 صورة من أصل 100 صورة جرى اختبارها لدعم مراجعة التوثيق الميداني", "The initial verification experiment recorded 94 accepted images out of 100 tested to support field documentation review")}</p>
          </Reveal>
          <div className={styles.metricCards}>
            <Reveal className={`${styles.metricCard} ${styles.metricFeatured}`}><span className={styles.metricLabel}>{t("نسبة القبول في التجربة", "EXPERIMENT ACCEPTANCE")}</span><Count value={94} suffix="%" /><p>{t("من الصور المقبولة ضمن التجربة", "of images accepted during the experiment")}</p></Reveal>
            <Reveal className={styles.metricCard} delay={100}><span className={styles.metricLabel}>{t("حجم العينة", "SAMPLE SIZE")}</span><Count value={100} /><p>{t("صورة ضمن تجربة التحقق", "images in the validation experiment")}</p></Reveal>
            <Reveal className={styles.metricCard} delay={180}><span className={styles.metricLabel}>{t("مراحل العمل", "WORKFLOW")}</span><Count value={4} /><p>{t("مراحل مترابطة من التوثيق إلى المراجعة", "connected stages from capture to review")}</p></Reveal>
          </div>
        </div>
      </section>

      {/* 04 — BENEFITS: large editorial photographic stories */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <Reveal className={styles.benefitsHeader}>
            <span className={styles.eyebrow}>{t("القيمة التشغيلية", "OPERATIONAL VALUE")}</span>
            <h2>{t("قيمة تشغيلية", "Operational Value")}<span>{t("ملموسة في الميدان", "Across Field Operations")}</span></h2>
            <p>{t("ثلاث قيم أساسية تنقل التوثيق من مهمة منفصلة إلى جزء من منظومة المتابعة", "Three ways to turn documentation from an isolated task into part of connected oversight")}</p>
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
            <div><span className={styles.eyebrow}>{t("القطاعات المستفيدة", "SECTOR IMPACT")}</span><h2>{t("حلول لمختلف القطاعات", "Solutions Across Sectors")}<span>{t("متابعة متكاملة", "Connected Oversight")}</span></h2></div>
            <p>{t("تختلف طبيعة الأعمال بين الجهات، لكن الحاجة إلى توثيق واضح ومتابعة مترابطة تجمعها", "Different sectors face different field challenges, but all benefit from clearer records and connected oversight")}</p>
          </Reveal>
          <div className={styles.sectorTabs} role="group" aria-label={t("اختر القطاع", "Choose a sector")}>
            {sectors.map((item) => <button type="button" key={item.id} className={`${styles.sectorTab} ${activeSector === item.id ? styles.sectorTabActive : ""}`} aria-pressed={activeSector === item.id} onClick={() => setActiveSector(item.id)}>{ar ? item.ar.name : item.en.name}</button>)}
          </div>
          <div className={styles.sectorShowcase} key={active.id}>
            <div className={styles.sectorShowcaseImage}><Image src={active.image} alt={activeText.name} /><div className={styles.sectorImageShade} /><span className={styles.sectorImageText}>{activeText.name}</span></div>
            <div className={styles.sectorShowcaseContent}>
              <span className={styles.sectorSmall}>{t("أثر القطاع", "SECTOR VALUE")}</span>
              {active.logo && <img className={styles.sectorLogo} src={active.logo} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />}
              <h3>{activeText.title}</h3><p>{activeText.description}</p>
              <a href={active.url} target="_blank" rel="noopener noreferrer">{t("استعرض واجهة القطاع", "Explore the sector portal")}<ArrowUpRight size={19} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CLOSING */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <Reveal className={styles.closingInner}><div><span className={styles.closingEyebrow}>UNIFIED WORKS</span><h2>{t("وضوح أكبر", "Clearer Insights")}<span>{t("قرارات أفضل", "Better Decisions")}</span></h2></div><a href="/platform">{t("تعرّف على المنصة", "Explore the platform")}<ArrowUpRight size={19} /></a></Reveal>
        </div>
      </section>
    </main>
  );
}
