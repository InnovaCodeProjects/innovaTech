import React from 'react'
import { useReveal } from '../hooks/useReveal'

const SERVICES = [
  {
    n: '01',
    title: 'Assistência Técnica',
    detail: 'Reparo · formatação · troca de HD/SSD/memória · upgrades · montagem completa de PCs',
    href: 'https://wa.me/5514998040306?text=Ol%C3%A1!%20Preciso%20de%20assist%C3%AAncia%20t%C3%A9cnica.',
  },
  {
    n: '02',
    title: 'Suporte Remoto',
    detail: 'Remoção de vírus · instalação e otimização · configuração de sistemas · resolução à distância',
    href: 'https://wa.me/5514998040306?text=Ol%C3%A1!%20Preciso%20de%20suporte%20remoto.',
  },
  {
    n: '03',
    title: 'Redes & Infraestrutura',
    detail: 'MikroTik avançado · firewall e VPN · controle de banda e acesso · monitoramento 24/7',
    href: 'https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20um%20projeto%20de%20rede%2Finfraestrutura.',
  },
  {
    n: '04',
    title: 'Desenvolvimento de Software',
    detail: 'Aplicações web e mobile · APIs e integrações · sistemas personalizados · UI/UX responsivo',
    href: 'https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20desenvolver%20um%20software%2Fsistema.',
  },
  {
    n: '05',
    title: 'Design & Branding',
    detail: 'Sites · apps · logos · identidade visual · materiais digitais · landing pages de alta conversão',
    href: 'https://wa.me/5514998040306?text=Ol%C3%A1!%20Tenho%20interesse%20em%20servi%C3%A7os%20de%20design.',
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section
      className="sec"
      id="servicos"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="idx-head reveal">
          <div>
            <span className="eyebrow"><span className="idx">01</span> O que movemos</span>
            <h2 style={{ marginTop: 18 }}>Do hardware <span className="grad-text">ao código.</span></h2>
          </div>
          <p className="note">Cinco frentes, um único ponto de contato. Passe o mouse para abrir.</p>
        </div>

        <ul className="index">
          {SERVICES.map((s) => (
            <li key={s.n} className="ix reveal">
              <a href={s.href} target="_blank" rel="noopener">
                <span className="ix-n">{s.n}</span>
                <span className="ix-main">
                  <span className="ix-title">{s.title}</span>
                  <span className="ix-detail">{s.detail}</span>
                </span>
                <span className="ix-go"><i className="bi bi-arrow-up-right" /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
