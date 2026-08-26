// ============================================================
// Datos centralizados del sitio DSouza Consultores Fiscales.
// Fuente única para contacto, CTA y contenido de bloques.
// ============================================================

// CTA principal — enlace real de WhatsApp (usar SIEMPRE esta constante).
export const WHATSAPP_URL =
  'https://wa.me/526862567293?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20un%20diagn%C3%B3stico%20fiscal'

export const CONTACT = {
  brand: 'DSouza Consultores Fiscales',
  city: 'Mexicali, B.C.',
  address: 'Av. Molino del Rey No. 311, Col. Insurgentes Este, C.P. 21280, Mexicali, B.C.',
  addressShort: 'Av. Molino del Rey No. 311, Col. Insurgentes Este',
  hours: 'Lun–Vie 9:00–18:00',
  email: 'daniel@dsouzaconsultores.mx',
  phoneDisplay: '+52 686 256 7293',
  linkedin: 'https://www.linkedin.com/in/daniel-souza-vazquez/',
  // Mapa embebido sin API key
  mapEmbed:
    'https://maps.google.com/maps?q=Av.%20Molino%20del%20Rey%20311%2C%20Insurgentes%20Este%2C%2021280%20Mexicali%2C%20B.C.&z=15&output=embed',
}

// Navegación — las 8 páginas del sitio.
export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Testimonios', to: '/testimonios' },
  { label: 'Recursos', to: '/recursos' },
  { label: 'Calculadoras', to: '/calculadoras' },
  { label: 'Calculadoras Premium', to: '/calculadoras-premium' },
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
  'Despacho establecido en Mexicali, B.C.',
  'Especialista en fiscalización algorítmica del SAT, IMSS e INFONAVIT',
  'Enfoque preventivo: primero el riesgo, luego el trámite',
  'Atención directa con el contador responsable',
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

// Proceso — cómo trabajamos.
export const PROCESS = [
  {
    step: '01',
    title: 'Diagnóstico fiscal',
    desc: 'Revisamos tu situación actual, tus CFDI y tus obligaciones para ubicar los focos rojos y priorizar lo urgente.',
  },
  {
    step: '02',
    title: 'Mapa de riesgo',
    desc: 'Te entregamos un semáforo claro: qué está en orden, qué conviene corregir y qué requiere atención inmediata.',
  },
  {
    step: '03',
    title: 'Corrección y puesta al día',
    desc: 'Ordenamos contabilidad y obligaciones, y corregimos a tiempo lo que la autoridad podría observar.',
  },
  {
    step: '04',
    title: 'Acompañamiento continuo',
    desc: 'Mantenemos tu cumplimiento al día mes con mes y te avisamos cuando algo en tu operación cambia tu riesgo.',
  },
]

// Preguntas frecuentes.
export const FAQS = [
  {
    q: '¿Qué es un diagnóstico fiscal y qué incluye?',
    a: 'Es una revisión inicial de tu situación: obligaciones ante SAT, IMSS e INFONAVIT, y una lectura de tus CFDI y operaciones con la lógica de los algoritmos de fiscalización. Termina con un mapa de riesgo con semáforo y las prioridades a atender. Sirve para saber dónde estás parado antes de tomar decisiones.',
  },
  {
    q: '¿Qué significa "auditoría algorítmica"?',
    a: 'El SAT cruza de forma automática tus comprobantes, declaraciones, DIOT y nómina para detectar inconsistencias. La auditoría algorítmica aplica esa misma forma de analizar a tus datos, para encontrar los focos rojos antes de que la autoridad los marque. No es una promesa de invisibilidad ante el SAT: es prevención informada.',
  },
  {
    q: '¿Pueden garantizar que no me va a fiscalizar el SAT?',
    a: 'No, y desconfía de quien lo prometa. Ninguna autoridad se puede "garantizar". Lo que sí hacemos es reducir tu exposición: corregir a tiempo, sustentar tus operaciones y dejarte en la mejor posición posible si llega una revisión.',
  },
  {
    q: '¿Trabajan con PyMEs y profesionistas independientes?',
    a: 'Sí. Nuestro enfoque está pensado para PyMEs, profesionistas independientes y empresas de servicios que quieren cumplir bien y entender su riesgo real, sin un área fiscal interna.',
  },
  {
    q: '¿Atienden solo en Mexicali?',
    a: 'Somos un despacho establecido en Mexicali, B.C., y atendemos de forma presencial en la ciudad. Buena parte del trabajo —diagnóstico, contabilidad y asesoría— también se puede llevar a distancia para clientes de otras zonas.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Escríbenos por WhatsApp para agendar tu diagnóstico fiscal. En esa primera conversación entendemos tu caso y te decimos con claridad cómo podemos ayudarte, sin compromiso.',
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
