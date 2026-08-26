import { Section, SectionHeader } from '../ui'
import { REASONS } from '../../data/site'
import { ResolveIcon } from '../iconMap'

// Bloque "Por qué DSouza" — diferenciadores.
// reasons: lista opcional; por defecto usa REASONS (no cambia otras páginas).
export default function PorQue({
  bg = 'base',
  eyebrow = 'Por qué DSouza',
  title = 'La diferencia: anticiparse al algoritmo',
  subtitle = 'El SAT, el IMSS y el INFONAVIT ya fiscalizan con modelos automáticos e inteligencia artificial. Trabajamos con esa misma lógica para que tu cumplimiento deje de ser una apuesta.',
  reasons = REASONS,
}) {
  return (
    <Section bg={bg}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reasons.map((reason) => (
          <article key={reason.title} className="flex gap-4 rounded-md border border-line bg-tint p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-secondary text-primary">
              <ResolveIcon name={reason.icon} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-secondary">{reason.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{reason.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
