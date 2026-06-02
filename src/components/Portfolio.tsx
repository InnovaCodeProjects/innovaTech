import React from 'react'
import { useReveal } from '../hooks/useReveal'
import libraImg from '../partners_assets/portfolio/libra_site.png'
import plasaImg from '../partners_assets/portfolio/plasa_site.png'
import leoImg from '../partners_assets/portfolio/leo_branding.png'
import farmaImg from '../partners_assets/portfolio/farma_diagram.svg'

const PROJECTS = [
  {
    span: 'span4',
    cat: 'Site · Web',
    img: libraImg,
    title: 'Libra Serv',
    desc: 'Site institucional moderno para empresa de serviços — design limpo, responsivo e focado em conversão.',
    tags: ['Web Design', 'Responsivo', 'SEO'],
    href: 'https://libraserv.com',
    delay: '',
  },
  {
    span: 'span2',
    cat: 'Site · Consultoria',
    img: plasaImg,
    title: 'Plasa Consultoria',
    desc: 'Site profissional para consultoria, com identidade visual marcante e navegação fluida.',
    tags: ['Web Design', 'Branding'],
    href: 'https://plasaconsultoria.com.br',
    delay: 'd1',
  },
  {
    span: 'span4',
    cat: 'T.I. · Infraestrutura',
    img: farmaImg,
    title: 'Farmácia Homeopática Lençóis',
    desc: 'Projeto completo de infraestrutura de rede corporativa com dois sites interligados via VPN MikroTik.',
    tags: ['MikroTik', 'VPN', 'Firewall'],
    href: 'https://farmaciahomeopaticalencois.com.br',
    delay: '',
  },
  {
    span: 'span2',
    cat: 'Logo · Branding',
    img: leoImg,
    title: "Leo's Tereré",
    desc: 'Identidade visual completa com logo e materiais digitais para marca de tereré de Lençóis Paulista.',
    tags: ['Logo', 'Branding', 'Design'],
    href: 'https://www.instagram.com/leosterere/',
    delay: 'd1',
  },
]

export default function Portfolio() {
  const ref = useReveal()

  return (
    <section
      className="sec alt"
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="idx">03</span> Projetos</span>
          <h2>O que entregamos <span className="grad-text">fala por nós.</span></h2>
        </div>

        <div className="pf-grid">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              className={`pf ${p.span} reveal${p.delay ? ' ' + p.delay : ''}`}
              href={p.href}
              target="_blank"
              rel="noopener"
            >
              <div className="pf-thumb">
                <span className="pf-cat">{p.cat}</span>
                <img src={p.img} alt={p.title} />
                <span className="pf-arrow"><i className="bi bi-arrow-up-right" /></span>
              </div>
              <div className="pf-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pf-meta">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
