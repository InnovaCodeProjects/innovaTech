import React, { useState, useEffect } from "react";
import Icon from './Icon'
import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";
import { formatBRL, waLink } from "../utils/format";

const AVULSO_META = [
  { value: formatBRL(80), extra: formatBRL(100), feat: false, delay: "" },
  { value: formatBRL(150), feat: true, delay: "d1" },
  { value: formatBRL(250), feat: false, delay: "d2" },
  { value: null as string | null, feat: false, delay: "d3" },
];

const PLANS_META = [
  { value: formatBRL(200), extraPrice: formatBRL(50), feat: false, delay: "" },
  { value: formatBRL(420), extraPrice: formatBRL(50), feat: true, delay: "d1" },
];

const DISCOUNTS_META = [
  { pct: "20%" },
  { pct: "25%" },
  { pct: "30%" },
  { pct: "60%" },
];

type AvulsoText = { title: string; desc: string; value?: string };
type PlanText = { name: string; tag: string; desc: string; items: string[]; extra: string };
type DiscountText = { range: string };

export default function Pricing() {
  const { t } = useTranslation();
  const ref = useReveal();
  const [pdfOpen, setPdfOpen] = useState(false);

  const AVULSO = (t("pricing.avulso", { returnObjects: true }) as AvulsoText[]).map((item, i) => {
    const meta = AVULSO_META[i];
    return {
      title: item.title,
      value: item.value ?? meta.value,
      desc: t(`pricing.avulso.${i}.desc`, meta.extra ? { extra: meta.extra } : undefined),
      feat: meta.feat,
      delay: meta.delay,
    };
  });

  const PLANS = (t("pricing.plans", { returnObjects: true }) as PlanText[]).map((plan, i) => {
    const meta = PLANS_META[i];
    return {
      name: plan.name,
      value: meta.value,
      tag: plan.tag,
      desc: plan.desc,
      items: plan.items,
      extra: t(`pricing.plans.${i}.extra`, { price: meta.extraPrice }),
      feat: meta.feat,
      delay: meta.delay,
    };
  });

  const DISCOUNTS = (t("pricing.discounts", { returnObjects: true }) as DiscountText[]).map((d, i) => ({
    range: d.range,
    pct: DISCOUNTS_META[i].pct,
  }));

  useEffect(() => {
    if (!pdfOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPdfOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [pdfOpen]);

  return (
    <>
      <section
        className="sec"
        id="planos"
        ref={ref as React.RefObject<HTMLElement>}
      >
        <div className="wrap">
          <div
            className="section-head reveal"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <h2>
              {t("pricing.heading1")} <span className="grad-text">{t("pricing.heading2")}</span>
            </h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              {t("pricing.lead")}
            </p>
          </div>

          <div className="plans-divider reveal">
            {t("pricing.dividerAvulso")}
          </div>

          <div className="price-banner reveal">
            <Icon name="check-circle" />
            {t("pricing.banner")}
          </div>

          <div className="price-grid">
            {AVULSO.map((p) => (
              <div
                key={p.title}
                className={`price${p.feat ? " feat" : ""} reveal${p.delay ? " " + p.delay : ""}`}
              >
                <div className="pt">
                  <h3>{p.title}</h3>
                  <span className="pv">{p.value}</span>
                </div>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          <div
            style={{ textAlign: "center", marginTop: "20px" }}
            className="reveal"
          >
            <button
              className="price-catalog-btn"
              onClick={() => setPdfOpen(true)}
            >
              <Icon name="file-earmark-pdf" />
              {t("pricing.catalogButton")}
            </button>
          </div>

          <p className="price-note">
            {t("pricing.priceNote")}
          </p>

          <div className="plans-divider reveal">
            {t("pricing.dividerPlans")}
          </div>

          <p className="plan-intro reveal">
            {t("pricing.planIntro")}
          </p>

          <div className="plan-grid">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card${plan.feat ? " feat" : ""} reveal${plan.delay ? " " + plan.delay : ""}`}
              >
                <div className="plan-card-top">
                  <span className="plan-name">{plan.name}</span>
                  {plan.tag && <span className="plan-tag">{plan.tag}</span>}
                </div>
                <div className="plan-val">
                  {plan.value}
                  <span>{t("pricing.perMonth")}</span>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <ul className="plan-items">
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="plan-extra">{plan.extra}</div>
              </div>
            ))}
          </div>

          <p className="disc-head reveal">
            {t("pricing.discHead")}
          </p>
          <div className="disc-table reveal">
            {DISCOUNTS.map((d) => (
              <div key={d.range} className="disc-item">
                <div className="di-pct">{d.pct}</div>
                <div className="di-range">{d.range}</div>
              </div>
            ))}
          </div>
          <p className="disc-note reveal">
            {t("pricing.discNote")}
          </p>

          <div className="price-cta reveal">
            <a
              className="btn btn-wa"
              href={waLink(t("pricing.waMessage"))}
              target="_blank"
              rel="noopener"
            >
              <Icon name="whatsapp" />
              {t("pricing.ctaButton")}
            </a>
          </div>
        </div>
      </section>

      {pdfOpen && (
        <div className="pdf-modal" onClick={() => setPdfOpen(false)}>
          <div className="pdf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-bar">
              <span>{t("pricing.modalTitle")}</span>
              <button
                className="pdf-modal-close"
                onClick={() => setPdfOpen(false)}
                aria-label={t("pricing.modalClose") as string}
              >
                <Icon name="x-lg" />
              </button>
            </div>
            <iframe
              src="/tabela-innova.pdf"
              title={t("pricing.iframeTitle") as string}
            />
          </div>
        </div>
      )}
    </>
  );
}
