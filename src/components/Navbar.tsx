import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "../../assets/Logo2.png";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#precos", label: "Preços" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];

const WA_NUMBER = "55914998040306";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="Innova Tech — página inicial"
        >
          <img
            src={logoImg}
            alt="Innova Tech logo"
            className="h-12 w-12 rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-black text-base tracking-tight">
            INNOVA<span className="text-blue-400">TECH</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
            className="btn-primary !py-2.5 !px-6 !text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Orçamento Grátis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 -mr-2"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 px-6 pt-4 pb-6">
          <ul className="flex flex-col gap-5 mb-6" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors font-medium text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`}
            className="btn-primary w-full !text-sm"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Orçamento Grátis
          </a>
        </div>
      )}
    </header>
  );
}
