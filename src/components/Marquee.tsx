import farmaciaLogo from '../partners_assets/logos/farmacia.webp'
import leoLogo from '../partners_assets/logos/leo.png'
import libraLogo from '../partners_assets/logos/libra.png'
import plasaLogo from '../partners_assets/logos/plasa.png'

const CLIENTS = [
  { src: libraLogo, alt: 'Libra Serv' },
  { src: plasaLogo, alt: 'Plasa Consultoria' },
  { src: farmaciaLogo, alt: 'Farmácia Homeopática Lençóis' },
  { src: leoLogo, alt: "Leo's Tereré" },
]

export default function Marquee() {
  const doubled = [...CLIENTS, ...CLIENTS]

  return (
    <section className="marquee-sec" aria-label="Empresas que confiam na Innova Tech">
      <div className="wrap">
        <p className="marquee-label">Empresas que já confiaram no nosso trabalho</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((client, i) => (
            <span key={i} className="client2">
              <img className="client-logo" src={client.src} alt={client.alt} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
