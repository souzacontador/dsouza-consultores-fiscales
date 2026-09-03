// ============================================================
// Datos centralizados del sitio DSouza Consultores Fiscales.
// Fuente única para contacto, CTA y contenido de bloques.
// ============================================================

// URL de producción (base para canonical, Open Graph y sitemap).
// Dominio propio conectado en Vercel; dsouza-consultores-fiscales.vercel.app queda como alias.
export const SITE_URL = 'https://dsouzaconsultores.mx'

// CTA principal — enlace real de WhatsApp (usar SIEMPRE esta constante).
export const WHATSAPP_URL =
  'https://wa.me/526862567293?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20diagn%C3%B3stico%20fiscal'

export const CONTACT = {
  brand: 'DSouza Consultores Fiscales',
  city: 'Mexicali, B.C.',
  address: 'Av. Molino del Rey No. 311, Col. Insurgentes Este, C.P. 21280, Mexicali, B.C.',
  addressShort: 'Av. Molino del Rey No. 311, Col. Insurgentes Este',
  hours: 'Lun–Vie 9:00–18:00',
  // Zona de atención real (confirmada por el titular): presencial en Mexicali;
  // a distancia en el resto de Baja California y en Puerto Peñasco, Sonora.
  serviceArea:
    'Atención presencial en Mexicali, B.C.; a distancia en el resto de Baja California y en Puerto Peñasco, Sonora.',
  email: 'daniel@dsouzaconsultores.mx',
  phoneDisplay: '+52 686 256 7293',
  linkedin: 'https://www.linkedin.com/in/daniel-souza-vazquez/',
  // Mapa embebido sin API key
  mapEmbed:
    'https://maps.google.com/maps?q=Av.%20Molino%20del%20Rey%20311%2C%20Insurgentes%20Este%2C%2021280%20Mexicali%2C%20B.C.&z=15&output=embed',
}

// Navegación principal (navbar). Testimonios y Calculadoras Premium salen
// del navbar hasta tener testimonios reales / contenido: siguen accesibles
// vía footer, /calculadoras y URL directa.
export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Calculadoras', to: '/calculadoras' },
  { label: 'Contacto', to: '/contacto' },
]

// Enlaces rápidos del footer — solo páginas con contenido real publicado.
// Testimonios (ilustrativos) y Calculadoras Premium (en construcción) vuelven
// al footer cuando tengan contenido; siguen accesibles por URL directa (noindex).
export const FOOTER_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Calculadoras', to: '/calculadoras' },
  { label: 'Contacto', to: '/contacto' },
]

// Servicios — el ícono se resuelve por 'icon' en el componente Servicios.
export const SERVICES = [
  {
    icon: 'ledger',
    title: 'Contabilidad y cumplimiento',
    desc: 'Contabilidad y obligaciones (SAT, IMSS, INFONAVIT) al día, sin sorpresas a fin de mes.',
  },
  {
    icon: 'shield',
    title: 'Asesoría fiscal preventiva',
    desc: 'Reviso el riesgo de tus operaciones y corrijo a tiempo, antes de la carta invitación o la revisión electrónica.',
  },
  {
    icon: 'radar',
    title: 'Auditoría algorítmica',
    desc: 'Analizo tus CFDI y operaciones con la lógica de los algoritmos del SAT y te entrego un mapa de riesgo con semáforo.',
  },
  {
    icon: 'graduation',
    title: 'Capacitación',
    desc: 'Formo a tu equipo, contadores y empresarios en cómo el SAT fiscaliza con IA, con casos y simulaciones.',
  },
]

// Señales de confianza — genéricas y verificables (sin cifras inventadas).
export const TRUST_SIGNALS = [
  'Especialización en fiscalización algorítmica del SAT, IMSS e INFONAVIT',
  'Despacho en Mexicali, B.C. · Atención a distancia en Baja California y Puerto Peñasco, Sonora',
  'Atención directa del titular del despacho',
  'Enfoque preventivo: primero el riesgo, luego el trámite',
]

// Diferenciadores — bloque "Por qué".
export const REASONS = [
  {
    icon: 'radar',
    title: 'Pensamos como el algoritmo',
    desc: 'El SAT ya no revisa a mano: cruza CFDI, DIOT, nómina y declaraciones con modelos automáticos. Trabajamos con esa misma lógica para anticipar qué marcaría en foco rojo.',
  },
  {
    icon: 'clock',
    title: 'Preventivo, no reactivo',
    desc: 'La mayoría de los despachos reaccionan cuando ya llegó el requerimiento. Nosotros revisamos antes, cuando todavía se puede corregir sin multa ni actualización.',
  },
  {
    icon: 'layers',
    title: 'Tres frentes integrados',
    desc: 'Contabilidad al día, asesoría preventiva y capacitación bajo un mismo responsable. No repartes tu información fiscal entre proveedores que no se hablan entre sí.',
  },
  {
    icon: 'chat',
    title: 'Te explicamos el porqué',
    desc: 'Traducimos el lenguaje fiscal a decisiones de negocio. Sales de cada reunión entendiendo tu riesgo real, no solo firmando declaraciones.',
  },
]

// Proceso — cómo trabajamos (3 pasos).
export const PROCESS = [
  {
    step: '01',
    title: 'Escríbeme por WhatsApp',
    desc: 'Cuéntame tu situación en un mensaje, sin formularios largos ni compromiso. Te respondo en horario de oficina.',
  },
  {
    step: '02',
    title: 'Diagnóstico fiscal de tu situación',
    desc: 'Reviso tus obligaciones y tus CFDI con la lógica de los algoritmos del SAT y ubicamos juntos los focos rojos.',
  },
  {
    step: '03',
    title: 'Plan de acción y acompañamiento mensual',
    desc: 'Te entrego prioridades claras y damos seguimiento a tu cumplimiento cada mes, corrigiendo a tiempo lo que la autoridad podría observar.',
  },
]

// Preguntas frecuentes (Inicio).
export const FAQS = [
  {
    q: '¿Qué incluye el diagnóstico fiscal?',
    a: 'Una revisión inicial de tu situación: tus obligaciones ante SAT, IMSS e INFONAVIT y una lectura de tus CFDI y operaciones con la lógica de los algoritmos de fiscalización. Termina con un mapa de riesgo con semáforo y las prioridades a atender, para que sepas dónde estás parado antes de tomar decisiones.',
  },
  {
    q: '¿Qué es la auditoría algorítmica de CFDI?',
    a: 'El SAT cruza de forma automática tus comprobantes, declaraciones, DIOT y nómina para detectar inconsistencias. La auditoría algorítmica aplica esa misma forma de analizar a tus CFDI y operaciones, para encontrar los focos rojos antes de que la autoridad los marque. No es una promesa de invisibilidad ante el SAT: es prevención informada.',
  },
  {
    q: '¿Me sirve si ya tengo contador?',
    a: 'Sí. No busco reemplazar a tu contador, sino sumar una mirada preventiva y de riesgo que muchas veces no entra en el trabajo del día a día. Puedo revisar tu situación, señalar focos rojos y proponer correcciones; si lo prefieres, trabajo de la mano con quien ya lleva tu contabilidad.',
  },
  {
    q: '¿Trabajas con clientes fuera de Mexicali?',
    a: 'Sí. Soy un despacho establecido en Mexicali, B.C., donde atiendo de forma presencial. El diagnóstico, la revisión de CFDI, la contabilidad y la asesoría también se llevan a distancia, por lo que atiendo a clientes en el resto de Baja California (Tijuana, Ensenada, Tecate, Rosarito y San Felipe) y en Puerto Peñasco, Sonora.',
  },
  {
    q: '¿Qué pasa si ya recibí una carta invitación del SAT?',
    a: 'Escríbeme cuanto antes: aún estás a tiempo de responder de forma ordenada. Reviso qué detectó la autoridad, evalúo el riesgo real de tus operaciones y definimos una estrategia para atenderla. No prometo resultados garantizados ante el SAT, pero sí trabajar para dejarte en la mejor posición posible.',
  },
]

// Testimonios — ILUSTRATIVOS. Reemplazar por reales antes de producción.
export const TESTIMONIALS = [
  {
    // TESTIMONIO DE EJEMPLO — reemplazar por real
    quote:
      'Llevábamos años solo timbrando y declarando. Con el diagnóstico entendimos por primera vez dónde estaba nuestro riesgo real y qué corregir antes de que llegara un requerimiento.',
    name: 'Cliente ejemplo',
    role: 'Dueña de PyME de servicios · Mexicali',
  },
  {
    // TESTIMONIO DE EJEMPLO — reemplazar por real
    quote:
      'Me explicaron en lenguaje claro cómo me podía revisar el SAT con sus algoritmos. Salí de la reunión sabiendo qué decisiones tomar, no solo firmando papeles.',
    name: 'Cliente ejemplo',
    role: 'Profesionista independiente',
  },
  {
    // TESTIMONIO DE EJEMPLO — reemplazar por real
    quote:
      'La revisión preventiva de nuestros CFDI nos ayudó a ordenar la operación a tiempo. El semáforo de riesgo lo volvió muy fácil de priorizar para el equipo.',
    name: 'Cliente ejemplo',
    role: 'Administrador de empresa de servicios',
  },
]
