import { Link } from 'react-router-dom'
import { Section, WhatsAppButton } from '../ui'
import { ResolveIcon } from '../iconMap'
import { IconCheck, IconArrowRight } from '../Icons'

// Bloque media + texto alternable.
// reverse=true coloca el media a la derecha (por defecto a la izquierda).
export default function MediaTexto({
  bg = 'base',
  reverse = false,
  eyebrow,
  title,
  paragraphs = [],
  bullets = [],
  icon = 'radar',
  mediaCaption,
  mediaKicker,
  media = null, // ReactNode: imagen/ilustración. Si se pasa, sustituye al panel de ícono.
  whatsapp = false,
  secondary, // { label, to }
}) {
  return (
    <Section bg={bg}>
      {/* En móvil el media va primero (arriba); en desktop alterna con reverse. */}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Media */}
        <div className={reverse ? 'lg:order-2' : ''}>
          {media ? (
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-line shadow-card">
              {media}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-md border border-line bg-tint p-8 shadow-card">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
              />
              <span className="relative grid h-14 w-14 place-items-center rounded-md bg-secondary text-primary">
                <ResolveIcon name={icon} className="h-7 w-7" />
              </span>
              {mediaKicker && (
                <p className="relative mt-6 text-sm font-semibold uppercase tracking-wider text-primary-dark">
                  {mediaKicker}
                </p>
              )}
              {mediaCaption && (
                <p className="relative mt-2 font-heading text-xl font-semibold leading-snug text-secondary">
                  {mediaCaption}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Texto */}
        <div className={reverse ? 'lg:order-1' : ''}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="font-heading text-3xl font-semibold leading-tight text-secondary sm:text-4xl">
            {title}
          </h2>
          {paragraphs.length > 0 && (
            <div className="prose-body mt-4">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {bullets.length > 0 && (
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary-dark">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-base text-ink">{b}</span>
                </li>
              ))}
            </ul>
          )}

          {(whatsapp || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {whatsapp && <WhatsAppButton />}
              {secondary && (
                <Link to={secondary.to} className="btn-secondary">
                  {secondary.label}
                  <IconArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
