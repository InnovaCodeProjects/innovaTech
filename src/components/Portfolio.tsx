import React from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import libraImg from "../partners_assets/portfolio/libra_site.webp";
import plasaImg from "../partners_assets/portfolio/plasa_site.webp";
import leoImg from "../partners_assets/portfolio/leo_branding.webp";
import farmaImg from "../partners_assets/portfolio/farma_diagram.svg";

const PROJECTS = [
  {
    span: "span4",
    cat: "Landing Page",
    img: libraImg,
    title: "Libra Serv",
    desc: "Landing page profissional moderna para empresa de serviços, design limpo, responsiva e focada em conversão.",
    tags: ["Landing Page", "Responsivo", "SEO"],
    href: "https://libraserv.com",
    delay: "",
  },
  {
    span: "span2",
    cat: "Landing Page",
    img: plasaImg,
    title: "Plasa Consultoria",
    desc: "Landing page profissional para consultoria com identidade visual marcante, navegação fluida, responsividade e alta conversão.",
    tags: ["Landing Page", "Responsivo", "SEO"],
    href: "https://plasaconsultoria.com.br",
    delay: "d1",
  },
  {
    span: "span3",
    cat: "T.I., Infraestrutura",
    img: farmaImg,
    title: "Farmácia Homeopática Lençóis",
    desc: "Rede corporativa em duas sedes conectadas via VPN MikroTik com firewall e monitoramento.",
    tags: ["MikroTik", "VPN", "Firewall"],
    href: "https://farmaciahomeopaticalencois.com.br",
    delay: "",
  },
  {
    span: "span3",
    cat: "Logo, Branding",
    img: leoImg,
    title: "Leo's Tereré",
    desc: "Identidade visual completa com logo e materiais digitais para marca de tereré de Lençóis Paulista.",
    tags: ["Logo", "Branding", "Design"],
    href: "https://www.instagram.com/leosterere/",
    delay: "d1",
  },
];

export default function Portfolio() {
  const ref = useReveal();

  return (
    <section
      className="sec"
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="section-head reveal">
          <h2>
            O que entregamos <span className="grad-text">fala por nós.</span>
          </h2>
        </div>

        <div className="pf-grid">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              className={`pf ${p.span} reveal${p.delay ? " " + p.delay : ""}`}
              href={p.href}
              target="_blank"
              rel="noopener"
            >
              <div className="pf-thumb">
                <span className="pf-cat">{p.cat}</span>
                <img src={p.img} alt={p.title} width="600" height="380" loading="lazy" decoding="async" />
                <span className="pf-arrow">
                  <i className="bi bi-arrow-up-right" />
                </span>
              </div>
              <div className="pf-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pf-meta">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
          <Link className="btn btn-ghost" to="/portfolio">
            Ver todos os projetos <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
