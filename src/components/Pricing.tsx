import React, { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";

const AVULSO = [
  {
    title: "Formatação & SO",
    value: "R$ 80",
    desc: "Formatação, instalação do sistema e antivírus. Versão avançada com backup: R$ 100.",
    feat: false,
    delay: "",
  },
  {
    title: "Limpeza completa",
    value: "R$ 150",
    desc: "Limpeza física interna + formatação + backup completo. Mais pedido.",
    feat: true,
    delay: "d1",
  },
  {
    title: "Montagem de PC",
    value: "R$ 250",
    desc: "Montagem dos componentes, instalação do SO e softwares básicos.",
    feat: false,
    delay: "d2",
  },
  {
    title: "Rede & Software",
    value: "Sob medida",
    desc: "Projetos de infraestrutura e desenvolvimento conforme o escopo.",
    feat: false,
    delay: "d3",
  },
];

const PLANS = [
  {
    name: "Assinatura Essencial",
    value: "R$ 200",
    tag: "",
    desc: "Ideal para consultórios, clínicas e pequenos estabelecimentos.",
    items: [
      "Suporte remoto ilimitado",
      "Até 3 visitas técnicas por mês",
      "Descontos progressivos em serviços",
      "Peças e substituições orçadas à parte",
    ],
    extra: "Visita além das inclusas: R$ 50/visita",
    feat: false,
    delay: "",
  },
  {
    name: "Assinatura Completa",
    value: "R$ 420",
    tag: "Mais contratado",
    desc: "Para negócios com maior volume e necessidade de manutenção contínua.",
    items: [
      "Manutenção preventiva mensal",
      "Manutenção corretiva inclusa",
      "Até 4 visitas técnicas por mês",
      "Suporte remoto ilimitado",
      "20% de desconto em serviços adicionais",
    ],
    extra: "Visita além das inclusas: R$ 50/visita",
    feat: true,
    delay: "d1",
  },
];

const DISCOUNTS = [
  { range: "1 máquina", pct: "20%" },
  { range: "2–5 máquinas", pct: "25%" },
  { range: "6–9 máquinas", pct: "30%" },
  { range: "10+ máquinas", pct: "60%" },
];

export default function Pricing() {
  const ref = useReveal();
  const [pdfOpen, setPdfOpen] = useState(false);

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
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="idx">07</span> Transparência total
            </span>
            <h2>
              Preços claros, <span className="grad-text">sem surpresas.</span>
            </h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              Serviços avulsos com valor de referência ou plano de T.I. para
              quem quer suporte contínuo.
            </p>
          </div>

          <div className="plans-divider reveal">
            Planos de T.I. — Serviços Avulsos
          </div>

          <div className="price-banner reveal">
            <i className="bi bi-check-circle" />
            Diagnóstico 100% gratuito — sem compromisso
          </div>

          <div className="price-grid">
            {AVULSO.map((p) => (
              <div
                key={p.title}
                className={`price${p.feat ? " feat" : ""} reveal${p.delay ? " " + p.delay : ""}`}
              >
                <div className="pt">
                  <h4>{p.title}</h4>
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
              <i className="bi bi-file-earmark-pdf" />
              Ver tabela completa de preços
            </button>
          </div>

          <p className="price-note">
            * Valores de peças e componentes cobrados à parte. Preços de
            referência, sujeitos a alteração conforme o diagnóstico.
          </p>

          <div className="plans-divider reveal">
            Planos de T.I. — Assinatura Mensal
          </div>

          <p className="plan-intro reveal">
            Suporte contínuo, visitas técnicas e descontos progressivos conforme
            o tamanho do seu negócio. Quanto mais equipamentos, maior a
            economia.
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
                  <span>/mês</span>
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
            Benefício de assinatura — desconto em serviços adicionais
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
            Você só paga pelos serviços que utilizar. O desconto é aplicado
            automaticamente conforme a quantidade de equipamentos.
          </p>

          <div className="price-cta reveal">
            <a
              className="btn btn-wa"
              href="https://wa.me/5514998040306?text=Ol%C3%A1!%20Vi%20a%20tabela%20e%20gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener"
            >
              <i className="bi bi-whatsapp" />
              Solicitar orçamento via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {pdfOpen && (
        <div className="pdf-modal" onClick={() => setPdfOpen(false)}>
          <div className="pdf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-bar">
              <span>Tabela de Preços — Innova Tech</span>
              <button
                className="pdf-modal-close"
                onClick={() => setPdfOpen(false)}
                aria-label="Fechar"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <iframe
              src="/tabela-innova.pdf"
              title="Tabela de Preços Innova Tech"
            />
          </div>
        </div>
      )}
    </>
  );
}
