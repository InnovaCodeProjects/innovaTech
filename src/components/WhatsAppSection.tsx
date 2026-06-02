import React, { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
)
const ZAP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const USER_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
  </svg>
)
const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.7-1.4.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.5 1.9.7 2.6.8 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
    <path d="M20.5 3.5A11 11 0 0 0 3.3 17.3L2 22l4.8-1.3a11 11 0 1 0 13.7-17.2zm-8.4 16.9c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-2.8.7.8-2.8-.2-.3a9 9 0 1 1 7.2 3.8z"/>
  </svg>
)

type Msg = { from: 'me' | 'them'; text: string; t: string; wait?: number }

const CONVO: Msg[] = [
  { from: 'me',   text: 'Oi! O computador da loja não liga 😟', t: '14:02' },
  { from: 'them', text: 'Boa tarde! Aqui é da Innova Tech 👋', t: '14:02', wait: 1100 },
  { from: 'them', text: 'Me passa o modelo? Já adianto um diagnóstico pra você.', t: '14:02', wait: 1600 },
  { from: 'me',   text: 'É um Dell Optiplex, parou hoje de manhã', t: '14:03', wait: 1400 },
  { from: 'them', text: 'Provável a fonte. O diagnóstico é gratuito — passamos aí hoje ainda ⚡', t: '14:03', wait: 1900 },
  { from: 'me',   text: 'Perfeito, pode vir! 🙌', t: '14:04', wait: 1300 },
]

export default function WhatsAppSection() {
  const sectionRef = useReveal()
  const bodyRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const body = bodyRef.current
    const typing = typingRef.current
    if (!body || !typing) return

    function addBubble(msg: Msg) {
      const b = document.createElement('div')
      b.className = `bubble ${msg.from}`
      b.innerHTML = `${msg.text}<span class="tm">${msg.t}</span>`
      const t = body!.querySelector('.typing')
      if (t) body!.insertBefore(b, t); else body!.appendChild(b)
      void b.offsetWidth
      b.classList.add('show')
    }

    function runChat(idx: number) {
      if (idx >= CONVO.length) {
        setTimeout(() => {
          body!.querySelectorAll('.bubble').forEach((b) => b.remove())
          runChat(0)
        }, 4500)
        return
      }
      const msg = CONVO[idx]
      const delay = msg.wait ?? 600
      if (msg.from === 'them') {
        typing!.classList.add('show')
        setTimeout(() => {
          typing!.classList.remove('show')
          addBubble(msg)
          runChat(idx + 1)
        }, delay)
      } else {
        setTimeout(() => {
          addBubble(msg)
          runChat(idx + 1)
        }, delay)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true
            runChat(0)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(body)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="sec wa-sec"
      id="atendimento"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="wrap wa-inner">
        <div className="wa-copy reveal">
          <span className="eyebrow"><span className="idx">02</span> Atendimento de verdade</span>
          <h2>Seu problema resolvido <span className="grad-text">na conversa.</span></h2>
          <p>Sem formulário, sem espera, sem robô. Você manda uma mensagem e fala direto com quem entende. Diagnóstico na hora, pelo WhatsApp.</p>

          <div className="wa-points">
            <div className="wa-point">
              <span className="pi">{ZAP_ICON}</span>
              <span className="pt">
                <b>Resposta em até 1h</b>
                <span>No horário comercial, normalmente em minutos.</span>
              </span>
            </div>
            <div className="wa-point">
              <span className="pi">{CHECK_ICON}</span>
              <span className="pt">
                <b>Diagnóstico gratuito</b>
                <span>Você só paga se decidir seguir com o serviço.</span>
              </span>
            </div>
            <div className="wa-point">
              <span className="pi">{USER_ICON}</span>
              <span className="pt">
                <b>Uma pessoa, não um ticket</b>
                <span>Acompanhamento do começo ao fim, com quem te atendeu.</span>
              </span>
            </div>
          </div>

          <a
            className="btn btn-wa"
            href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20gratuito."
            target="_blank"
            rel="noopener"
          >
            {WA_ICON}
            Começar uma conversa
          </a>
        </div>

        <div className="wa-stage reveal d1">
          <div className="glow" />
          <div className="phone">
            <div className="notch" />
            <div className="phone-screen">
              <div className="wa-head">
                <span className="avatar"><img src="/mark-white.png" alt="" /></span>
                <span className="who">
                  <b>
                    Innova Tech{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </b>
                  <span><span className="od" />online</span>
                </span>
                <span className="hicons">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
              </div>

              <div className="wa-body" ref={bodyRef}>
                <span className="wa-day">HOJE</span>
                <div className="typing" ref={typingRef}>
                  <span /><span /><span />
                </div>
              </div>

              <div className="wa-input">
                <span className="field">Mensagem</span>
                <span className="send">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2z"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
