import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState(2026)
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#topo" className="brand">
              <span className="mark"><img src="/mark-white.png" alt="" /></span>
              <span className="name">INNOVA<b>TECH</b></span>
            </a>
            <p className="fdesc">
              Inovando o amanhã, hoje. Soluções de TI de alto nível para empresas e pessoas — da assistência ao código.
            </p>
            <div className="socials">
              <a href="https://www.instagram.com/innovatech.exe/" target="_blank" rel="noopener" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="https://wa.me/5514998040306" target="_blank" rel="noopener" aria-label="WhatsApp">
                <i className="bi bi-whatsapp" />
              </a>
              <a href="mailto:innovatech.assistencia@gmail.com" aria-label="E-mail">
                <i className="bi bi-envelope" />
              </a>
            </div>
          </div>

          <div className="fcol">
            <h4>Serviços</h4>
            <ul>
              <li><a href="#servicos">Assistência Técnica</a></li>
              <li><a href="#servicos">Suporte Remoto</a></li>
              <li><a href="#servicos">Redes & Infraestrutura</a></li>
              <li><a href="#servicos">Desenvolvimento</a></li>
            </ul>
          </div>

          <div className="fcol">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#portfolio">Projetos</a></li>
              <li><a href="#processo">Como trabalhamos</a></li>
              <li><a href="#numeros">Em números</a></li>
              <li><a href="#planos">Planos</a></li>
            </ul>
          </div>

          <div className="fcol">
            <h4>Contato</h4>
            <ul>
              <li>
                <a href="https://wa.me/5514998040306" target="_blank" rel="noopener">
                  <i className="bi bi-whatsapp" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:innovatech.assistencia@gmail.com">
                  <i className="bi bi-envelope" /> E-mail
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/innovatech.exe/" target="_blank" rel="noopener">
                  <i className="bi bi-instagram" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Innova Tech. Todos os direitos reservados.</p>
          <p className="tag">"Inovando o amanhã, hoje."</p>
        </div>
      </div>
    </footer>
  )
}
