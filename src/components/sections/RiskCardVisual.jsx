import { IconRadar } from '../Icons'

// Visual ilustrativo (no son datos reales de un cliente): tarjeta de "mapa de
// riesgo con semáforo" que representa el diferenciador de auditoría algorítmica.
const ROWS = [
  { label: 'CFDI de ingresos vs. declaraciones', level: 'ok' },
  { label: 'Deducciones y proveedores', level: 'warn' },
  { label: 'Retenciones y nómina (IMSS)', level: 'ok' },
  { label: 'Operaciones con foco rojo', level: 'risk' },
]

const DOT = {
  ok: 'bg-primary',
  warn: 'bg-accent',
  risk: 'bg-danger',
}

const TAG = {
  ok: { text: 'En orden', cls: 'bg-primary/10 text-primary-dark' },
  warn: { text: 'Revisar', cls: 'bg-accent/15 text-status-warn' },
  risk: { text: 'Atención', cls: 'bg-danger/10 text-status-risk' },
}

export default function RiskCardVisual() {
  return (
    <div
      className="relative mx-auto max-w-md"
      role="img"
      aria-label="Ilustración de ejemplo: un mapa de riesgo fiscal con semáforo que clasifica CFDI, deducciones, retenciones y operaciones en verde, ámbar y rojo, leído con lógica algorítmica antes de que lo detecte el SAT."
    >
      <div aria-hidden className="rounded-md border border-line bg-base p-6 shadow-card-hover">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-primary">
              <IconRadar className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold text-secondary">
                Mapa de riesgo fiscal
              </p>
              <p className="text-xs text-muted">Lectura con lógica algorítmica</p>
            </div>
          </div>
          <span className="rounded-md bg-tint px-2 py-1 text-xs font-medium text-muted">Ejemplo</span>
        </div>

        <ul className="mt-4 space-y-3">
          {ROWS.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 text-sm text-ink">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DOT[row.level]}`} />
                {row.label}
              </span>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${TAG[row.level].cls}`}
              >
                {TAG[row.level].text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sello flotante */}
      <div className="absolute -bottom-4 -left-4 hidden rounded-md border border-line bg-base px-4 py-3 shadow-card sm:block">
        <p className="text-xs text-muted">Antes de que lo detecte</p>
        <p className="font-heading text-sm font-bold text-secondary">el SAT</p>
      </div>
    </div>
  )
}
