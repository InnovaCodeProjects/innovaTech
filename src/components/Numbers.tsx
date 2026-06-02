import React, { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

type Stat = {
  count: number
  prefix?: string
  suffix?: string
  label: string
  delay: string
}

const STATS: Stat[] = [
  { count: 100, prefix: '+', label: 'Clientes atendidos', delay: '' },
  { count: 4,   suffix: '+', label: 'Anos de experiência', delay: 'd1' },
  { count: 24,  suffix: 'h', label: 'Suporte remoto', delay: 'd2' },
  { count: 100, suffix: '%', label: 'Orçamento gratuito', delay: 'd3' },
]

function animateCount(el: HTMLElement, target: number, prefix: string, suffix: string) {
  const dur = 1500
  let start: number | null = null
  const tick = (ts: number) => {
    if (!start) start = ts
    const p = Math.min((ts - start) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    const val = Math.round(target * eased)
    el.innerHTML = `${prefix}${val}${suffix ? `<span class="u">${suffix}</span>` : ''}`
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function Numbers() {
  const sectionRef = useReveal()
  const counted = useRef(new WeakSet<Element>())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !counted.current.has(e.target)) {
            counted.current.add(e.target)
            const el = e.target as HTMLElement
            const count = parseFloat(el.dataset.count ?? '0')
            const prefix = el.dataset.prefix ?? ''
            const suffix = el.dataset.suffix ?? ''
            animateCount(el, count, prefix, suffix)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="numbers"
      id="numeros"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <img className="wm-numbers" src="/mark-white.png" alt="" aria-hidden="true" />
      <div className="wrap">
        <span className="numbers-head reveal">Prova, não promessa</span>
        <div className="stats-row">
          {STATS.map((s) => (
            <div key={s.label} className={`stat2 reveal${s.delay ? ' ' + s.delay : ''}`}>
              <div
                className="sv"
                data-count={s.count}
                data-prefix={s.prefix ?? ''}
                data-suffix={s.suffix ?? ''}
              >
                {s.prefix ?? ''}{0}{s.suffix ? <span className="u">{s.suffix}</span> : null}
              </div>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
