import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { waLink } from '../utils/format'

export default function CTA() {
  const { t } = useTranslation()
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
            <h2>{t('cta.heading1')}<br /><span className="grad-text">{t('cta.heading2')}</span></h2>
            <p>{t('cta.lead')}</p>
            <div className="cta-actions">
              <a
                className="btn btn-wa"
                href={waLink(t('cta.waMessage'))}
                target="_blank"
                rel="noopener"
              >
                <i className="bi bi-whatsapp" />
                {t('cta.waButton')}
              </a>
              <a
                className="btn btn-ghost"
                href={`mailto:innovatech.assistencia@gmail.com?subject=${encodeURIComponent(t('cta.emailSubject'))}`}
              >
                <i className="bi bi-envelope" />
                {t('cta.emailButton')}
              </a>
            </div>
            <div className="cta-meta">
              <span><span className="gd" />{t('cta.metaAvailable')}</span>
              <span>{t('cta.metaResponse')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
