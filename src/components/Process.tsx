import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'

const NUMS = ['01', '02', '03', '04']

type Step = { title: string; desc: string }

export default function Process() {
  const { t } = useTranslation()
  const ref = useReveal()
  const steps = (t('process.steps', { returnObjects: true }) as Step[]).map((s, i) => ({ n: NUMS[i], ...s }))

  return (
    <section
      className="sec"
      id="processo"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="section-head reveal">
          <h2>{t('process.heading1')} <span className="grad-text">{t('process.heading2')}</span></h2>
        </div>
        <div className="proc reveal">
          {steps.map((s) => (
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
