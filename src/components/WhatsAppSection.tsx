import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { waLink } from '../utils/format'

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
type ConvoText = { from: 'me' | 'them'; text: string }

const TIMING: { t: string; wait?: number }[] = [
  { t: '14:02' },
  { t: '14:02', wait: 1100 },
  { t: '14:02', wait: 1600 },
  { t: '14:03', wait: 1400 },
  { t: '14:03', wait: 1900 },
  { t: '14:04', wait: 1300 },
]

export default function WhatsAppSection() {
  const { t, i18n } = useTranslation()
  const sectionRef = useReveal()
  const bodyRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)
  const convoText = t('whatsappSection.convo', { returnObjects: true }) as ConvoText[]
  const CONVO: Msg[] = convoText.map((c, i) => ({ ...c, ...TIMING[i] }))

  useEffect(() => {
    const body = bodyRef.current
    const typing = typingRef.current
    if (!body || !typing) return

    let cancelled = false

    function addBubble(msg: Msg) {
      const b = document.createElement('div')
      b.className = `bubble ${msg.from}`
      b.innerHTML = `${msg.text}<span class="tm">${msg.t}</span>`
      const typingEl = body!.querySelector('.typing')
      if (typingEl) body!.insertBefore(b, typingEl); else body!.appendChild(b)
      void b.offsetWidth
      b.classList.add('show')
    }

    function runChat(idx: number) {
      if (cancelled) return
      if (idx >= CONVO.length) {
        setTimeout(() => {
          if (cancelled) return
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
          if (cancelled) return
          typing!.classList.remove('show')
          addBubble(msg)
          runChat(idx + 1)
        }, delay)
      } else {
        setTimeout(() => {
          if (cancelled) return
          addBubble(msg)
          runChat(idx + 1)
        }, delay)
      }
    }

    if (startedRef.current) {
      body.querySelectorAll('.bubble').forEach((b) => b.remove())
      typing.classList.remove('show')
      runChat(0)
      return () => { cancelled = true }
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
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [i18n.language])

  return (
    <section
      className="sec wa-sec"
      id="atendimento"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="wrap wa-inner">
        <div className="wa-copy reveal">
          <h2>{t('whatsappSection.heading1')} <span className="grad-text">{t('whatsappSection.heading2')}</span></h2>
          <p>{t('whatsappSection.lead')}</p>

          <div className="wa-points">
            {(t('whatsappSection.points', { returnObjects: true }) as { title: string; desc: string }[]).map((p, i) => (
              <div className="wa-point" key={p.title}>
                <span className="pi">{[ZAP_ICON, CHECK_ICON, USER_ICON][i]}</span>
                <span className="pt">
                  <b>{p.title}</b>
                  <span>{p.desc}</span>
                </span>
              </div>
            ))}
          </div>

          <a
            className="btn btn-wa"
            href={waLink(t('whatsappSection.waMessage'))}
            target="_blank"
            rel="noopener"
          >
            {WA_ICON}
            {t('whatsappSection.ctaButton')}
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
                  <span><span className="od" />{t('whatsappSection.phoneOnline')}</span>
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
                <span className="wa-day">{t('whatsappSection.today')}</span>
                <div className="typing" ref={typingRef}>
                  <span /><span /><span />
                </div>
              </div>

              <div className="wa-input">
                <span className="field">{t('whatsappSection.inputPlaceholder')}</span>
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
