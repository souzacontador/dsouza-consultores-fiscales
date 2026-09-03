import { useEffect, useRef, useState } from 'react'

// Barra de categorías de /recursos: permite identificar de un vistazo los tipos
// de recurso y saltar al bloque correspondiente. Cada categoría publicada lleva
// su ícono y un tinte de color de la paleta de marca (fondo y borde, nunca el
// texto, para no comprometer el contraste). Las categorías sin contenido todavía
// se muestran atenuadas con la etiqueta "Próximamente" y no son clicables.
//
// La barra es FIJA (sticky) justo debajo del menú superior al hacer scroll y
// resalta la categoría cuya sección está visible, así el visitante siempre
// puede cambiar de categoría sin volver arriba.
//
// categorias: [{ id, label, icon: ReactNode, accent?: 'primary'|'secondary', count?, soon? }]
//   - con `soon`  → chip deshabilitado (aria-disabled), sin enlace, gris
//   - sin `soon`  → enlace de ancla a `#${id}` con el conteo de elementos

// Tinte por acento: fondo suave + borde del color + ícono en el tono oscuro.
const CHIP = {
  primary: 'border-primary/40 bg-primary/10 hover:border-primary hover:bg-primary/15',
  secondary: 'border-secondary/30 bg-secondary/10 hover:border-secondary hover:bg-secondary/15',
}
// Chip activo: borde sólido del color y fondo más presente.
const CHIP_ACTIVE = {
  primary: 'border-primary bg-primary/20',
  secondary: 'border-secondary bg-secondary/20',
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

// Altura real del menú superior (cambia al compactarse con el scroll): se mide
// para pegar la barra exactamente debajo y para calcular la categoría visible.
function useHeaderHeight() {
  const [height, setHeight] = useState(64)
  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return
    const update = () => setHeight(header.getBoundingClientRect().height)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(header)
    return () => ro.disconnect()
  }, [])
  return height
}

// Id de la sección visible (la última cuyo inicio ya pasó bajo la barra).
function useActiveSection(ids, offset) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    let raf = 0
    const measure = () => {
      raf = 0
      let current = null
      for (const s of sections) {
        if (s.getBoundingClientRect().top - offset <= 8) current = s.id
      }
      setActive(current)
    }
    // Una medición por frame como máximo: el scroll dispara muchos eventos.
    const update = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('hashchange', update)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('hashchange', update)
    }
  }, [ids.join(','), offset])
  return active
}

export default function CategoriasRecursos({ categorias }) {
  const headerHeight = useHeaderHeight()
  // Altura real de la barra (medida): se usa para detectar la sección visible.
  const navRef = useRef(null)
  const [barHeight, setBarHeight] = useState(60)
  useEffect(() => {
    if (!navRef.current) return
    const update = () => setBarHeight(navRef.current.getBoundingClientRect().height)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(navRef.current)
    return () => ro.disconnect()
  }, [])
  const active = useActiveSection(
    categorias.filter((c) => !c.soon).map((c) => c.id),
    headerHeight + barHeight
  )

  return (
    <nav
      ref={navRef}
      aria-label="Categorías de recursos"
      className="sticky z-40 border-b border-line bg-base/95 backdrop-blur"
      style={{ top: headerHeight }}
    >
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
                  aria-current={active === c.id ? 'true' : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    active === c.id ? CHIP_ACTIVE[c.accent] || CHIP_ACTIVE.primary : CHIP[c.accent] || CHIP.primary
                  }`}
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
