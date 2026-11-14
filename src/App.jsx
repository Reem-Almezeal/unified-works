
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'

import Platform from './pages/Platform/Platform'
import Technology from './pages/Technology/Technology'
import Impact from './pages/Impact/Impact'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from './sections/Hero/Hero'

function Home() {
  return (
    <main>
      <Hero />
      <div id="story" />
    </main>
  )
}

function App() {
  const { i18n } = useTranslation()

useEffect(() => {
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en'

  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}, [i18n.language])
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
