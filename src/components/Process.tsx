import React from 'react'
import { useReveal } from '../hooks/useReveal'

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Entendemos o problema antes de propor qualquer solução. Gratuito e sem compromisso.',
  },
  {
    n: '02',
    title: 'Proposta',
    desc: 'Escopo claro, prazo definido e preço transparente. Você aprova sabendo de tudo.',
  },
  {
    n: '03',
    title: 'Execução',
    desc: 'Mãos à obra com comunicação constante. Você acompanha cada etapa do trabalho.',
  },
  {
    n: '04',
    title: 'Garantia',
    desc: 'Entregamos e ficamos. Suporte e garantia em todos os serviços — resolvemos de verdade.',
  },
]

export default function Process() {
  const ref = useReveal()

  return (
    <section
      className="sec"
      id="processo"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow"><span className="idx">05</span> Como trabalhamos</span>
          <h2>Um processo que dá <span className="grad-text">segurança.</span></h2>
        </div>
        <div className="proc reveal">
          {STEPS.map((s) => (
            <div key={s.n} className="proc-step">
              <div className="pn">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
