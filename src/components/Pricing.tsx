import { CheckCircle2, MessageCircle } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const WA_NUMBER = "5514998040306";

const pricingItems = [
  {
    name: "Formatação Simples",
    price: "R$ 80",
    description:
      "Formatação, instalação do SO, configuração de antivírus. Sem backup.",
    highlight: false,
  },
  {
    name: "Formatação Avançada",
    price: "R$ 100",
    description:
      "Formatação, SO, antivírus, navegadores, Adobe Reader, WinRAR. Com backup incluso.",
    highlight: true,
  },
  {
    name: "Troca de Componentes Simples",
    price: "R$ 40",
    description:
      "Substituição de memória RAM, fonte de alimentação, HD, DVD, SSD e similares.",
    highlight: false,
  },
  {
    name: "Troca de Componentes Avançada",
    price: "R$ 70",
    description:
      "Troca de placa-mãe, processador e cooler com configuração completa.",
    highlight: false,
  },
  {
    name: "Limpeza Simples",
    price: "R$ 100",
    description:
      "Desmontagem completa, limpeza interna e remontagem cuidadosa.",
    highlight: false,
  },
  {
    name: "Limpeza Avançada",
    price: "R$ 150",
    description:
      "Limpeza física interna e externa, formatação e backup completo.",
    highlight: true,
  },
  {
    name: "Montagem Completa de PC",
    price: "R$ 250",
    description:
      "Montagem dos componentes, instalação de gabinete, SO e softwares básicos.",
    highlight: false,
  },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section
      id="precos"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 lg:py-32 px-6"
      aria-label="Tabela de preços"
      style={{
        background: "linear-gradient(to bottom, #050505, #080808, #050505)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="reveal section-label mb-4">Transparência total</p>
          <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-black tracking-tight mb-5">
            Tabela de serviços
          </h2>
          <p className="reveal reveal-delay-2 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Preços claros e sem surpresas. Diagnóstico sempre gratuito.
          </p>
        </div>

        {/* Free diagnosis banner */}
        <div className="reveal reveal-delay-3 my-10 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-green-500/25 bg-green-500/6">
            <CheckCircle2 size={16} className="text-green-400" />
            <span className="text-green-300 font-semibold text-sm">
              Orçamento 100% gratuito — sem compromisso
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {pricingItems.map((item, i) => (
            <div
              key={item.name}
              className={`reveal reveal-delay-${Math.min((i % 3) + 1, 4)} relative rounded-2xl p-6 transition-all duration-300 ${
                item.highlight
                  ? "border border-blue-500/35 bg-blue-950/15"
                  : "card-innova"
              }`}
            >
              {item.highlight && (
                <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-bold text-base leading-snug">
                  {item.name}
                </h3>
                <span className="text-blue-400 font-black text-lg flex-shrink-0">
                  {item.price}
                </span>
              </div>
              <p className="text-white/45 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note + CTA */}
        <div className="reveal text-center">
          <p className="text-white/35 text-sm mb-8">
            * Valores de peças e componentes cobrados à parte. Preços sujeitos a
            alteração.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Olá! Vi a tabela de serviços e gostaria de um orçamento.`}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            Solicitar via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
