import { Link } from 'react-router-dom'
import { CONTACT, FOOTER_LINKS, SERVICES, WHATSAPP_URL } from '../data/site'
import { IconLinkedIn, IconWhatsApp, IconMapPin, IconClock, IconMail } from './Icons'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/80">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca + LinkedIn */}
          <div>
            <div className="flex items-center gap-2 font-heading text-lg font-bold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-white/10 text-primary">
                D
              </span>
              DSouza
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Despacho contable y fiscal en Mexicali, B.C. Contabilidad al día, asesoría
              preventiva y auditoría algorítmica de CFDI. Atención a distancia en Baja California y
              Puerto Peñasco, Sonora.
            </p>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Daniel Souza"
              className="mt-5 inline-grid h-10 w-10 place-items-center rounded-md border border-white/20 text-white transition-colors hover:border-primary hover:text-primary"
            >
              <IconLinkedIn className="h-5 w-5" />
            </a>
          </div>

          {/* Enlaces rápidos */}
          <nav aria-label="Enlaces rápidos">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Enlaces rápidos
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav aria-label="Servicios">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Servicios</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <Link to="/servicios" className="transition-colors hover:text-primary">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-2.5">
                <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{CONTACT.hours}</span>
              </li>
              <li className="flex gap-2.5">
                <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <IconWhatsApp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-sm text-white/60 sm:flex-row">
          <p>© 2026 DSouza Consultores Fiscales. Todos los derechos reservados.</p>
          <Link to="/aviso-de-privacidad" className="transition-colors hover:text-primary">
            Aviso de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
