import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SectionLink from './SectionLink'
import { waLink } from '../utils/format'

type LangCode = 'pt' | 'en' | 'es' | 'fr'

const LANGS: { code: LangCode; flag: string; label: string; sub: string }[] = [
  { code: 'pt', flag: 'flag-br', label: 'Português', sub: 'PT-BR' },
  { code: 'en', flag: 'flag-us', label: 'English', sub: 'EN-US' },
  { code: 'es', flag: 'flag-es', label: 'Español', sub: 'ES-ES' },
  { code: 'fr', flag: 'flag-fr', label: 'Français', sub: 'FR-FR' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const lang = (i18n.language?.slice(0, 2) as LangCode) || 'pt'
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
  const changeLang = (code: LangCode) => i18n.changeLanguage(code)
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0]

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="wrap nav-inner">
          <nav className="nav-links">
            <SectionLink id="servicos">{t('nav.links.services')}</SectionLink>
            <SectionLink id="atendimento">{t('nav.links.support')}</SectionLink>
            <Link to="/portfolio">{t('nav.links.projects')}</Link>
            <SectionLink id="software">{t('nav.links.software')}</SectionLink>
            <SectionLink id="planos">{t('nav.links.plans')}</SectionLink>
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
                    onClick={() => { changeLang(l.code); setLangOpen(false) }}
                  >
                    <span className={`flag ${l.flag}`} /> {l.label} <small>{l.sub}</small>
                  </button>
                ))}
              </div>
            </div>

            <a
              className="btn btn-simple"
              href={waLink(t('nav.waMessage'))}
              target="_blank"
              rel="noopener"
            >
              {t('nav.ctaButton')}
            </a>
            <button
              ref={burgerRef}
              className="burger"
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
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
          <SectionLink id="servicos" onClick={close}>{t('nav.links.services')}</SectionLink>
          <SectionLink id="atendimento" onClick={close}>{t('nav.links.support')}</SectionLink>
          <Link to="/portfolio" onClick={close}>{t('nav.links.projects')}</Link>
          <SectionLink id="software" onClick={close}>{t('nav.links.software')}</SectionLink>
          <SectionLink id="processo" onClick={close}>{t('nav.links.howWeWork')}</SectionLink>
          <SectionLink id="planos" onClick={close}>{t('nav.links.plans')}</SectionLink>
          <div className="mm-lang">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={l.code === lang ? 'active' : ''}
                onClick={() => changeLang(l.code)}
              >
                <span className={`flag ${l.flag}`} />{l.code.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            className="btn btn-wa"
            href={waLink(t('nav.waMessage'))}
            target="_blank"
            rel="noopener"
            onClick={close}
          >
            <i className="bi bi-whatsapp" />
            {t('nav.waButton')}
          </a>
        </div>
      </div>
    </>
  )
}
