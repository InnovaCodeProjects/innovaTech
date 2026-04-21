import { MessageCircle, Mail, ArrowRight } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const WA_NUMBER = "5514998040306";
const EMAIL = "innovatech.assistencia@gmail.com";

export default function CTA() {
  const ref = useReveal();

  return (
    <section
      id="contato"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 lg:py-32 px-6 relative overflow-hidden"
      aria-label="Contato e CTA"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #050505 0%, transparent 20%, transparent 80%, #050505 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/6 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="section-label">Fale com a gente</span>
        </div>

        {/* Headline */}
        <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.05]">
          Pronto para transformar
          <br />
          <span className="text-gradient-blue">sua operação?</span>
        </h2>

        <p className="reveal reveal-delay-2 text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Entre em contato agora e receba um diagnóstico gratuito. Respondemos
          rapidamente e sem compromisso.
        </p>

        {/* Buttons */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de um diagnóstico gratuito para minha empresa.`}
            className="btn-primary !py-4 !px-8 !text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            Falar pelo WhatsApp
            <ArrowRight size={16} />
          </a>
          <a
            href={`mailto:${EMAIL}?subject=Solicitar orçamento — Innova Tech`}
            className="btn-secondary !py-4 !px-8 !text-base"
          >
            <Mail size={18} />
            Enviar e-mail
          </a>
        </div>

        {/* Contact info */}
        <div className="reveal reveal-delay-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/35">
          <div className="flex items-center gap-2">
            <MessageCircle size={14} className="text-green-400" />
            <span>WhatsApp disponível</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/15" />
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-blue-400" />
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-white/70 transition-colors"
            >
              {EMAIL}
            </a>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/15" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span>Resposta em até 1h</span>
          </div>
        </div>
      </div>
    </section>
  );
}
