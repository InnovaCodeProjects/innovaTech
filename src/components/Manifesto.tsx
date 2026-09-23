import React from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";

export default function Manifesto() {
  const { t } = useTranslation();
  const ref = useReveal();

  return (
    <section className="manifesto" ref={ref as React.RefObject<HTMLElement>}>
      <img
        className="wm-manifesto"
        src="/mark-white.png"
        alt=""
        aria-hidden="true"
      />
      <div className="glow" />
      <div className="wrap manifesto-inner reveal">
        <blockquote>
          {t("manifesto.quotePart1")} <span className="mut">{t("manifesto.quoteWord1")}</span>{" "}
          {t("manifesto.quotePart2")} <span className="mut">{t("manifesto.quoteWord2")}</span>
        </blockquote>
        <p className="sig">{t("manifesto.signature")}</p>
      </div>
    </section>
  );
}
