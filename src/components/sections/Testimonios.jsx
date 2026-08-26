import { Section, SectionHeader } from '../ui'
import { TESTIMONIALS } from '../../data/site'
import { IconStar } from '../Icons'

// Fila de estrellas para calificación ilustrativa (opcional).
function Rating({ value }) {
  return (
    <div className="mb-3 flex gap-0.5 text-accent" aria-label={`Calificación: ${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className={`h-4 w-4 ${i < value ? 'text-accent' : 'text-line'}`} aria-hidden />
      ))}
    </div>
  )
}

// Testimonios claramente ILUSTRATIVOS — reemplazar por reales antes de producción.
// items: lista opcional; por defecto usa TESTIMONIALS (no cambia otras páginas).
// variant: 'grid' (3 tarjetas) | 'featured' (una cita destacada grande).
export default function Testimonios({
  bg = 'base',
  items = TESTIMONIALS,
  variant = 'grid',
  eyebrow = 'Testimonios',
  title = 'Lo que buscamos que sientas al trabajar con nosotros',
  subtitle = 'Ejemplos ilustrativos del tipo de experiencia y claridad que ofrecemos. Se reemplazarán por testimonios reales con autorización de cada cliente.',
}) {
  const featured = variant === 'featured'
  const t0 = items[0]

  return (
    <Section bg={bg}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      {featured ? (
        // TESTIMONIO DE EJEMPLO — reemplazar por real
        <figure className="mx-auto mt-12 max-w-3xl rounded-md border border-line bg-base p-8 text-center shadow-card sm:p-12">
          <span className="mb-5 inline-flex rounded-md bg-tint px-2.5 py-0.5 text-xs font-medium text-muted">
            Ejemplo ilustrativo
          </span>
          <span aria-hidden className="block font-heading text-6xl leading-none text-primary/25">
            “
          </span>
          <blockquote className="-mt-4 font-heading text-2xl font-medium leading-snug text-secondary sm:text-3xl">
            {t0.quote}
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted">
            <span className="font-semibold text-secondary">{t0.name}</span>
            {t0.role ? ` · ${t0.role}` : ''}
          </figcaption>
        </figure>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            // TESTIMONIO DE EJEMPLO — reemplazar por real
            <figure key={i} className="card flex flex-col">
              <span className="mb-3 inline-flex w-fit rounded-md bg-tint px-2 py-0.5 text-xs font-medium text-muted">
                Ejemplo ilustrativo
              </span>
              {t.rating ? <Rating value={t.rating} /> : null}
              <blockquote className="flex-1 text-base leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                {t.initials ? (
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-heading text-sm font-bold text-primary"
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-secondary">{t.name}</p>
                      <p className="text-sm text-muted">{t.role}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-heading font-semibold text-secondary">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  )
}
