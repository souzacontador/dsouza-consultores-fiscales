import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import RiskCardVisual from '../components/sections/RiskCardVisual'
import Confianza from '../components/sections/Confianza'
import Servicios from '../components/sections/Servicios'
import PorQue from '../components/sections/PorQue'
import Proceso from '../components/sections/Proceso'
import Faq from '../components/sections/Faq'
import Cta from '../components/sections/Cta'

// Diferenciadores en primera persona — específicos de Inicio (no tocan Nosotros).
const HOME_REASONS = [
  {
    icon: 'radar',
    title: 'Detecto los focos rojos antes que el SAT',
    desc: 'Leo tus CFDI y operaciones con la misma lógica algorítmica con la que fiscaliza la autoridad, para anticipar qué marcaría en foco rojo.',
  },
  {
    icon: 'layers',
    title: 'Tres frentes en un solo lugar',
    desc: 'Contabilidad, asesoría preventiva y capacitación bajo un mismo responsable. No repartes tu información fiscal entre proveedores que no se hablan entre sí.',
  },
  {
    icon: 'clock',
    title: 'Prevención, no reacción',
    desc: 'Reviso y corrijo antes de la carta invitación o la revisión electrónica, cuando todavía se puede ordenar sin multas ni actualizaciones evitables.',
  },
  {
    icon: 'chat',
    title: 'Te explico todo en lenguaje claro',
    desc: 'Traduzco el lenguaje fiscal a decisiones de negocio. Sales de cada conversación entendiendo tu riesgo real, no solo firmando declaraciones.',
  },
]

// Testimonios: Inicio no muestra el bloque hasta contar con testimonios reales
// autorizados (los ilustrativos viven solo en /testimonios, que está en noindex).

export default function Inicio() {
  return (
    <>
      <Seo path="/" />
      <Hero
        layout="split"
        eyebrow="Contabilidad · Fiscal preventivo · Auditoría algorítmica"
        title="Cumple con el SAT sin sustos, con quien entiende cómo te fiscalizan los algoritmos."
        subtitle="Ayudo a PyMEs, profesionistas y empresas de servicios con contabilidad al día, asesoría fiscal preventiva y capacitación — detectando los focos rojos en tus CFDI antes de que lo haga el SAT."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Agenda tu diagnóstico"
        trustSignal="Despacho establecido en Mexicali · Atención directa del titular"
        visual={<RiskCardVisual />}
      />
      <Confianza />
      <Servicios bg="tint" />
      <PorQue bg="base" reasons={HOME_REASONS} />
      <Proceso bg="tint" />
      <Faq bg="tint" />
      <Cta
        title="Tu diagnóstico fiscal empieza con un mensaje"
        subtitle="Cuéntame tu situación por WhatsApp y te digo con claridad cómo puedo ayudarte a cumplir sin sustos. Sin compromiso."
        ctaLabel="Agenda tu diagnóstico"
      />
    </>
  )
}
