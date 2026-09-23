import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useReveal } from "../hooks/useReveal";

type TermLine = {
  html: string;
  type?: boolean;
  delay?: number;
};

function buildLines(t: (key: string) => string): TermLine[] {
  return [
    {
      html: '<span class="prompt">innova@deploy</span><span class="mut">:~$</span> <span class="cmd">innova build --client "cafe-central"</span>',
      type: true,
    },
    {
      html: `<span class="ok">✓</span> <span class="mut">${t("terminal.depsResolved")}</span>`,
      delay: 350,
    },
    {
      html: `<span class="ok">✓</span> ${t("terminal.buildDone")} <span class="mut">2.4s</span>`,
      delay: 500,
    },
    {
      html: `<span class="ok">✓</span> ${t("terminal.testsLabel")} <span class="mut">${t("terminal.testsResult")}</span>`,
      delay: 500,
    },
    {
      html: '<span class="prompt">innova@deploy</span><span class="mut">:~$</span> <span class="cmd">innova ship --prod</span>',
      type: true,
      delay: 600,
    },
    {
      html: `<span class="ok">✓</span> ${t("terminal.deployProd")} <span class="mut">${t("terminal.region")}</span>`,
      delay: 600,
    },
    {
      html: `<span class="url">→ https://cafecentral.app</span>  <span class="ok">${t("terminal.online")}</span>`,
      delay: 450,
    },
  ];
}

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
  const { t } = useTranslation();
  const sectionRef = useReveal();
  const bodyRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const lines = buildLines(t);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    function runTerminal() {
      const caret = document.createElement("span");
      caret.className = "term-caret";
      let idx = 0;

      function next() {
        if (idx >= lines.length) {
          body!.appendChild(caret);
          return;
        }
        const spec = lines[idx];
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
    // Deliberately only re-run on mount: lines are read once when the
    // animation starts, restarting on every language change would replay it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <h2>
            {t("terminal.heading1")} <span className="grad-text">{t("terminal.heading2")}</span>
          </h2>
          <p>
            {t("terminal.lead")}
          </p>
          <div className="term-stack">
            {(t("terminal.stack", { returnObjects: true }) as string[]).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
