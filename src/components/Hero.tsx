import React from 'react'
import { useReveal } from '../hooks/useReveal'

const FLOW_POSITIONS = ['58%', '67%', '76%', '88%']
const FLOW_DELAYS = ['0s', '1.25s', '2.5s', '3.75s']

export default function Hero() {
  const ref = useReveal()

  return (
    <section
      className="hero"
      id="inicio"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="flow" aria-hidden="true">
        {FLOW_POSITIONS.map((left, i) => (
          <span
            key={i}
            className="tr"
            style={{ left, animationDelay: FLOW_DELAYS[i] }}
          />
        ))}
      </div>

      <img className="hero-mark" src="/mark-white.png" alt="" aria-hidden="true" />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="hero-kicker">Innova Tech · soluções em tecnologia</span>

          <h1 className="hero-title">
            <span className="ln"><span>Movemos a tecnologia</span></span>
            <span className="ln"><span>ao seu redor —</span></span>
            <span className="ln grad-text"><span>você só avança.</span></span>
          </h1>

          <p className="hero-lead reveal d3">
            Facilidade e segurança em cada serviço, para você nunca mais sentir
            insegurança com a tecnologia que te cerca. Do hardware ao código.
          </p>

          <div className="hero-actions reveal d3">
            <a
              className="btn btn-wa"
              href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito%20para%20o%20meu%20projeto."
              target="_blank"
              rel="noopener"
            >
              <i className="bi bi-whatsapp" />
              Falar no WhatsApp
            </a>
            <a className="btn btn-ghost" href="#portfolio">
              Ver projetos <i className="bi bi-arrow-right" />
            </a>
          </div>

          <ul className="hero-trust reveal d4">
            <li><span className="tick"><i className="bi bi-check-lg" /></span>Diagnóstico grátis</li>
            <li><span className="tick"><i className="bi bi-check-lg" /></span>Resposta em até 1h</li>
            <li><span className="tick"><i className="bi bi-check-lg" /></span>Garantia nos serviços</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
