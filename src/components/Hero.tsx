import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import SectionLink from './SectionLink'
import { waLink } from '../utils/format'

export default function Hero() {
  const { t } = useTranslation()
  const ref = useReveal()
  const trust = t('hero.trust', { returnObjects: true }) as string[]

  return (
    <section
      className="hero"
      id="inicio"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <img
        className="hero-mark"
        src="/mark-white.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
      />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="ln"><span>{t('hero.titleLine1')}</span></span>
            <span className="ln grad-text"><span>{t('hero.titleLine2')}</span></span>
          </h1>

          <p className="hero-lead reveal d3">
            {t('hero.lead')}
          </p>

          <div className="hero-actions reveal d3">
            <a
              className="btn btn-wa"
              href={waLink(t('hero.waMessage'))}
              target="_blank"
              rel="noopener"
            >
              <i className="bi bi-whatsapp" />
              {t('hero.waButton')}
            </a>
            <SectionLink id="portfolio" className="btn btn-ghost">
              {t('hero.viewProjects')} <i className="bi bi-arrow-right" />
            </SectionLink>
          </div>

          <ul className="hero-trust reveal d4">
            {trust.map((item) => (
              <li key={item}><span className="tick"><i className="bi bi-check-lg" /></span>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
