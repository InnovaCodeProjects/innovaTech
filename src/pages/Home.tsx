import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrollBackground } from '../hooks/useScrollBackground'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhatsAppSection from '../components/WhatsAppSection'
import Portfolio from '../components/Portfolio'
import Terminal from '../components/Terminal'
import Process from '../components/Process'
import Numbers from '../components/Numbers'
import Pricing from '../components/Pricing'
import Manifesto from '../components/Manifesto'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const BG_ZONES = [
  { id: 'inicio', color: '#0a0a0f' },
  { id: 'servicos', color: '#100b1e' },
  { id: 'atendimento', color: '#0a1220' },
  { id: 'portfolio', color: '#170d22' },
  { id: 'software', color: '#08101c' },
  { id: 'processo', color: '#0e0a16' },
  { id: 'numeros', color: '#0e0e22' },
  { id: 'planos', color: '#0a0a0f' },
]

export default function Home() {
  const { t } = useTranslation()
  useDocumentMeta(t('meta.home.title'), t('meta.home.description'))
  const bg = useScrollBackground(BG_ZONES)

  return (
    <>
      <motion.div className="scroll-bg" style={{ background: bg }} aria-hidden="true" />
      <main id="topo">
        <Hero />
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
    </>
  )
}
