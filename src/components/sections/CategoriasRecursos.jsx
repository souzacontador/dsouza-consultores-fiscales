// Barra de categorías de /recursos: permite identificar de un vistazo los tipos
// de recurso y saltar al bloque correspondiente. Cada categoría publicada lleva
// su ícono y un tinte de color de la paleta de marca (fondo y borde, nunca el
// texto, para no comprometer el contraste). Las categorías sin contenido todavía
// se muestran atenuadas con la etiqueta "Próximamente" y no son clicables.
//
// categorias: [{ id, label, icon: ReactNode, accent?: 'primary'|'secondary', count?, soon? }]
//   - con `soon`  → chip deshabilitado (aria-disabled), sin enlace, gris
//   - sin `soon`  → enlace de ancla a `#${id}` con el conteo de elementos

// Tinte por acento: fondo suave + borde del color + ícono en el tono oscuro.
const CHIP = {
  primary: 'border-primary/40 bg-primary/10 hover:border-primary hover:bg-primary/15',
  secondary: 'border-secondary/30 bg-secondary/10 hover:border-secondary hover:bg-secondary/15',
}
const ICON = { primary: 'text-primary-dark', secondary: 'text-secondary' }
const DOT = { primary: 'bg-primary', secondary: 'bg-secondary', none: 'bg-line' }
const PILL = {
  primary: 'border-primary/40 bg-primary/10 text-primary-dark',
  secondary: 'border-secondary/30 bg-secondary/10 text-secondary',
}

export function AccentDot({ accent = 'none', className = '' }) {
  return (
    <span aria-hidden className={`inline-block h-2 w-2 shrink-0 rounded-full ${DOT[accent] || DOT.none} ${className}`} />
  )
}

// Píldora de sección (se usa como `eyebrow` en SectionHeader) con el mismo tinte
// que el chip de la barra, para que la categoría se reconozca al bajar la página.
export function SectionPill({ accent = 'primary', children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${PILL[accent] || PILL.primary}`}
    >
      <AccentDot accent={accent} />
      {children}
    </span>
  )
}

export default function CategoriasRecursos({ categorias }) {
  return (
    <nav aria-label="Categorías de recursos" className="border-b border-line bg-base">
      <div className="container-site">
        <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categorias.map((c) =>
            c.soon ? (
              <li key={c.id} className="shrink-0">
                <span
                  aria-disabled="true"
                  title="Próximamente"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-dashed border-line bg-tint px-3 py-2 text-sm font-medium text-muted"
                >
                  <span className="text-muted [&>svg]:h-4 [&>svg]:w-4">{c.icon}</span>
                  {c.label}
                  <span className="rounded-md bg-base px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Próximamente
                  </span>
                </span>
              </li>
            ) : (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${CHIP[c.accent] || CHIP.primary}`}
                >
                  <span className={`[&>svg]:h-4 [&>svg]:w-4 ${ICON[c.accent] || ICON.primary}`}>{c.icon}</span>
                  {c.label}
                  {typeof c.count === 'number' && (
                    <span
                      className="rounded-md bg-base px-1.5 py-0.5 text-xs font-semibold text-secondary"
                      aria-label={`${c.count} publicados`}
                    >
                      {c.count}
                    </span>
                  )}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  )
}
