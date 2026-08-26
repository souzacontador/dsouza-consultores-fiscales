import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import Testimonios from '../components/sections/Testimonios'
import Cta from '../components/sections/Cta'

// TODAS ilustrativas: roles genéricos, sin nombres de personas ni empresas
// reales, avatar de iniciales (no fotos identificables).
const TESTIMONIOS_PAGE = [
  // TESTIMONIO DE EJEMPLO — reemplazar por real
  {
    quote:
      'El diagnóstico me mostró en qué operaciones estaba mi riesgo real. Corregimos a tiempo, antes de que llegara cualquier requerimiento.',
    name: 'Director de PyME de servicios',
    role: 'Mexicali, B.C.',
    initials: 'DP',
    rating: 5,
  },
  // TESTIMONIO DE EJEMPLO — reemplazar por real
  {
    quote:
      'Me explicó en lenguaje claro cómo me podía revisar el SAT con sus algoritmos. Salí sabiendo qué decidir, no solo firmando papeles.',
    name: 'Profesionista independiente',
    role: 'Mexicali, B.C.',
    initials: 'PI',
    rating: 5,
  },
  // TESTIMONIO DE EJEMPLO — reemplazar por real
  {
    quote:
      'El mapa de riesgo con semáforo volvió muy fácil priorizar. Todo el equipo entendió qué atender primero.',
    name: 'Administradora de empresa de servicios',
    role: 'Mexicali, B.C.',
    initials: 'AE',
    rating: 5,
  },
  // TESTIMONIO DE EJEMPLO — reemplazar por real
  {
    quote:
      'Pasamos de reaccionar a prevenir. Ahora sé que mis CFDI y mis obligaciones están revisados con la lógica con la que fiscaliza la autoridad.',
    name: 'Dueño de comercio',
    role: 'Mexicali, B.C.',
    initials: 'DC',
    rating: 5,
  },
  // TESTIMONIO DE EJEMPLO — reemplazar por real
  {
    quote:
      'La capacitación nos abrió los ojos sobre cómo se fiscaliza hoy con inteligencia artificial. Muy práctica, con casos reales del giro.',
    name: 'Encargada de contabilidad interna',
    role: 'PyME de servicios · Mexicali',
    initials: 'EC',
    rating: 4,
  },
  // TESTIMONIO DE EJEMPLO — reemplazar por real
  {
    quote:
      'Tener contabilidad al día y una revisión preventiva en el mismo despacho me quitó un peso enorme de encima cada fin de mes.',
    name: 'Empresario de servicios profesionales',
    role: 'Mexicali, B.C.',
    initials: 'SP',
    rating: 5,
  },
]

export default function TestimoniosPage() {
  return (
    <>
      <Seo path="/testimonios" />
      <Hero
        eyebrow="Testimonios"
        title="Lo que dicen quienes ya trabajan con nosotros"
        subtitle="Historias del tipo de tranquilidad y claridad que buscamos entregar. Se reemplazarán por testimonios reales con la autorización de cada cliente."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Agenda tu diagnóstico"
      />

      <Testimonios
        bg="tint"
        items={TESTIMONIOS_PAGE}
        title="Experiencias ilustrativas de clientes"
        subtitle="Ejemplos del giro que atendemos: PyMEs, profesionistas independientes y empresas de servicios. Roles genéricos mientras publicamos testimonios reales."
      />

      <Cta />
    </>
  )
}
