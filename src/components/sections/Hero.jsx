import { Link } from 'react-router-dom'
import { WhatsAppButton } from '../ui'
import { IconArrowRight } from '../Icons'

// Hero reutilizable. Renderiza SIEMPRE el único H1 de la página.
// layout: 'centered' (páginas interiores) | 'split' (Inicio, con visual a la derecha)
export default function Hero({
  eyebrow,
  title,
  subtitle,
  secondary, // { label, to }
  layout = 'centered',
  visual = null,
  ctaLabel,
}) {
  const isSplit = layout === 'split'

  return (
    <section className="relative overflow-hidden bg-tint">
      {/* Detalle decorativo de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="container-site relative py-16 sm:py-20 lg:py-24">
        <div
          className={
            isSplit
              ? 'grid items-center gap-12 lg:grid-cols-2'
              : 'mx-auto max-w-3xl text-center'
          }
        >
          <div className={isSplit ? 'text-left' : ''}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1 className="font-heading text-4xl font-bold leading-tight text-secondary sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className={`lead mt-5 ${isSplit ? '' : 'mx-auto max-w-2xl'}`}>{subtitle}</p>
            )}

            <div
              className={`mt-8 flex flex-wrap gap-3 ${isSplit ? 'justify-start' : 'justify-center'}`}
            >
              <WhatsAppButton>{ctaLabel}</WhatsAppButton>
              {secondary && (
                <Link to={secondary.to} className="btn-secondary">
                  {secondary.label}
                  <IconArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {isSplit && visual && <div className="relative">{visual}</div>}
        </div>
      </div>
    </section>
  )
}
