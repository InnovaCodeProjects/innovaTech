import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import SectionLink from '../components/SectionLink'
import libraImg from '../partners_assets/portfolio/libra_site.webp'
import plasaImg from '../partners_assets/portfolio/plasa_site.webp'
import leoImg from '../partners_assets/portfolio/leo_branding.webp'
import farmaImg from '../partners_assets/portfolio/farma_diagram.svg'
import maqferImg from '../partners_assets/portfolio/maqfer.webp'
import precifiltraImg from '../partners_assets/portfolio/precifiltra.webp'
import escritorImg from '../partners_assets/portfolio/escritor.webp'
import semfiltroImg from '../partners_assets/portfolio/semfiltro.webp'

type Card = { title: string; tag: string; img?: string; href?: string }

type Niche = {
  title: string
  alt: boolean
  cards: Card[]
}

const NICHES: Niche[] = [
  {
    title: 'Sites & Web',
    alt: false,
    cards: [
      { title: 'Libra Serv', tag: 'LANDING PAGE', img: libraImg },
      { title: 'Plasa Consultoria', tag: 'LANDING PAGE', img: plasaImg },
      { title: 'Sem Filtro', tag: 'SITE INSTITUCIONAL', img: semfiltroImg, href: 'https://semfiltro.innovatech.dev.br' },
    ],
  },
  {
    title: 'Redes & Infraestrutura',
    alt: true,
    cards: [
      { title: 'Farmácia Homeopática Lençóis', tag: 'MIKROTIK, VPN', img: farmaImg },
      { title: 'Em breve', tag: 'REDES' },
    ],
  },
  {
    title: 'Desenvolvimento de Software',
    alt: false,
    cards: [
      { title: 'PreciFiltra', tag: 'SAAS', img: precifiltraImg },
      { title: 'Escritor.ai', tag: 'SAAS', img: escritorImg },
    ],
  },
  {
    title: 'Design & Branding',
    alt: true,
    cards: [
      { title: "Leo's Tereré", tag: 'LOGO, BRANDING', img: leoImg },
      { title: 'Maqfer', tag: 'UI, LOJA VIRTUAL', img: maqferImg },
    ],
  },
]

function NicheSection({ niche }: { niche: Niche }) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    carouselRef.current?.scrollBy({ left: 340 * dir, behavior: 'smooth' })
  }

  return (
    <section className={`niche${niche.alt ? ' alt' : ''}`}>
      <div className="wrap">
        <div className="niche-head">
          <h2>{niche.title}</h2>
          <div className="niche-nav">
            <button aria-label="Anterior" onClick={() => scroll(-1)}>
              <i className="bi bi-arrow-left" />
            </button>
            <button aria-label="Próximo" onClick={() => scroll(1)}>
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        </div>
        <div className="carousel" ref={carouselRef}>
          {niche.cards.map((c, i) => {
            const thumb = c.img ? (
              <img className="cc-thumb" src={c.img} alt={c.title} width="700" height="220" loading="lazy" decoding="async" />
            ) : (
              <div className="cc-thumb placeholder">Em breve</div>
            )
            const body = (
              <div className="cc-body">
                <h3>{c.title}</h3>
                <p>{c.tag}</p>
              </div>
            )
            return c.href ? (
              <a className="cc" key={i} href={c.href} target="_blank" rel="noopener">
                {thumb}
                {body}
              </a>
            ) : (
              <div className="cc" key={i}>
                {thumb}
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  useDocumentMeta(
    'Projetos e Portfólio — Innova Tech',
    'Conheça os projetos da Innova Tech por nicho: sites, redes MikroTik, desenvolvimento de software e branding entregues para nossos clientes.'
  )

  return (
    <>
      <section className="pf-hero">
        <div className="wrap">
          <SectionLink id="portfolio" className="pf-back">
            <i className="bi bi-arrow-left" /> Voltar
          </SectionLink>
          <h1>Projetos por <span className="grad-text">nicho.</span></h1>
          <p>Separamos por área para você ver exatamente o que já fizemos parecido com o seu negócio. Em construção — mais projetos em breve.</p>
        </div>
      </section>

      {NICHES.map((n) => (
        <NicheSection key={n.title} niche={n} />
      ))}

      <footer className="footer">
        <div className="wrap">
          <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
            <p>© {new Date().getFullYear()} Innova Tech. Todos os direitos reservados.</p>
            <Link className="brand" to="/">
              <img className="brand-logo" src="/logo-corrida.png" alt="Innova Tech" width="50" height="26" style={{ height: 26 }} />
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
