import React from "react";
import Icon, { type IconName } from './Icon'
import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";
import { waLink } from "../utils/format";

const ICONS: IconName[] = ["tools", "headset", "hdd-network", "code-slash", "palette2"];
const DELAYS = ["d1", "d2", "d3", "d4", "d5"];

type ServiceItem = { title: string; detail: string; waMessage: string };

export default function Services() {
  const { t } = useTranslation();
  const ref = useReveal();
  const items = t("services.items", { returnObjects: true }) as ServiceItem[];
  const SERVICES = items.map((s, i) => ({ n: `n${i + 1}`, icon: ICONS[i], ...s, href: waLink(s.waMessage) }));

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
            {t("services.heading1")} <span className="grad-text">{t("services.heading2")}</span>
          </h2>
          <p style={{ margin: "0 auto" }}>
            {t("services.lead")}
          </p>
        </div>

        <div className="flow-wrap reveal">
          <div className="flow-stage">
            <div className="flow-center">
              <img src="/mark-white.png" alt={t("services.logoAlt") as string} />
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
                    <Icon name={s.icon} />
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
