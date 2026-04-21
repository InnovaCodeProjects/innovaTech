import { MessageCircle, Mail, Github, Instagram, Linkedin } from "lucide-react";
import logoImg from "../../assets/Logo.png";

const WA_NUMBER = "5514998040306";
const EMAIL = "innovatech.assistencia@gmail.com";

const links = {
  services: [
    { label: "Assistência Técnica", href: "#servicos" },
    { label: "Suporte Remoto", href: "#servicos" },
    { label: "Redes & Infraestrutura", href: "#servicos" },
    { label: "Desenvolvimento de Software", href: "#servicos" },
  ],
  company: [
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Tabela de Preços", href: "#precos" },
    { label: "Contato", href: "#contato" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/5 bg-innova-dark px-6 pt-16 pb-8"
      aria-label="Rodapé"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-3 mb-4"
              aria-label="Innova Tech"
            >
              <img
                src={logoImg}
                alt="Innova Tech"
                className="h-9 w-9 rounded-full"
              />
              <span className="font-black text-base tracking-tight">
                INNOVA<span className="text-blue-400">TECH</span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-[220px]">
              Inovando o amanhã, hoje. Soluções de TI de alto nível para
              empresas e pessoas.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Spacer on lg */}
          <div className="hidden lg:block" />

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              Serviços
            </h3>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              Empresa
            </h3>
            <ul className="space-y-3 mb-8">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-green-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-blue-400 transition-colors duration-200"
                >
                  <Mail size={13} />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-sm">
            © {year} Innova Tech. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs">"Inovando o amanhã, hoje."</p>
        </div>
      </div>
    </footer>
  );
}
