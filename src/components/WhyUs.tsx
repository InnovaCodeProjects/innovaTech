import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const differentials = [
  {
    icon: ShieldCheck,
    title: "Diagnóstico Gratuito",
    description:
      "Avaliamos seu equipamento ou projeto sem custo algum. Você só paga se decidir continuar.",
    color: "#22c55e",
  },
  {
    icon: Zap,
    title: "Atendimento Ágil",
    description:
      "Suporte remoto rápido e manutenções com prazo definido. Sabemos que tempo parado custa caro.",
    color: "#f59e0b",
  },
  {
    icon: HeartHandshake,
    title: "Equipe Especializada",
    description:
      "Profissionais com experiência real em hardware, redes MikroTik e desenvolvimento de software.",
    color: "#3b82f6",
  },
  {
    icon: Star,
    title: "Garantia nos Serviços",
    description:
      "Todos os nossos serviços têm garantia. Resolvemos ou voltamos sem custo adicional.",
    color: "#a855f7",
  },
  {
    icon: TrendingUp,
    title: "Soluções Escaláveis",
    description:
      "Desenvolvemos pensando no crescimento do seu negócio — seja uma rede, um sistema ou uma infraestrutura.",
    color: "#06b6d4",
  },
  {
    icon: Users,
    title: "Foco no Cliente",
    description:
      "Entendemos o problema antes de propor a solução. Não vendemos tecnologia, entregamos resultados.",
    color: "#ec4899",
  },
];

const stats = [
  { value: "+100", label: "Clientes atendidos" },
  { value: "4+", label: "Anos de experiência" },
  { value: "24h", label: "Suporte remoto disponível" },
  { value: "100%", label: "Orçamento gratuito" },
];

export default function WhyUs() {
  const ref = useReveal();

  return (
    <section
      id="diferenciais"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 lg:py-32 px-6"
      aria-label="Diferenciais"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal section-label mb-4">Por que nos escolher</p>
          <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-black tracking-tight mb-5">
            A diferença está nos detalhes
          </h2>
          <p className="reveal reveal-delay-2 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Mais do que resolver problemas — construímos relações de confiança e
            entregamos valor real.
          </p>
        </div>

        {/* Differentials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {differentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`reveal reveal-delay-${Math.min((i % 3) + 1, 4)} card-innova rounded-2xl p-7 group`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}14` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-base mb-2.5">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="reveal rounded-2xl border border-white/6 bg-white/2 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/6 overflow-hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-6 text-center"
            >
              <span className="text-3xl font-black text-white mb-1.5">
                {stat.value}
              </span>
              <span className="text-sm text-white/45 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
