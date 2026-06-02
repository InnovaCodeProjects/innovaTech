import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import WhatsAppSection from './components/WhatsAppSection'
import Portfolio from './components/Portfolio'
import Terminal from './components/Terminal'
import Process from './components/Process'
import Numbers from './components/Numbers'
import Pricing from './components/Pricing'
import Manifesto from './components/Manifesto'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
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
      <div className="scrollbar" id="scrollbar" />
      <Navbar />
      <main id="topo">
        <Hero />
        <Marquee />
        <Services />
        <WhatsAppSection />
        <Portfolio />
        <Terminal />
        <Process />
        <Numbers />
        <Pricing />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
