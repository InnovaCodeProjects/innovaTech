import { Wrench, MonitorSmartphone, Network, Code2, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const services = [
  {
    icon: Wrench,
    title: 'Assistência Técnica',
    description:
      'Diagnóstico, reparo e manutenção de computadores e notebooks. Formatações, trocas de componentes, limpeza interna e upgrades de hardware com qualidade garantida.',
    features: [
      'Formatação e reinstalação do SO',
      'Troca de HD, SSD, RAM',
      'Limpeza interna e externa',
      'Montagem completa de PCs',
    ],
    badge: 'Diagnóstico Grátis',
    badgeColor: 'text-green-400 bg-green-400/8 border-green-400/20',
    accentColor: '#3b82f6',
  },
  {
    icon: MonitorSmartphone,
    title: 'Suporte Remoto',
    description:
      'Resolução ágil de problemas de software, vírus, configurações e instalações sem sair de casa. Atendimento especializado direto no seu dispositivo.',
    features: [
      'Remoção de vírus e malware',
      'Instalação de programas',
      'Configuração e otimização',
      'Suporte a distância',
    ],
    badge: 'Atendimento Rápido',
    badgeColor: 'text-blue-400 bg-blue-400/8 border-blue-400/20',
    accentColor: '#2563eb',
  },
  {
    icon: Network,
    title: 'Redes & Infraestrutura',
    description:
      'Projetos completos de redes corporativas e residenciais. Configuração avançada de MikroTik, firewall, controle de acesso e monitoramento em tempo real.',
    features: [
      'Configuração MikroTik',
      'Firewall e VPN',
      'Controle de banda e acesso',
      'Monitoramento em tempo real',
    ],
    badge: 'Alta Performance',
    badgeColor: 'text-purple-400 bg-purple-400/8 border-purple-400/20',
    accentColor: '#7c3aed',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento de Software',
    description:
      'Aplicações web, mobile e integrações personalizadas. Desenvolvemos com foco em performance, usabilidade e experiência do usuário, entregando valor real ao seu negócio.',
    features: [
      'Aplicações web e mobile',
      'APIs e integrações',
      'Sistemas personalizados',
      'Design responsivo (UI/UX)',
    ],
    badge: 'Sob Medida',
    badgeColor: 'text-orange-400 bg-orange-400/8 border-orange-400/20',
    accentColor: '#ea580c',
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section
      id="servicos"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 lg:py-32 px-6"
      aria-label="Serviços"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal section-label mb-4">O que fazemos</p>
          <h2 className="reveal reveal-delay-1 text-4xl lg:text-5xl font-black tracking-tight mb-5">
            Soluções completas em TI
          </h2>
          <p className="reveal reveal-delay-2 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            De hardware a software, da rede ao código — cobrimos toda a sua operação digital.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} card-innova rounded-2xl p-8 group cursor-default`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${service.accentColor}15` }}
                  >
                    <Icon
                      size={22}
                      style={{ color: service.accentColor }}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-white/65">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: service.accentColor }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <a
                  href="#contato"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                  style={{ color: service.accentColor }}
                >
                  Solicitar serviço
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
