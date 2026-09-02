import { Section, SectionHeader } from '../ui'
import { PROCESS } from '../../data/site'

// Proceso de trabajo en 3 pasos.
export default function Proceso({ bg = 'tint' }) {
  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Cómo trabajamos"
        title="Empezar es simple: tres pasos"
        subtitle="De un mensaje de WhatsApp a un cumplimiento ordenado, con acompañamiento que no te suelta a mitad del año."
      />

      <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
        {PROCESS.map((item) => (
          <li key={item.step} className="card relative">
            <span aria-hidden className="font-heading text-4xl font-bold text-primary/40">
              {item.step}
            </span>
            <h3 className="mt-2 font-heading text-lg font-semibold text-secondary">
              <span className="sr-only">Paso {item.step}: </span>
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
