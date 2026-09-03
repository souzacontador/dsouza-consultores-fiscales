// Barra de categorías de /recursos: permite identificar de un vistazo los tipos
// de recurso y saltar al bloque correspondiente. Las categorías sin contenido
// todavía se muestran atenuadas con la etiqueta "Próximamente" y no son clicables.
//
// categorias: [{ id, label, count?, soon? }]
//   - con `soon`  → chip deshabilitado (aria-disabled), sin enlace
//   - sin `soon`  → enlace de ancla a `#${id}` con el conteo de elementos
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
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-dashed border-line px-3 py-2 text-sm font-medium text-muted"
                >
                  {c.label}
                  <span className="rounded-md bg-tint px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Próximamente
                  </span>
                </span>
              </li>
            ) : (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-line bg-base px-3 py-2 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {c.label}
                  {typeof c.count === 'number' && (
                    <span
                      className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary-dark"
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
