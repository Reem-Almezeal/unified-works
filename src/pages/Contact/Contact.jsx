
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import styles from "./Contact.module.css";

const content = {
  ar: {
    eyebrow: "الاعمال الموحد / التواصل",
    heroTitle: "تواصل",
    heroAccent: "معنا",
    heroDescription:
      "للتواصل مع فريق الاعمال الموحد بشأن وظائف المنصة، وطلبات العروض التوضيحية، والاستفسارات الفنية والتشغيلية، وفرص التعاون مع الجهات والشركات والأفراد",
    heroIndex: "عرض مجالات التواصل",

    introLabel: "01 — مجالات التواصل",
    introTitle: "مجالات",
    introAccent: "التواصل",
    introText:
      "حدد نوع الطلب من المجالات التالية، ويُدرج اختيارك في نموذج التواصل",

    types: [
      {
        id: "partnership",
        number: "01",
        en: "التعاون",
        title: "التعاون والشراكات",
        subtitle: "استفسارات التعاون المؤسسي",
        description:
          "للجهات الحكومية والخاصة ومالكي المشروعات ومشغلي المرافق الراغبين في مناقشة تعاون محتمل يتعلق بالتوثيق والإشراف على أعمال البنية التحتية",
      },
      {
        id: "business",
        number: "02",
        en: "العروض",
        title: "العروض التوضيحية",
        subtitle: "عرض وظائف المنصة",
        description:
          "لطلب عرض توضيحي ومناقشة متطلبات الجهة في التوثيق الميداني ومتابعة المقاولين ومراجعة جودة التنفيذ",
      },
      {
        id: "inquiry",
        number: "03",
        en: "الاستفسارات",
        title: "الاستفسارات العامة",
        subtitle: "معلومات فنية وتشغيلية",
        description:
          "للأسئلة المتعلقة بإمكانات المنصة وآلية استخدامها ومجالات تطبيقها ومتطلبات التوثيق ومراجعة الأعمال",
      },
    ],

    formLabel: "02 — تقديم الطلب",
    formTitle: "نموذج",
    formAccent: "التواصل",
    formDescription:
      "يرجى تعبئة الحقول المطلوبة وتوضيح موضوع الطلب والتفاصيل ذات الصلة، ويمكن إضافة بيانات الجهة والمسمى الوظيفي ورقم الهاتف اختياريًا",
    formSideLabel: "إرشادات الطلب",
    formSideTitle: "المعلومات المطلوبة",
    formSideText:
      "اذكر طبيعة الاستفسار أو العرض المطلوب، ونطاق الأعمال الميدانية واحتياجات الإشراف أو الجودة التي ترغب في مناقشتها",
    formSideBottom: "الاستفسارات والتعاون المؤسسي",

    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    organization: "الجهة أو الشركة",
    position: "المسمى الوظيفي",
    phone: "رقم الهاتف",
    subject: "موضوع الطلب",
    type: "نوع الطلب",
    message: "تفاصيل الطلب",
    namePlaceholder: "الاسم الكامل لمقدم الطلب",
    emailPlaceholder: "name@company.com",
    organizationPlaceholder: "اسم الجهة أو الشركة",
    positionPlaceholder: "المسمى الوظيفي لدى الجهة",
    phonePlaceholder: "+966 5X XXX XXXX",
    subjectPlaceholder: "عنوان مختصر للطلب",
    messagePlaceholder:
      "وضح الاستفسار أو العرض المطلوب والمتطلبات المرتبطة به",
    optional: "اختياري",
    required: "مطلوب",
    selectType: "اختر نوع الطلب",
    consent:
      "أوافق على استخدام بياناتي للرد على هذا الطلب",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال",
    success: "تم إرسال الطلب",
    successDescription:
      "يمكن إرسال طلب جديد للاستفسارات الإضافية المستقلة",
    newMessage: "تقديم طلب جديد",
    error:
      "تعذر إرسال الطلب حاليًا، يرجى المحاولة مرة أخرى لاحقًا",
    configError:
      "خدمة إرسال الطلبات غير متاحة حاليًا",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    invalidName: "يرجى إدخال اسم لا يقل عن حرفين",
    invalidSubject: "يرجى إدخال موضوع الطلب",
    invalidMessage: "يرجى كتابة تفاصيل الطلب بما لا يقل عن 10 أحرف",
    invalidConsent: "يرجى الموافقة على استخدام البيانات للرد على الطلب",

    closingLabel: "مجالات التعاون",
    closingTitle: "التعاون",
    closingAccent: "المؤسسي",
    closingText:
      "يمكن للجهات والشركات الاستفسار عن ملاءمة وظائف المنصة لمتطلباتها ومناقشة فرص التعاون المتعلقة بتوثيق الأعمال الميدانية والإشراف عليها",
  },

  en: {
    eyebrow: "Unified Works / CONTACT",
    heroTitle: "Contact",
    heroAccent: "us",
    heroDescription:
      "Contact the Unified Works team about platform capabilities, demonstration requests, technical and operational inquiries, or potential cooperation with organizations, companies, and individuals",
    heroIndex: "View contact categories",

    introLabel: "01 — CONTACT CATEGORIES",
    introTitle: "Inquiry",
    introAccent: "categories",
    introText:
      "Select a category below to set the request type in the contact form",

    types: [
      {
        id: "partnership",
        number: "01",
        en: "COOPERATION",
        title: "Cooperation and partnerships",
        subtitle: "Institutional cooperation inquiries",
        description:
          "For public and private organizations, project owners, and utility operators enquiring about potential cooperation in infrastructure documentation and supervision",
      },
      {
        id: "business",
        number: "02",
        en: "DEMONSTRATIONS",
        title: "Platform demonstrations",
        subtitle: "Review platform functions",
        description:
          "Request a demonstration and discuss organizational requirements for field documentation, contractor monitoring, and execution quality review",
      },
      {
        id: "inquiry",
        number: "03",
        en: "INQUIRIES",
        title: "General inquiries",
        subtitle: "Technical and operational information",
        description:
          "For questions about platform capabilities, use, application areas, and work documentation and review requirements",
      },
    ],

    formLabel: "02 — SUBMIT A REQUEST",
    formTitle: "Contact",
    formAccent: "form",
    formDescription:
      "Complete the required fields and provide the request subject and relevant details; organization, job title, and telephone information are optional",
    formSideLabel: "REQUEST GUIDANCE",
    formSideTitle: "Information to include",
    formSideText:
      "Specify the inquiry or demonstration requested, the scope of field operations, and the supervision or quality requirements you wish to discuss",
    formSideBottom: "INQUIRIES AND INSTITUTIONAL COOPERATION",

    name: "Full name",
    email: "Email address",
    organization: "Organization or company",
    position: "Job title",
    phone: "Telephone number",
    subject: "Request subject",
    type: "Request type",
    message: "Request details",
    namePlaceholder: "Applicant's full name",
    emailPlaceholder: "name@company.com",
    organizationPlaceholder: "Organization name",
    positionPlaceholder: "Your job title within the organization",
    phonePlaceholder: "+966 5X XXX XXXX",
    subjectPlaceholder: "Brief subject of your request",
    messagePlaceholder:
      "Describe the inquiry or demonstration requested and the relevant requirements",
    optional: "Optional",
    required: "Required",
    selectType: "Select request type",
    consent:
      "I agree to the use of my information to respond to this request",
    submit: "Submit request",
    sending: "Submitting",
    success: "Your request has been submitted",
    successDescription:
      "You can submit a separate request for additional inquiries",
    newMessage: "Submit another request",
    error:
      "The request could not be submitted, please try again later",
    configError:
      "The request submission service is currently unavailable",
    invalidEmail: "Please enter a valid email address",
    invalidName: "Please enter a name containing at least 2 characters",
    invalidSubject: "Please enter the request subject",
    invalidMessage: "Please provide request details containing at least 10 characters",
    invalidConsent: "Please consent to the use of your information to respond to the request",

    closingLabel: "COOPERATION AREAS",
    closingTitle: "Institutional",
    closingAccent: "cooperation",
    closingText:
      "Organizations and companies can inquire about the suitability of platform functions for their requirements and discuss potential cooperation in field documentation and supervision",
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
      ? "تواصل معنا | الاعمال الموحد"
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
            <span>{isArabic ? "2026 / التواصل" : "2026 / CONTACT"}</span>
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
                <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
              </a>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <span>{isArabic ? "الاعمال الموحد" : "Unified Works"}</span>
            <span>{isArabic ? "التعاون / العروض / الاستفسارات" : "COOPERATION / DEMONSTRATIONS / INQUIRIES"}</span>
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
                    {form.type === item.id
                      ? isArabic ? "محدد" : "SELECTED"
                      : isArabic ? "اختيار المجال" : "SELECT CATEGORY"}
                  </span>
                  <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
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
                <span>{isArabic ? "UW / التواصل" : "UW / CONTACT"}</span>
              </div>

              <div className={styles.asideContent}>
                <h3>{t.formSideTitle}</h3>
                <p>{t.formSideText}</p>
              </div>

              <div className={styles.asideBottom}>
                <span>{isArabic ? "الاعمال الموحد" : "Unified Works"}</span>
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
                    <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.formTop}>
                    <span>{isArabic ? "طلب تواصل" : "CONTACT REQUEST"}</span>
                    <span>{isArabic ? "01 / النموذج" : "01 / FORM"}</span>
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
                    <span>{t.eyebrow}</span>
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
                      <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
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
            {isArabic ? "الاعمال الموحد" : "Unified Works"}
          </span>
        </div>
      </section>
    </main>
  );
}
