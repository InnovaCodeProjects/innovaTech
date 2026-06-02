import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="wrap nav-inner">
          <a href="#topo" className="brand" aria-label="Innova Tech">
            <span className="mark"><img src="/mark-white.png" alt="" /></span>
            <span className="name">INNOVA<b>TECH</b></span>
          </a>

          <nav className="nav-links">
            <a href="#servicos">Serviços</a>
            <a href="#atendimento">Atendimento</a>
            <a href="#portfolio">Projetos</a>
            <a href="#software">Software</a>
            <a href="#planos">Planos</a>
          </nav>

          <div className="nav-cta">
            <a
              className="btn btn-primary"
              href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20gratuito."
              target="_blank"
              rel="noopener"
            >
              Orçamento grátis
            </a>
            <button
              className="burger"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <i className={menuOpen ? 'bi bi-x-lg' : 'bi bi-list'} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <a href="#servicos" onClick={close}><span className="mi">01</span>Serviços</a>
        <a href="#atendimento" onClick={close}><span className="mi">02</span>Atendimento</a>
        <a href="#portfolio" onClick={close}><span className="mi">03</span>Projetos</a>
        <a href="#software" onClick={close}><span className="mi">04</span>Software</a>
        <a href="#processo" onClick={close}><span className="mi">05</span>Como trabalhamos</a>
        <a href="#planos" onClick={close}><span className="mi">06</span>Planos</a>
        <a
          className="btn btn-wa"
          href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento."
          target="_blank"
          rel="noopener"
          onClick={close}
        >
          <i className="bi bi-whatsapp" />
          Falar no WhatsApp
        </a>
      </div>
    </>
  )
}
