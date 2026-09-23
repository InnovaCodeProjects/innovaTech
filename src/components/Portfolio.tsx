import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import libraImg from "../partners_assets/portfolio/libra_site.webp";
import plasaImg from "../partners_assets/portfolio/plasa_site.webp";
import leoImg from "../partners_assets/portfolio/leo_branding.webp";
import farmaImg from "../partners_assets/portfolio/farma_diagram.svg";

const PROJECTS_META = [
  { span: "span4", img: libraImg, title: "Libra Serv", href: "https://libraserv.com", delay: "" },
  { span: "span2", img: plasaImg, title: "Plasa Consultoria", href: "https://plasaconsultoria.com.br", delay: "d1" },
  { span: "span3", img: farmaImg, title: "Farmácia Homeopática Lençóis", href: "https://farmaciahomeopaticalencois.com.br", delay: "" },
  { span: "span3", img: leoImg, title: "Leo's Tereré", href: "https://www.instagram.com/leosterere/", delay: "d1" },
];

type ProjectText = { cat: string; desc: string; tags: string[] };

export default function Portfolio() {
  const { t } = useTranslation();
  const ref = useReveal();
  const texts = t("portfolioHome.projects", { returnObjects: true }) as ProjectText[];
  const PROJECTS = PROJECTS_META.map((p, i) => ({ ...p, ...texts[i] }));

  return (
    <section
      className="sec"
      id="portfolio"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="wrap">
        <div className="section-head reveal">
          <h2>
            {t("portfolioHome.heading1")} <span className="grad-text">{t("portfolioHome.heading2")}</span>
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
            {t("portfolioHome.viewAllButton")} <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
