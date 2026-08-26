import { Section, SectionHeader } from '../ui'
import { PROCESS } from '../../data/site'

// Proceso de trabajo en 4 pasos.
export default function Proceso({ bg = 'tint' }) {
  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Cómo trabajamos"
        title="De la incertidumbre a un cumplimiento ordenado"
        subtitle="Un proceso claro que empieza por entender tu riesgo real y termina en un acompañamiento que no te suelta a mitad del año."
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((item) => (
          <li key={item.step} className="card relative">
            <span
              aria-hidden
              className="font-heading text-4xl font-bold text-primary/25"
            >
              {item.step}
            </span>
            <h3 className="mt-2 font-heading text-lg font-semibold text-secondary">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
