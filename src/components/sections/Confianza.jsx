import { Section } from '../ui'
import { TRUST_SIGNALS } from '../../data/site'
import { IconCheck } from '../Icons'

// Señales de confianza genéricas y verificables (sin cifras inventadas).
export default function Confianza() {
  return (
    <Section bg="base" className="!py-10">
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted">
        Por qué confiar en el despacho
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_SIGNALS.map((signal) => (
          <li
            key={signal}
            className="flex items-start gap-3 rounded-md border border-line bg-tint px-4 py-4"
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary-dark">
              <IconCheck className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-secondary">{signal}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
