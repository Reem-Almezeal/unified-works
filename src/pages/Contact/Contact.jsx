
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Contact.module.css";

const content = {
  ar: {
    eyebrow: "UNIFIED WORKS / CONTACT",
    heroTitle: "لنبدأ",
    heroAccent: "حوارًا يصنع أثرًا",
    heroDescription:
      "سواء كنت تمثل جهة تبحث عن شراكة، أو ترغب في التعاون معنا، أو لديك استفسار حول الأعمال الموحّدة، يسعدنا التعرف على احتياجك ومناقشة الفرص الممكنة",
    heroIndex: "التواصل يبدأ من هنا",

    introLabel: "01 — مجالات التواصل",
    introTitle: "كيف يمكننا",
    introAccent: "العمل معًا؟",
    introText:
      "اختر المجال الأقرب لطلبك، وسنساعدك في توجيه رسالتك إلى المسار المناسب",

    types: [
      {
        id: "partnership",
        number: "01",
        en: "PARTNERSHIPS",
        title: "الشراكات الاستراتيجية",
        subtitle: "نبني فرصًا مشتركة",
        description:
          "للتعاون مع الجهات الحكومية والخاصة، ومشغلي البنية التحتية، والشركات المهتمة بتطوير حلول الأعمال الميدانية",
      },
      {
        id: "business",
        number: "02",
        en: "BUSINESS",
        title: "التعاون والأعمال",
        subtitle: "نحو فرص جديدة",
        description:
          "لمناقشة فرص التعاون المهني، وتطوير الحلول، والمبادرات والمشاريع المرتبطة بالمنصة",
      },
      {
        id: "inquiry",
        number: "03",
        en: "INQUIRIES",
        title: "الاستفسارات العامة",
        subtitle: "نحن هنا للإجابة",
        description:
          "للاستفسار عن فكرة المنصة أو آلية عملها أو إمكانياتها ومجالات استخدامها",
      },
    ],

    formLabel: "02 — أرسل رسالتك",
    formTitle: "أخبرنا عن",
    formAccent: "فرصتك أو استفسارك",
    formDescription:
      "شاركنا التفاصيل الأساسية لنتمكن من فهم طلبك والتواصل معك بشكل مناسب",
    formSideLabel: "LET'S CONNECT",
    formSideTitle: "الأفكار الجيدة تبدأ بحوار واضح",
    formSideText:
      "نرحب بالجهات والأفراد المهتمين بتطوير بيئة أكثر ترابطًا وكفاءة لأعمال البنية التحتية",
    formSideBottom: "UNIFIED WORKS / BUSINESS RELATIONS",

    name: "الاسم الكامل",
    email: "البريد الإلكتروني للعمل",
    organization: "الجهة أو الشركة",
    position: "المسمى الوظيفي",
    phone: "رقم التواصل",
    subject: "موضوع الرسالة",
    type: "نوع التواصل",
    message: "تفاصيل الطلب",
    namePlaceholder: "اكتب اسمك الكامل",
    emailPlaceholder: "name@company.com",
    organizationPlaceholder: "اسم الجهة أو الشركة",
    positionPlaceholder: "مثال: مدير تطوير الأعمال",
    phonePlaceholder: "+966 5X XXX XXXX",
    subjectPlaceholder: "عنوان مختصر للطلب",
    messagePlaceholder:
      "عرّفنا بطلبك، والجهة التي تمثلها، وما الذي ترغب في مناقشته معنا",
    optional: "اختياري",
    required: "مطلوب",
    selectType: "اختر نوع التواصل",
    consent:
      "أوافق على استخدام بياناتي للتواصل معي بخصوص هذا الطلب",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال",
    success: "تم إرسال طلبك بنجاح",
    successDescription:
      "شكرًا لتواصلك معنا، تم استلام رسالتك",
    newMessage: "إرسال رسالة أخرى",
    error:
      "تعذر إرسال الطلب حاليًا، يرجى المحاولة مرة أخرى لاحقًا",
    configError:
      "نموذج التواصل غير متصل بخدمة استقبال الرسائل حاليًا",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    invalidName: "يرجى إدخال الاسم الكامل",
    invalidSubject: "يرجى كتابة موضوع الرسالة",
    invalidMessage: "يرجى كتابة تفاصيل الطلب",
    invalidConsent: "يرجى الموافقة على استخدام البيانات للتواصل",

    closingLabel: "LET'S BUILD SOMETHING MEANINGFUL",
    closingTitle: "شراكات أقوى",
    closingAccent: "وأثر يمتد للميدان",
    closingText:
      "نؤمن بأن التعاون بين الجهات والخبرات هو أساس تطوير حلول عملية ومستدامة",
  },

  en: {
    eyebrow: "UNIFIED WORKS / CONTACT",
    heroTitle: "Let's start",
    heroAccent: "a meaningful conversation",
    heroDescription:
      "Whether you represent an organization exploring a partnership, are interested in business collaboration, or have a question about Unified Works, we'd be glad to hear from you",
    heroIndex: "Your conversation starts here",

    introLabel: "01 — GET IN TOUCH",
    introTitle: "How can we",
    introAccent: "work together?",
    introText:
      "Choose the area that best describes your request so we can understand your interests",

    types: [
      {
        id: "partnership",
        number: "01",
        en: "PARTNERSHIPS",
        title: "Strategic partnerships",
        subtitle: "Creating shared opportunities",
        description:
          "For public and private organizations, infrastructure operators, and companies interested in collaborative field operations solutions",
      },
      {
        id: "business",
        number: "02",
        en: "BUSINESS",
        title: "Business collaboration",
        subtitle: "Exploring new opportunities",
        description:
          "For professional collaboration, solution development, initiatives, and projects related to the platform",
      },
      {
        id: "inquiry",
        number: "03",
        en: "INQUIRIES",
        title: "General inquiries",
        subtitle: "We're here to help",
        description:
          "For questions about the platform, its concept, capabilities, and potential applications",
      },
    ],

    formLabel: "02 — SEND A MESSAGE",
    formTitle: "Tell us about",
    formAccent: "your opportunity",
    formDescription:
      "Share the essential details so we can understand your request and respond appropriately",
    formSideLabel: "LET'S CONNECT",
    formSideTitle: "Great ideas begin with meaningful conversations",
    formSideText:
      "We welcome organizations and individuals interested in more connected and efficient infrastructure operations",
    formSideBottom: "UNIFIED WORKS / BUSINESS RELATIONS",

    name: "Full name",
    email: "Work email",
    organization: "Organization or company",
    position: "Job title",
    phone: "Contact number",
    subject: "Subject",
    type: "Inquiry type",
    message: "Message details",
    namePlaceholder: "Your full name",
    emailPlaceholder: "name@company.com",
    organizationPlaceholder: "Organization name",
    positionPlaceholder: "e.g. Business Development Manager",
    phonePlaceholder: "+966 5X XXX XXXX",
    subjectPlaceholder: "Brief subject of your request",
    messagePlaceholder:
      "Tell us about your request, your organization, and what you would like to discuss",
    optional: "Optional",
    required: "Required",
    selectType: "Select inquiry type",
    consent:
      "I agree to the use of my information to respond to this inquiry",
    submit: "Send inquiry",
    sending: "Sending",
    success: "Your inquiry has been sent",
    successDescription:
      "Thank you for reaching out. Your message has been received",
    newMessage: "Send another message",
    error:
      "We couldn't send your inquiry. Please try again later",
    configError:
      "The contact form is not yet connected to a message service",
    invalidEmail: "Please enter a valid email address",
    invalidName: "Please enter your full name",
    invalidSubject: "Please enter a subject",
    invalidMessage: "Please enter your message",
    invalidConsent: "Please agree to be contacted about your request",

    closingLabel: "LET'S BUILD SOMETHING MEANINGFUL",
    closingTitle: "Stronger partnerships",
    closingAccent: "lasting field impact",
    closingText:
      "We believe collaboration across organizations and expertise is essential to building practical and sustainable solutions",
  },
};

const initialForm = {
  name: "",
  email: "",
  organization: "",
  position: "",
  phone: "",
  type: "partnership",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

export default function Contact() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const t = isArabic ? content.ar : content.en;

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    document.title = isArabic
      ? "تواصل معنا | الأعمال الموحّدة"
      : "Contact Us | Unified Works";
  }, [isArabic]);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const selectType = (type) => {
    updateField("type", type);
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const errors = {};

    if (form.name.trim().length < 2) {
      errors.name = t.invalidName;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = t.invalidEmail;
    }

    if (!form.subject.trim()) {
      errors.subject = t.invalidSubject;
    }

    if (form.message.trim().length < 10) {
      errors.message = t.invalidMessage;
    }

    if (!form.consent) {
      errors.consent = t.invalidConsent;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    // Honeypot field for basic spam filtering.
    if (form.website) return;

    const endpoint = import.meta.env.VITE_CONTACT_API_URL;

    if (!endpoint) {
      setStatus("error");
      setErrorMessage(t.configError);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          position: form.position.trim(),
          phone: form.phone.trim(),
          type: form.type,
          subject: form.subject.trim(),
          message: form.message.trim(),
          consent: form.consent,
          source: "unified-works-contact",
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrorMessage(t.error);
    }
  };

  return (
    <main
      className={styles.contact}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroMeta}>
            <span>{t.eyebrow}</span>
            <span>2026 / CONTACT</span>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroHeading}>
              <span className={styles.heroNumber}>UW / 02</span>
              <h1>
                {t.heroTitle}
                <span>{t.heroAccent}</span>
              </h1>
            </div>

            <div className={styles.heroDescription}>
              <p>{t.heroDescription}</p>
              <a href="#contact-options" className={styles.heroLink}>
                <span>{t.heroIndex}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <span>UNIFIED WORKS</span>
            <span>BUSINESS / PARTNERSHIPS / INQUIRIES</span>
          </div>
        </div>
      </section>

      {/* CONTACT CATEGORIES */}
      <section
        id="contact-options"
        className={styles.optionsSection}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>
                {t.introLabel}
              </span>
              <h2>
                {t.introTitle}
                <span>{t.introAccent}</span>
              </h2>
            </div>
            <p>{t.introText}</p>
          </div>

          <div className={styles.optionsGrid}>
            {t.types.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.optionCard} ${
                  form.type === item.id
                    ? styles.optionCardActive
                    : ""
                }`}
                onClick={() => selectType(item.id)}
              >
                <span className={styles.optionTop}>
                  <span>{item.number}</span>
                  <span>{item.en}</span>
                </span>

                <span className={styles.optionContent}>
                  <strong>{item.title}</strong>
                  <span className={styles.optionSubtitle}>
                    {item.subtitle}
                  </span>
                  <span className={styles.optionDetail}>
                    {item.description}
                  </span>
                </span>

                <span className={styles.optionBottom}>
                  <span>
                    {form.type === item.id ? "SELECTED" : "EXPLORE"}
                  </span>
                  <span aria-hidden="true">↗</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formHeading}>
            <span className={styles.eyebrow}>
              {t.formLabel}
            </span>
            <h2>
              {t.formTitle}
              <span>{t.formAccent}</span>
            </h2>
            <p>{t.formDescription}</p>
          </div>

          <div className={styles.formLayout}>
            <aside className={styles.formAside}>
              <div className={styles.asideTop}>
                <span>{t.formSideLabel}</span>
                <span>UW / CONTACT</span>
              </div>

              <div className={styles.asideContent}>
                <h3>{t.formSideTitle}</h3>
                <p>{t.formSideText}</p>
              </div>

              <div className={styles.asideBottom}>
                <span>UNIFIED WORKS</span>
                <span>{t.formSideBottom}</span>
              </div>
            </aside>

            <div className={styles.formPanel}>
              {status === "success" ? (
                <div className={styles.successState} role="status">
                  <span className={styles.successMark}>✓</span>
                  <h3>{t.success}</h3>
                  <p>{t.successDescription}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm(initialForm);
                      setFieldErrors({});
                    }}
                    className={styles.resetButton}
                  >
                    {t.newMessage}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.formTop}>
                    <span>CONTACT REQUEST</span>
                    <span>01 / FORM</span>
                  </div>

                  <div className={styles.fieldsGrid}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name">
                        {t.name}
                        <span>*</span>
                      </label>
                      <input
                        id="contact-name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          updateField("name", e.target.value)
                        }
                        placeholder={t.namePlaceholder}
                        aria-invalid={!!fieldErrors.name}
                        required
                      />
                      {fieldErrors.name && (
                        <small className={styles.fieldError}>
                          {fieldErrors.name}
                        </small>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-email">
                        {t.email}
                        <span>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                        placeholder={t.emailPlaceholder}
                        aria-invalid={!!fieldErrors.email}
                        required
                      />
                      {fieldErrors.email && (
                        <small className={styles.fieldError}>
                          {fieldErrors.email}
                        </small>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-organization">
                        {t.organization}
                        <small>{t.optional}</small>
                      </label>
                      <input
                        id="contact-organization"
                        value={form.organization}
                        onChange={(e) =>
                          updateField(
                            "organization",
                            e.target.value
                          )
                        }
                        placeholder={t.organizationPlaceholder}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-position">
                        {t.position}
                        <small>{t.optional}</small>
                      </label>
                      <input
                        id="contact-position"
                        value={form.position}
                        onChange={(e) =>
                          updateField("position", e.target.value)
                        }
                        placeholder={t.positionPlaceholder}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-phone">
                        {t.phone}
                        <small>{t.optional}</small>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                        placeholder={t.phonePlaceholder}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-type">
                        {t.type}
                        <span>*</span>
                      </label>
                      <select
                        id="contact-type"
                        value={form.type}
                        onChange={(e) =>
                          updateField("type", e.target.value)
                        }
                      >
                        {t.types.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={`${styles.field} ${styles.fullWidth}`}>
                      <label htmlFor="contact-subject">
                        {t.subject}
                        <span>*</span>
                      </label>
                      <input
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) =>
                          updateField("subject", e.target.value)
                        }
                        placeholder={t.subjectPlaceholder}
                        aria-invalid={!!fieldErrors.subject}
                        required
                      />
                      {fieldErrors.subject && (
                        <small className={styles.fieldError}>
                          {fieldErrors.subject}
                        </small>
                      )}
                    </div>

                    <div className={`${styles.field} ${styles.fullWidth}`}>
                      <label htmlFor="contact-message">
                        {t.message}
                        <span>*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={6}
                        value={form.message}
                        onChange={(e) =>
                          updateField("message", e.target.value)
                        }
                        placeholder={t.messagePlaceholder}
                        aria-invalid={!!fieldErrors.message}
                        required
                      />
                      {fieldErrors.message && (
                        <small className={styles.fieldError}>
                          {fieldErrors.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div
                    className={styles.honeypot}
                    aria-hidden="true"
                  >
                    <label htmlFor="contact-website">
                      Website
                    </label>
                    <input
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) =>
                        updateField("website", e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.consentRow}>
                    <label>
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) =>
                          updateField(
                            "consent",
                            e.target.checked
                          )
                        }
                      />
                      <span>{t.consent}</span>
                    </label>
                    {fieldErrors.consent && (
                      <small className={styles.fieldError}>
                        {fieldErrors.consent}
                      </small>
                    )}
                  </div>

                  {status === "error" && (
                    <p className={styles.submitError} role="alert">
                      {errorMessage}
                    </p>
                  )}

                  <div className={styles.submitRow}>
                    <span>UNIFIED WORKS / CONTACT</span>
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={status === "sending"}
                    >
                      <span>
                        {status === "sending"
                          ? t.sending
                          : t.submit}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className={styles.closing}>
        <div className={styles.container}>
          <span className={styles.closingEyebrow}>
            {t.closingLabel}
          </span>
          <h2>
            {t.closingTitle}
            <span>{t.closingAccent}</span>
          </h2>
          <p>{t.closingText}</p>
          <span className={styles.closingBrand}>
            UNIFIED WORKS
          </span>
        </div>
      </section>
    </main>
  );
}
