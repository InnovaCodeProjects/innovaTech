import React from "react";
import { useReveal } from "../hooks/useReveal";

const SERVICES = [
  {
    n: "n1",
    icon: "bi-tools",
    title: "Assistência Técnica",
    detail: "Reparo, formatação, upgrades e montagem completa de PCs.",
    href: "https://wa.me/5514998040306?text=Ol%C3%A1!%20Preciso%20de%20assist%C3%AAncia%20t%C3%A9cnica.",
  },
  {
    n: "n2",
    icon: "bi-headset",
    title: "Suporte Remoto",
    detail: "Remoção de vírus, otimização e resolução à distância.",
    href: "https://wa.me/5514998040306?text=Ol%C3%A1!%20Preciso%20de%20suporte%20remoto.",
  },
  {
    n: "n3",
    icon: "bi-hdd-network",
    title: "Redes & Infraestrutura",
    detail: "MikroTik, firewall, VPN e monitoramento 24/7.",
    href: "https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20um%20projeto%20de%20rede%2Finfraestrutura.",
  },
  {
    n: "n4",
    icon: "bi-code-slash",
    title: "Desenvolvimento de Software",
    detail: "Aplicações web e mobile, APIs e sistemas sob medida.",
    href: "https://wa.me/5514998040306?text=Ol%C3%A1!%20Quero%20desenvolver%20um%20software%2Fsistema.",
  },
  {
    n: "n5",
    icon: "bi-palette2",
    title: "Design & Branding",
    detail: "Sites, apps, identidade visual e landing pages.",
    href: "https://wa.me/5514998040306?text=Ol%C3%A1!%20Tenho%20interesse%20em%20servi%C3%A7os%20de%20design.",
  },
];

const DELAYS = ["d1", "d2", "d3", "d4", "d5"];

export default function Services() {
  const ref = useReveal();

  return (
    <section
      className="sec theme-light"
      id="servicos"
      style={{ textAlign: "center" }}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div
          className="section-head reveal"
          style={{ margin: "0 auto 10px", textAlign: "center", maxWidth: 640 }}
        >
          <h2>
            Do hardware <span className="grad-text">ao código.</span>
          </h2>
          <p style={{ margin: "0 auto" }}>
            Tecnologia na palma da sua mão. Tudo o que você precisa, em um só
            lugar.
          </p>
        </div>

        <div className="flow-wrap reveal">
          <div className="flow-stage">
            <div className="flow-center">
              <img src="/mark-white.png" alt="Innova Tech" />
            </div>
            <svg
              className="flow-lines"
              viewBox="0 0 900 540"
              aria-hidden="true"
            >
              <path d="M450,270 Q270,270 90,270" />
              <path d="M450,270 Q350,155 260,58" />
              <path d="M450,270 Q550,155 640,58" />
              <path d="M450,270 Q630,270 810,270" />
              <path d="M450,270 Q450,390 450,505" />
            </svg>
            {SERVICES.map((s, i) => (
              <a
                key={s.n}
                className={`flow-node ${s.n}`}
                href={s.href}
                target="_blank"
                rel="noopener"
              >
                <div className={`flow-node-inner reveal ${DELAYS[i]}`}>
                  <span className="fi">
                    <i className={`bi ${s.icon}`} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
