import { Link } from 'react-router-dom'
import { Section, WhatsAppButton } from '../ui'
import { IconArrowRight } from '../Icons'

// Estado vacío diseñado (“próximamente” / “en construcción”) — evita la
// sensación de página rota: ícono, chip de estado, mensaje, adelanto y CTA.
export default function EstadoVacio({
  bg = 'tint',
  icon, // ReactNode
  statusLabel = 'Próximamente',
  title,
  description,
  items = [], // [{ icon: ReactNode, label, desc }]
  note, // línea extra opcional (p. ej., propuesta de valor Premium)
  ctaLabel = 'Pregunta por WhatsApp',
  secondary, // { label, to }
}) {
  return (
    <Section bg={bg}>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-md border border-line bg-base p-8 text-center shadow-card sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-md bg-primary/10 text-primary-dark">
            {icon}
          </span>

          <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent/15 px-3 py-1 text-sm font-semibold text-accent-dark">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            {statusLabel}
          </span>

          <h2 className="mt-4 font-heading text-2xl font-semibold text-secondary sm:text-3xl">
            {title}
          </h2>
          {description && <p className="lead mx-auto mt-3 max-w-xl">{description}</p>}

          {items.length > 0 && (
            <ul className="mx-auto mt-8 grid gap-4 text-left sm:grid-cols-3">
              {items.map((it) => (
                <li key={it.label} className="rounded-md border border-line bg-tint p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-primary">
                    {it.icon}
                  </span>
                  <p className="mt-3 font-heading text-sm font-semibold text-secondary">{it.label}</p>
                  {it.desc && <p className="mt-1 text-sm text-muted">{it.desc}</p>}
                </li>
              ))}
            </ul>
          )}

          {note && (
            <p className="mx-auto mt-8 max-w-xl rounded-md border border-line bg-tint px-4 py-3 text-sm text-secondary">
              {note}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton>{ctaLabel}</WhatsAppButton>
            {secondary && (
              <Link to={secondary.to} className="btn-secondary">
                {secondary.label}
                <IconArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
