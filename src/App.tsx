import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import PortfolioPage from './pages/Portfolio'

function ScrollManager() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo) {
      document.getElementById(state.scrollTo)?.scrollIntoView()
      navigate(location.pathname, { replace: true, state: null })
    } else {
      window.scrollTo(0, 0)
    }
    // Deliberately only re-run on pathname change: the replace above updates
    // location.state without changing pathname, and must not re-trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return null
}

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    const bar = document.getElementById('scrollbar')
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollManager />
      <div className="scrollbar" id="scrollbar" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
      <WhatsAppButton />
    </>
  )
}
