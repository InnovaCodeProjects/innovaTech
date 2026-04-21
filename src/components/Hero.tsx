import { useEffect, useRef } from "react";
import { ArrowRight, Shield, Zap, CheckCircle2 } from "lucide-react";
import logoImg from "../../assets/Logo.png";

const WA_NUMBER = "5514998040306";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 },
    );
    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center grid-bg overflow-hidden"
      aria-label="Seção principal"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #050505 0%, transparent 15%, transparent 85%, #050505 100%)",
        }}
      />

      {/* Glow blob */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-700/4 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left: content ── */}
          <div>
            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/6 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
              <span className="section-label !text-blue-400 !tracking-widest">
                Especialistas em Tecnologia
              </span>
            </div>

            {/* Headline */}
            <h1 className="reveal reveal-delay-1 font-black leading-[1.04] mb-6 text-[clamp(2.6rem,6vw,4.5rem)] tracking-tight">
              Tecnologia que
              <br />
              <span className="text-gradient-blue">impulsiona</span>
              <br />
              resultados.
            </h1>

            {/* Subtitle */}
            <p className="reveal reveal-delay-2 text-white/55 text-lg leading-relaxed mb-8 max-w-[520px]">
              Da assistência técnica ao desenvolvimento de software — entregamos
              soluções completas para manter sua operação funcionando no mais
              alto nível.
            </p>

            {/* CTAs */}
            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de solicitar um orçamento gratuito.`}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Orçamento Gratuito
                <ArrowRight size={16} />
              </a>
              <a href="#servicos" className="btn-secondary">
                Ver Serviços
              </a>
            </div>

            {/* Trust bullets */}
            <ul className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-3 sm:gap-6">
              {[
                "Diagnóstico grátis",
                "Suporte remoto",
                "Garantia nos serviços",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <CheckCircle2
                    size={14}
                    className="text-blue-400 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: visual ── */}
          <div className="hidden lg:flex items-center justify-center relative h-[440px]">
            {/* Outer orbit ring */}
            <div
              className="absolute w-[360px] h-[360px] rounded-full border border-blue-500/10"
              style={{ animation: "spin 24s linear infinite" }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500/70 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400/30" />
            </div>

            {/* Inner orbit ring */}
            <div
              className="absolute w-[240px] h-[240px] rounded-full border border-white/5"
              style={{ animation: "spin 16s linear infinite reverse" }}
            >
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-white/25" />
            </div>

            {/* Logo center */}
            <div className="relative z-10">
              <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-2xl scale-150" />
              <img
                src={logoImg}
                alt="Innova Tech"
                className="w-32 h-32 relative z-10 drop-shadow-2xl animate-float"
              />
            </div>

            {/* Floating card 1 */}
            <div
              className="absolute top-10 -right-2 glass rounded-2xl p-4 w-44 animate-float"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Shield size={13} className="text-blue-400" />
                <span className="text-xs font-bold text-white">
                  Rede Protegida
                </span>
              </div>
              <p className="text-[11px] text-white/45 leading-relaxed">
                MikroTik configurado e monitorado
              </p>
            </div>

            {/* Floating card 2 */}
            <div
              className="absolute bottom-14 -left-4 glass rounded-2xl p-4 w-44 animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Zap size={13} className="text-green-400" />
                <span className="text-xs font-bold text-white">
                  Suporte Ativo
                </span>
              </div>
              <p className="text-[11px] text-white/45 leading-relaxed">
                Atendimento remoto em minutos
              </p>
            </div>

            {/* Stats pill */}
            <div className="absolute bottom-0 right-8 glass rounded-full px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/80">
                100+ clientes atendidos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
