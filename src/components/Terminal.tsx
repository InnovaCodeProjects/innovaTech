import React, { useEffect, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

type TermLine = {
  html: string;
  type?: boolean;
  delay?: number;
};

const LINES: TermLine[] = [
  {
    html: '<span class="prompt">innova@deploy</span><span class="mut">:~$</span> <span class="cmd">innova build --client "cafe-central"</span>',
    type: true,
  },
  {
    html: '<span class="ok">✓</span> <span class="mut">dependências resolvidas</span>',
    delay: 350,
  },
  {
    html: '<span class="ok">✓</span> build concluído <span class="mut">2.4s</span>',
    delay: 500,
  },
  {
    html: '<span class="ok">✓</span> testes <span class="mut">42/42 passaram</span>',
    delay: 500,
  },
  {
    html: '<span class="prompt">innova@deploy</span><span class="mut">:~$</span> <span class="cmd">innova ship --prod</span>',
    type: true,
    delay: 600,
  },
  {
    html: '<span class="ok">✓</span> deploy em produção <span class="mut">· região br-se1</span>',
    delay: 600,
  },
  {
    html: '<span class="url">→ https://cafecentral.app</span>  <span class="ok">online ✦</span>',
    delay: 450,
  },
];

function typeText(node: HTMLElement, text: string, done: () => void) {
  let i = 0;
  const tick = () => {
    if (i > text.length) {
      done();
      return;
    }
    node.textContent = text.slice(0, i);
    i++;
    setTimeout(tick, 26 + Math.random() * 34);
  };
  tick();
}

export default function Terminal() {
  const sectionRef = useReveal();
  const bodyRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    function runTerminal() {
      const caret = document.createElement("span");
      caret.className = "term-caret";
      let idx = 0;

      function next() {
        if (idx >= LINES.length) {
          body!.appendChild(caret);
          return;
        }
        const spec = LINES[idx];
        const line = document.createElement("div");
        line.className = "term-line";
        body!.appendChild(line);
        body!.appendChild(caret);
        idx++;
        if (spec.type) {
          const tmp = document.createElement("div");
          tmp.innerHTML = spec.html;
          const plain = tmp.textContent ?? "";
          typeText(line, plain, () => {
            line.innerHTML = spec.html;
            setTimeout(next, spec.delay ?? 300);
          });
        } else {
          line.innerHTML = spec.html;
          setTimeout(next, spec.delay ?? 300);
        }
      }
      next();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setTimeout(runTerminal, 300);
          }
        });
      },
      { threshold: 0.45 },
    );
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="sec term-sec"
      id="software"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="wrap term-inner">
        <div className="terminal reveal">
          <div className="term-bar">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
            <span className="ttl">innova — deploy</span>
          </div>
          <div className="term-body" ref={bodyRef} />
        </div>

        <div className="term-copy reveal d1">
          <span className="eyebrow">
            <span className="idx">04</span> Desenvolvimento
          </span>
          <h2>
            Do diagnóstico <span className="grad-text">ao deploy.</span>
          </h2>
          <p>
            Software sob medida que resolve um problema real — rápido, testado e
            no ar. Web, mobile e integrações feitas para crescer com o seu
            negócio.
          </p>
          <div className="term-stack">
            {[
              "Web Apps",
              "Apps Mobile",
              "Integrações",
              "Automações",
              "MVPs",
              "SaaS",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
