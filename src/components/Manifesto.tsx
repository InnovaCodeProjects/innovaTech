import React from "react";
import { useReveal } from "../hooks/useReveal";

export default function Manifesto() {
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
          Não somos o T.I. de ninguém. <span className="mut">Somos uma</span>{" "}
          solução <span className="mut">com</span> propósito de inovação.
        </blockquote>
        <p className="sig">— Innova Tech · Inovando o amanhã, hoje</p>
      </div>
    </section>
  );
}
