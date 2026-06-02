import React from 'react'
import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const ref = useReveal()

  return (
    <section
      className="cta"
      id="contato"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="cta-card reveal">
          <img className="wm-cta" src="/mark-white.png" alt="" aria-hidden="true" />
          <div className="glow" />
          <div className="cta-inner">
            <h2>Tem um problema?<br /><span className="grad-text">A gente resolve.</span></h2>
            <p>Mande uma mensagem agora e receba um diagnóstico gratuito. Resposta rápida, sem enrolação.</p>
            <div className="cta-actions">
              <a
                className="btn btn-wa"
                href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito."
                target="_blank"
                rel="noopener"
              >
                <i className="bi bi-whatsapp" />
                Falar no WhatsApp
              </a>
              <a
                className="btn btn-ghost"
                href="mailto:innovatech.assistencia@gmail.com?subject=Solicitar%20or%C3%A7amento%20%E2%80%94%20Innova%20Tech"
              >
                <i className="bi bi-envelope" />
                Enviar e-mail
              </a>
            </div>
            <div className="cta-meta">
              <span><span className="gd" />WhatsApp disponível agora</span>
              <span>Resposta em até 1h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
