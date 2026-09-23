import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import SectionLink from './SectionLink'

type LangCode = 'pt' | 'en' | 'es' | 'fr'

const LANGS: { code: LangCode; flag: string; label: string; sub: string }[] = [
  { code: 'pt', flag: 'flag-br', label: 'Português', sub: 'PT-BR' },
  { code: 'en', flag: 'flag-us', label: 'English', sub: 'EN-US' },
  { code: 'es', flag: 'flag-es', label: 'Español', sub: 'ES-ES' },
  { code: 'fr', flag: 'flag-fr', label: 'Français', sub: 'FR-FR' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState<LangCode>('pt')
  const langRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const close = () => setMenuOpen(false)
  const current = LANGS.find((l) => l.code === lang)!

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="wrap nav-inner">
          <nav className="nav-links">
            <SectionLink id="servicos">Serviços</SectionLink>
            <SectionLink id="atendimento">Atendimento</SectionLink>
            <Link to="/portfolio">Projetos</Link>
            <SectionLink id="software">Software</SectionLink>
            <SectionLink id="planos">Planos</SectionLink>
          </nav>

          <SectionLink id="topo" className="brand">
            <img
              className="brand-logo"
              src="/logo-corrida.png"
              alt="Innova Tech"
              width="73"
              height="38"
              decoding="async"
              {...({ fetchpriority: 'high' } as ImgHTMLAttributes<HTMLImageElement>)}
            />
          </SectionLink>

          <div className="nav-cta">
            <div className={`lang${langOpen ? ' open' : ''}`} id="lang" ref={langRef}>
              <button
                className="lang-btn"
                aria-haspopup="true"
                aria-expanded={langOpen}
                onClick={(e) => { e.stopPropagation(); setLangOpen((o) => !o) }}
              >
                <span className={`flag ${current.flag}`} /> {current.code.toUpperCase()}
              </button>
              <div className="lang-panel">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    className={l.code === lang ? 'active' : ''}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                  >
                    <span className={`flag ${l.flag}`} /> {l.label} <small>{l.sub}</small>
                  </button>
                ))}
              </div>
            </div>

            <a
              className="btn btn-simple"
              href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20gratuito."
              target="_blank"
              rel="noopener"
            >
              Orçamento grátis
            </a>
            <button
              ref={burgerRef}
              className="burger"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <i className={menuOpen ? 'bi bi-x-lg' : 'bi bi-list'} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <div className="mm-card" ref={menuRef}>
          <SectionLink id="servicos" onClick={close}>Serviços</SectionLink>
          <SectionLink id="atendimento" onClick={close}>Atendimento</SectionLink>
          <Link to="/portfolio" onClick={close}>Projetos</Link>
          <SectionLink id="software" onClick={close}>Software</SectionLink>
          <SectionLink id="processo" onClick={close}>Como trabalhamos</SectionLink>
          <SectionLink id="planos" onClick={close}>Planos</SectionLink>
          <div className="mm-lang">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={l.code === lang ? 'active' : ''}
                onClick={() => setLang(l.code)}
              >
                <span className={`flag ${l.flag}`} />{l.code.toUpperCase()}
              </button>
            ))}
          </div>
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
      </div>
    </>
  )
}
