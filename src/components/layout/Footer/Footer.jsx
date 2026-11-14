
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import styles from "./Footer.module.css";

const portals = [
  {
    key: "regulator",
    url: "https://uw.81-208-191-204.sslip.io/#dash",
  },
  {
    key: "electricity",
    url: "https://uw.81-208-191-204.sslip.io/p/el/#dash",
  },
  {
    key: "water",
    url: "https://uw.81-208-191-204.sslip.io/p/wa/#dash",
  },
  {
    key: "telecom",
    url: "https://uw.81-208-191-204.sslip.io/p/tc/#dash",
  },
  {
    key: "municipality",
    url: "https://uw.81-208-191-204.sslip.io/muni#query",
  },
];

const translations = {
  ar: {
    description:
      "منصة ذكية لتوثيق أعمال البنية التحتية ومتابعتها، وتعزيز التنسيق بين الجهات المعنية ورفع جودة التنفيذ",
    pages: "روابط الموقع",
    portals: "بوابات المنصة",
    contact: "التواصل والتعاون",
    navigation: [
      { label: "الرئيسية", to: "/" },
      { label: "المنصة", to: "/platform" },
      { label: "التقنية", to: "/technology" },
      { label: "الأثر", to: "/impact" },
      { label: "من نحن", to: "/about" },
    ],
    portalNames: {
      regulator: "الجهة التنظيمية",
      electricity: "قطاع الكهرباء",
      water: "قطاع المياه",
      telecom: "قطاع الاتصالات",
      municipality: "الأمانات والبلديات",
    },
    contactText:
      "لديك فكرة للتعاون أو ترغب في مناقشة شراكة؟ يسعدنا التواصل معك",
    contactButton: "تواصل معنا",
    copyright: "جميع الحقوق محفوظة",
    country: "المملكة العربية السعودية",
    backTop: "العودة للأعلى",
  },

  en: {
    description:
      "An intelligent platform for documenting infrastructure works, improving stakeholder coordination, and enhancing execution quality",
    pages: "Quick links",
    portals: "Platform portals",
    contact: "Connect with us",
    navigation: [
      { label: "Home", to: "/" },
      { label: "Platform", to: "/platform" },
      { label: "Technology", to: "/technology" },
      { label: "Impact", to: "/impact" },
      { label: "About us", to: "/about" },
    ],
    portalNames: {
      regulator: "Regulatory portal",
      electricity: "Electricity",
      water: "Water",
      telecom: "Telecommunications",
      municipality: "Municipalities",
    },
    contactText:
      "Have a collaboration idea or partnership opportunity? We'd love to hear from you",
    contactButton: "Get in touch",
    copyright: "All rights reserved",
    country: "Saudi Arabia",
    backTop: "Back to top",
  },
};

export default function Footer() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const t = isArabic ? translations.ar : translations.en;
  const year = new Date().getFullYear();

  return (
    <footer
      className={styles.footer}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={styles.container}>
        <div className={styles.footerMain}>
          {/* BRAND */}
          <div className={styles.brand}>
            <Link to="/" className={styles.brandIdentity}>
              <img
                src="/images/unified-works-logo.png"
                alt=""
                className={styles.logo}
              />
              <div className={styles.brandName}>
                <strong>
                  {isArabic ? "الأعمال الموحّدة" : "Unified Works"}
                </strong>
                <span>
                  {isArabic
                    ? "ذكاء العمليات الميدانية"
                    : "Intelligent Field Operations"}
                </span>
              </div>
            </Link>

            <p>{t.description}</p>
            <span className={styles.brandLocation}>
              {t.country}
            </span>
          </div>

          {/* SITE LINKS */}
          <div className={styles.column}>
            <h3>{t.pages}</h3>
            <nav aria-label={t.pages}>
              {t.navigation.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* PORTALS */}
          <div className={styles.column}>
            <h3>{t.portals}</h3>
            <nav aria-label={t.portals}>
              {portals.map((portal) => (
                <a
                  key={portal.key}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.portalNames[portal.key]}
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div className={`${styles.column} ${styles.contactColumn}`}>
            <h3>{t.contact}</h3>
            <p>{t.contactText}</p>
            <Link to="/contact" className={styles.contactLink}>
              <span>{t.contactButton}</span>
              <span aria-hidden="true"><ArrowUpRight className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
            </Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>
            © {year} Unified Works — {t.copyright}
          </span>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className={styles.backTop}
          >
            {t.backTop}
            <span aria-hidden="true"><ArrowUp className={styles.arrowIcon} size="1em" strokeWidth={1.8} aria-hidden="true" focusable="false" /></span>
          </button>
        </div>
      </div>
    </footer>
  );
}
