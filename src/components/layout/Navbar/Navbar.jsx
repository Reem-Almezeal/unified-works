
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Languages, Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

const navigation = [
  { path: '/', en: 'Home', ar: 'الرئيسية', end: true },
  { path: '/platform', en: 'Platform', ar: 'المنصة' },
  { path: '/technology', en: 'Technology', ar: 'التقنية' },
  { path: '/impact', en: 'Impact', ar: 'الأثر' },
  { path: '/about', en: 'About Us', ar: 'من نحن' },
]

export default function Navbar() {
  const { i18n } = useTranslation()
  const location = useLocation()

  const ar = i18n.resolvedLanguage?.startsWith('ar')
    ?? i18n.language?.startsWith('ar')
    ?? false

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPathname, setMenuPathname] = useState(location.pathname)

  // Reset route-specific UI before rendering the new page.
  if (menuPathname !== location.pathname) {
    setMenuPathname(location.pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false)
    }

    window.addEventListener('keydown', onEscape)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onEscape)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const changeLanguage = () => {
    i18n.changeLanguage(ar ? 'en' : 'ar')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      dir={ar ? 'rtl' : 'ltr'}
    >
      <div className={styles.container}>

        {/* LOGO */}
        <Link
          to="/"
          className={styles.brand}
          onClick={closeMenu}
          aria-label={ar ? 'الاعمال الموحد - الرئيسية' : 'Unified Works - Home'}
        >
          <img
            className={styles.logo}
            src="/images/unified-works-logo.png"
            alt=""
          />

          <div className={styles.brandText}>
            <strong>
              {ar ? 'الاعمال الموحد' : 'Unified Works'}
            </strong>

          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className={styles.desktopNav}
          aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {ar ? item.ar : item.en}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.languageButton}
            onClick={changeLanguage}
            aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Languages size={17} strokeWidth={1.8} />
            <span>{ar ? 'EN' : 'AR'}</span>
          </button>

          <Link to="/contact" className={styles.contactButton}>
            <span>{ar ? 'تواصل معنا' : 'Get in touch'}</span>
            <ArrowUpRight size={17} strokeWidth={1.8} />
          </Link>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen
                ? ar ? 'إغلاق القائمة' : 'Close menu'
                : ar ? 'فتح القائمة' : 'Open menu'
            }
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav
          className={styles.mobileNav}
          aria-label={ar ? 'قائمة الجوال' : 'Mobile navigation'}
        >
          {navigation.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
              }
            >
              <span className={styles.linkNumber}>
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{ar ? item.ar : item.en}</span>

              <ArrowUpRight size={19} />
            </NavLink>
          ))}

          <Link
            to="/contact"
            className={styles.mobileContact}
            onClick={closeMenu}
          >
            {ar ? 'تواصل معنا' : 'Get in touch'}
            <ArrowUpRight size={19} />
          </Link>
        </nav>

        <div className={styles.mobileFooter}>
          {ar ? 'الاعمال الموحد' : 'Unified Works'}
        </div>
      </div>
    </header>
  )
}
