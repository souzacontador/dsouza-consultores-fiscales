// Ilustraciones SVG autocontenidas (sin assets externos) para los bloques
// media-texto. Usan colores por token (clases fill-*/stroke-*) y traen su
// propio alt vía role="img" + aria-label. Reemplazables por fotos reales.

const svgBase = {
  viewBox: '0 0 480 360',
  className: 'block h-full w-full',
  role: 'img',
  xmlns: 'http://www.w3.org/2000/svg',
}

// Contabilidad y asesoría preventiva: reporte al día + calendario + sello ok.
export function IloContabilidad() {
  return (
    <svg
      {...svgBase}
      aria-label="Ilustración: un reporte contable con gráfica y líneas de datos, un calendario y un sello de cumplimiento, que representa la contabilidad al día."
    >
      <rect width="480" height="360" className="fill-tint" />
      <circle cx="392" cy="70" r="86" className="fill-primary/10" />

      {/* Documento/reporte */}
      <rect x="96" y="70" width="230" height="228" rx="14" className="fill-base stroke-line" strokeWidth="2" />
      <rect x="96" y="70" width="230" height="46" rx="14" className="fill-secondary" />
      <rect x="96" y="96" width="230" height="20" className="fill-secondary" />
      <circle cx="120" cy="93" r="7" className="fill-primary" />
      <rect x="136" y="86" width="120" height="8" rx="4" className="fill-base/70" />

      {/* Líneas de texto */}
      <rect x="120" y="140" width="182" height="8" rx="4" className="fill-line" />
      <rect x="120" y="160" width="140" height="8" rx="4" className="fill-line" />

      {/* Mini gráfica de barras */}
      <rect x="120" y="196" width="26" height="70" rx="4" className="fill-primary/30" />
      <rect x="156" y="176" width="26" height="90" rx="4" className="fill-primary/60" />
      <rect x="192" y="210" width="26" height="56" rx="4" className="fill-primary/30" />
      <rect x="228" y="188" width="26" height="78" rx="4" className="fill-primary" />
      <rect x="264" y="220" width="26" height="46" rx="4" className="fill-primary/40" />

      {/* Calendario */}
      <rect x="300" y="150" width="96" height="86" rx="12" className="fill-base stroke-line" strokeWidth="2" />
      <rect x="300" y="150" width="96" height="26" rx="12" className="fill-accent" />
      <circle cx="322" cy="196" r="7" className="fill-primary/40" />
      <circle cx="348" cy="196" r="7" className="fill-primary/40" />
      <circle cx="374" cy="196" r="7" className="fill-accent" />
      <circle cx="322" cy="218" r="7" className="fill-line" />
      <circle cx="348" cy="218" r="7" className="fill-primary/40" />

      {/* Sello de cumplimiento */}
      <circle cx="150" cy="286" r="30" className="fill-primary" />
      <path d="M138 286l8 8 16-16" className="stroke-base" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Auditoría algorítmica: mapa de riesgo con semáforo + escaneo + nodos.
export function IloAuditoria() {
  return (
    <svg
      {...svgBase}
      aria-label="Ilustración: un panel de mapa de riesgo con filas en semáforo verde, ámbar y rojo, un arco de escaneo y nodos conectados, que representa la auditoría algorítmica de CFDI."
    >
      <rect width="480" height="360" className="fill-tint" />
      <circle cx="96" cy="300" r="96" className="fill-primary/10" />

      {/* Nodos/red */}
      <path d="M70 96 L150 60 L210 110" className="stroke-primary/40" strokeWidth="2" fill="none" />
      <circle cx="70" cy="96" r="6" className="fill-primary/50" />
      <circle cx="150" cy="60" r="6" className="fill-accent" />
      <circle cx="210" cy="110" r="6" className="fill-primary/50" />

      {/* Panel mapa de riesgo */}
      <rect x="150" y="96" width="248" height="196" rx="16" className="fill-base stroke-line" strokeWidth="2" />
      <rect x="150" y="96" width="248" height="44" rx="16" className="fill-secondary" />
      <rect x="150" y="120" width="248" height="20" className="fill-secondary" />
      <circle cx="176" cy="118" r="7" className="fill-primary" />
      <rect x="192" y="112" width="120" height="10" rx="5" className="fill-base/70" />

      {/* Filas con semáforo */}
      <g>
        <rect x="172" y="162" width="150" height="9" rx="4.5" className="fill-line" />
        <circle cx="360" cy="166" r="9" className="fill-primary" />
      </g>
      <g>
        <rect x="172" y="196" width="150" height="9" rx="4.5" className="fill-line" />
        <circle cx="360" cy="200" r="9" className="fill-accent" />
      </g>
      <g>
        <rect x="172" y="230" width="150" height="9" rx="4.5" className="fill-line" />
        <circle cx="360" cy="234" r="9" className="fill-danger" />
      </g>

      {/* Arco de escaneo / lupa */}
      <path d="M120 300 a70 70 0 0 1 70-70" className="stroke-primary" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="150" cy="300" r="34" className="fill-base stroke-primary" strokeWidth="4" />
      <path d="M174 324 l22 22" className="stroke-primary" strokeWidth="6" strokeLinecap="round" />
      <path d="M138 300l8 8 16-18" className="stroke-primary" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Nosotros / filosofía: escudo preventivo + circuito/algoritmo + enfoque.
export function IloFilosofia() {
  return (
    <svg
      {...svgBase}
      aria-label="Ilustración: un escudo con una palomita conectado a nodos de un circuito, que representa la prevención frente a la fiscalización algorítmica del SAT, IMSS e INFONAVIT."
    >
      <rect width="480" height="360" className="fill-tint" />
      <circle cx="380" cy="290" r="90" className="fill-primary/10" />

      {/* Circuito/algoritmo */}
      <path d="M60 120 H150 V210 H250" className="stroke-primary/40" strokeWidth="2" fill="none" />
      <path d="M60 250 H120 V300 H210" className="stroke-primary/40" strokeWidth="2" fill="none" />
      <circle cx="60" cy="120" r="6" className="fill-primary/50" />
      <circle cx="150" cy="210" r="6" className="fill-accent" />
      <circle cx="60" cy="250" r="6" className="fill-primary/50" />
      <circle cx="120" cy="300" r="6" className="fill-primary/50" />

      {/* Escudo */}
      <path
        d="M240 70 l96 34 v70 c0 66 -44 112 -96 128 c-52 -16 -96 -62 -96 -128 v-70 z"
        className="fill-secondary"
      />
      <path
        d="M240 96 l70 25 v52 c0 50 -32 84 -70 97 c-38 -13 -70 -47 -70 -97 v-52 z"
        className="fill-primary/15 stroke-primary"
        strokeWidth="2"
      />
      <path
        d="M212 176 l20 20 l40 -44"
        className="stroke-base"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Nodo destacado */}
      <circle cx="360" cy="150" r="26" className="fill-base stroke-line" strokeWidth="2" />
      <circle cx="360" cy="150" r="9" className="fill-accent" />
    </svg>
  )
}
