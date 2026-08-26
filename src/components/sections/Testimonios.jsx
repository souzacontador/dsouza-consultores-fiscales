import { Section, SectionHeader } from '../ui'
import { TESTIMONIALS } from '../../data/site'

// Testimonios claramente ILUSTRATIVOS — reemplazar por reales antes de producción.
export default function Testimonios({ bg = 'base' }) {
  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Testimonios"
        title="Lo que buscamos que sientas al trabajar con nosotros"
        subtitle="Ejemplos ilustrativos del tipo de experiencia y claridad que ofrecemos. Se reemplazarán por testimonios reales con autorización de cada cliente."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          // TESTIMONIO DE EJEMPLO — reemplazar por real
          <figure key={i} className="card flex flex-col">
            <span className="mb-3 inline-flex w-fit rounded-md bg-tint px-2 py-0.5 text-xs font-medium text-muted">
              Ejemplo ilustrativo
            </span>
            <blockquote className="flex-1 text-base leading-relaxed text-ink">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="font-heading font-semibold text-secondary">{t.name}</p>
              <p className="text-sm text-muted">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
