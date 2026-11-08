
import { useEffect, useState } from 'react'
import {
  NavLink,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  ArrowUpRight,
  Languages,
  Sun,
  Moon,
  Menu,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

import styles from './Navbar.module.css'

const translations = {
  ar: {
    home: 'الرئيسية',
    platform: 'المنصة',
    technology: 'التقنيات',
    impact: 'الأثر',
    about: 'من نحن',
    contact: 'تواصل معنا',
    partnership: 'طلب شراكة',
    menu: 'القائمة',
    close: 'إغلاق القائمة',
    switchLanguage: 'Switch to English',
    switchTheme: 'تغيير المظهر',
    explore: 'استكشف المنصة'
  },
  en: {
    home: 'Home',
    platform: 'Platform',
    technology: 'Technology',
    impact: 'Impact',
    about: 'About us',
    contact: 'Contact',
    partnership: 'Partnership',
    menu: 'Menu',
    close: 'Close menu',
    switchLanguage: 'التبديل إلى العربية',
    switchTheme: 'Change appearance',
    explore: 'Explore the platform'
  }
}

const links = [
  { key: 'home', path: '/' },
  { key: 'platform', path: '/platform' },
  { key: 'technology', path: '/technology' },
  { key: 'impact', path: '/impact' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' }
]

export default function Navbar() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()

  const isArabic = (
    i18n.resolvedLanguage ||
    i18n.language ||
    'ar'
  ).startsWith('ar')

  const t = translations[isArabic ? 'ar' : 'en']
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark'

    return document.documentElement.getAttribute('data-theme') || 'dark'
  })

  // Scroll state
  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 18)
    }

    updateScroll()

    window.addEventListener('scroll', updateScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('unified-works-theme', theme)
  }, [theme])

  // Language direction
  useEffect(() => {
    document.documentElement.lang = isArabic ? 'ar' : 'en'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [isArabic])

  // Close menu after route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.search, location.hash])

  // Lock page scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Restore saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('unified-works-theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    }
  }, [])

  // Scroll to anchor after navigating
  useEffect(() => {
    if (!location.hash) return

    const id = decodeURIComponent(location.hash.slice(1))
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [location.pathname, location.hash])

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? 'en' : 'ar')
  }

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark')
  }

  const goToPartnership = () => {
    setMenuOpen(false)
    navigate('/contact?type=partnership#contact-form')
  }

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${
          scrolled ? styles.scrolled : ''
        }`}
        initial={{ y: -85, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <div className={styles.navContainer}>

          {/* BRAND */}
          <Link
            to="/"
            className={styles.brand}
            aria-label="Unified Works - Home"
            onClick={() => setMenuOpen(false)}
          >
            <div className={styles.brandSymbol}>
              <span>U</span>
              <span className={styles.brandDot}>.</span>
            </div>

            <div className={styles.brandText}>
              <strong>UNIFIED WORKS</strong>
              <small>INTELLIGENT FIELD OPERATIONS</small>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className={styles.desktopNav}
            aria-label={t.menu}
          >
            {links.map(link => (
              <NavLink
                key={link.key}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${
                    isActive ? styles.active : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{t[link.key]}</span>

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-line"
                        className={styles.activeLine}
                        transition={{
                          type: 'spring',
                          stiffness: 360,
                          damping: 32
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className={styles.actions}>

            {/* THEME */}
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleTheme}
              aria-label={t.switchTheme}
              title={t.switchTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{
                    opacity: 0,
                    rotate: -65,
                    scale: 0.7
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 65,
                    scale: 0.7
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark'
                    ? <Sun size={19} />
                    : <Moon size={19} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* LANGUAGE */}
            <button
              type="button"
              className={styles.languageButton}
              onClick={toggleLanguage}
              aria-label={t.switchLanguage}
              title={t.switchLanguage}
            >
              <Languages size={17} />
              <span>{isArabic ? 'EN' : 'AR'}</span>
            </button>

            {/* PARTNERSHIP */}
            <button
              type="button"
              className={styles.partnershipButton}
              onClick={goToPartnership}
            >
              <span>{t.partnership}</span>
              <ArrowUpRight size={18} />
            </button>

            {/* MOBILE TOGGLE */}
            <button
              type="button"
              className={styles.menuToggle}
              onClick={() => setMenuOpen(current => !current)}
              aria-label={menuOpen ? t.close : t.menu}
              aria-expanded={menuOpen}
              aria-controls="unified-mobile-menu"
            >
              {menuOpen
                ? <X size={23} />
                : <Menu size={23} />}
            </button>
          </div>
        </div>

        {/* PAGE SCROLL INDICATOR */}
        <motion.div
          className={styles.progress}
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="unified-mobile-menu"
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={styles.mobilePanel}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className={styles.mobileHeading}>
                <span>EXPLORE UNIFIED WORKS</span>
                <span>01 — 06</span>
              </div>

              <nav className={styles.mobileLinks}>
                {links.map((link, index) => (
                  <NavLink
                    key={link.key}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${
                        isActive ? styles.mobileActive : ''
                      }`
                    }
                  >
                    <span className={styles.mobileIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span>{t[link.key]}</span>

                    <DirectionArrow size={20} />
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                className={styles.mobilePartnership}
                onClick={goToPartnership}
              >
                <span>{t.partnership}</span>
                <ArrowUpRight size={20} />
              </button>

              <div className={styles.mobileFooter}>
                UNIFIED WORKS / FIELD INTELLIGENCE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
