import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import WhyUs from './components/WhyUs'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="bg-innova-black text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
