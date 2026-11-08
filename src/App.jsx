
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/layout/Navbar/Navbar'
import Platform from './pages/Platform/Platform'
import Technology from './pages/Technology/Technology'
import Impact from './pages/Impact/Impact'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Hero from './sections/Hero/Hero'

function Home() {
  return (
    <main>
      <Hero />
      <div id="story" />
    </main>
  )
}
function Placeholder({ title }) {
  return (
    <main className="section" style={{ paddingTop: '180px', minHeight: '100vh' }}>
      <div className="container">
        <h1 className="section-heading">{title}</h1>
      </div>
    </main>
  )
}

function App() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
      
      </Routes>
    </>
  )
}

export default App

