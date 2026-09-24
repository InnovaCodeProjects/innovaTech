import { useEffect, useState } from "react";
import Icon from './Icon'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SectionLink from "./SectionLink";

export default function Footer() {
  const { t } = useTranslation();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <SectionLink id="topo" className="brand">
              <img
                className="brand-logo"
                src="/logo-corrida.png"
                alt="Innova Tech"
                width="62"
                height="32"
                loading="lazy"
                decoding="async"
              />
            </SectionLink>
            <p className="fdesc">
              {t("footer.desc")}
            </p>
            <div className="socials">
              <a
                href="https://www.instagram.com/innovatech.exe/"
                target="_blank"
                rel="noopener"
                aria-label={t("footer.socialAria.instagram") as string}
              >
                <Icon name="instagram" />
              </a>
              <a
                href="https://wa.me/5514998040306"
                target="_blank"
                rel="noopener"
                aria-label={t("footer.socialAria.whatsapp") as string}
              >
                <Icon name="whatsapp" />
              </a>
              <a
                href="mailto:innovatech.assistencia@gmail.com"
                aria-label={t("footer.socialAria.email") as string}
              >
                <Icon name="envelope" />
              </a>
            </div>
          </div>

          <div className="fcol">
            <h3>{t("footer.servicesHeading")}</h3>
            <ul>
              {(t("footer.servicesItems", { returnObjects: true }) as string[]).map((item) => (
                <li key={item}>
                  <SectionLink id="servicos">{item}</SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="fcol">
            <h3>{t("footer.companyHeading")}</h3>
            <ul>
              <li>
                <Link to="/portfolio">{t("footer.companyItems.projects")}</Link>
              </li>
              <li>
                <SectionLink id="processo">{t("footer.companyItems.howWeWork")}</SectionLink>
              </li>
              <li>
                <SectionLink id="numeros">{t("footer.companyItems.numbers")}</SectionLink>
              </li>
              <li>
                <SectionLink id="planos">{t("footer.companyItems.plans")}</SectionLink>
              </li>
            </ul>
          </div>

          <div className="fcol">
            <h3>{t("footer.contactHeading")}</h3>
            <ul>
              <li>
                <a
                  href="https://wa.me/5514998040306"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="whatsapp" /> {t("footer.contactItems.whatsapp")}
                </a>
              </li>
              <li>
                <a href="mailto:innovatech.assistencia@gmail.com">
                  <Icon name="envelope" /> {t("footer.contactItems.email")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/innovatech.exe/"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="instagram" /> {t("footer.contactItems.instagram")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright", { year })}</p>
          <p className="tag">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
