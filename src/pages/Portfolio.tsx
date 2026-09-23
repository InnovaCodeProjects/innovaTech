import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
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

const NICHES_META = [
  {
    alt: false,
    cards: [
      { title: 'Libra Serv', img: libraImg },
      { title: 'Plasa Consultoria', img: plasaImg },
      { title: 'Sem Filtro', img: semfiltroImg, href: 'https://semfiltro.innovatech.dev.br' },
    ],
  },
  {
    alt: true,
    cards: [
      { title: 'Farmácia Homeopática Lençóis', img: farmaImg },
      {},
    ],
  },
  {
    alt: false,
    cards: [
      { title: 'PreciFiltra', img: precifiltraImg },
      { title: 'Escritor.ai', img: escritorImg },
    ],
  },
  {
    alt: true,
    cards: [
      { title: "Leo's Tereré", img: leoImg },
      { title: 'Maqfer', img: maqferImg },
    ],
  },
]

type NicheText = { title: string; cards: { title?: string; tag: string }[] }

function buildNiches(texts: NicheText[]): Niche[] {
  return NICHES_META.map((meta, i) => ({
    title: texts[i].title,
    alt: meta.alt,
    cards: meta.cards.map((c, j) => ({
      ...c,
      title: texts[i].cards[j].title ?? c.title ?? '',
      tag: texts[i].cards[j].tag,
    })),
  }))
}

function NicheSection({ niche }: { niche: Niche }) {
  const { t } = useTranslation()
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
            <button aria-label={t('portfolioPage.prevAria') as string} onClick={() => scroll(-1)}>
              <i className="bi bi-arrow-left" />
            </button>
            <button aria-label={t('portfolioPage.nextAria') as string} onClick={() => scroll(1)}>
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        </div>
        <div className="carousel" ref={carouselRef}>
          {niche.cards.map((c, i) => {
            const thumb = c.img ? (
              <img className="cc-thumb" src={c.img} alt={c.title} width="700" height="220" loading="lazy" decoding="async" />
            ) : (
              <div className="cc-thumb placeholder">{t('portfolioPage.comingSoon')}</div>
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
  const { t } = useTranslation()
  useDocumentMeta(t('meta.portfolio.title'), t('meta.portfolio.description'))
  const niches = buildNiches(t('portfolioPage.niches', { returnObjects: true }) as NicheText[])

  return (
    <>
      <section className="pf-hero">
        <div className="wrap">
          <SectionLink id="portfolio" className="pf-back">
            <i className="bi bi-arrow-left" /> {t('portfolioPage.back')}
          </SectionLink>
          <h1>{t('portfolioPage.heading1')} <span className="grad-text">{t('portfolioPage.heading2')}</span></h1>
          <p>{t('portfolioPage.lead')}</p>
        </div>
      </section>

      {niches.map((n) => (
        <NicheSection key={n.title} niche={n} />
      ))}

      <footer className="footer">
        <div className="wrap">
          <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
            <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            <Link className="brand" to="/">
              <img className="brand-logo" src="/logo-corrida.png" alt="Innova Tech" width="50" height="26" style={{ height: 26 }} />
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
