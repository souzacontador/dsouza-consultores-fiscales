import { Link } from 'react-router-dom'
import { Section, SectionHeader } from '../ui'
import { SERVICES } from '../../data/site'
import { ResolveIcon } from '../iconMap'
import { IconArrowRight } from '../Icons'

// 4 tarjetas de servicio con ícono SVG (nunca emojis en producción).
export default function Servicios({ bg = 'tint', showCta = true }) {
  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Servicios"
        title="Cuatro frentes para que cumplas sin sustos"
        subtitle="Contabilidad, prevención, auditoría algorítmica y capacitación — bajo un mismo responsable que entiende cómo te fiscaliza la autoridad."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <article key={service.title} className="card flex flex-col transition-shadow hover:shadow-card-hover">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary-dark">
              <ResolveIcon name={service.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-heading text-lg font-semibold text-secondary">
              {service.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.desc}</p>
          </article>
        ))}
      </div>

      {showCta && (
        <div className="mt-10 text-center">
          <Link to="/servicios" className="btn-secondary">
            Ver todos los servicios
            <IconArrowRight className="h-5 w-5" />
          </Link>
        </div>
      )}
    </Section>
  )
}
