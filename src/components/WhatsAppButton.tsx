import { MessageCircle } from "lucide-react";

const WA_NUMBER = "5514998040306";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=Olá! Vim pelo site e gostaria de um orçamento.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-10 scale-110 animate-pulse" />

      {/* Button */}
      <div className="relative flex items-center gap-2 bg-green-500 hover:bg-green-400 transition-all duration-200 rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-400/40 group-hover:-translate-y-1 px-5 py-3.5">
        <MessageCircle size={20} className="text-white flex-shrink-0" />
        <span className="text-white text-sm font-semibold hidden sm:inline">
          Falar no WhatsApp
        </span>
      </div>
    </a>
  );
}
