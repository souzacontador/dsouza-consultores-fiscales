import Hero from '../components/sections/Hero'
import RiskCardVisual from '../components/sections/RiskCardVisual'
import Confianza from '../components/sections/Confianza'
import Servicios from '../components/sections/Servicios'
import PorQue from '../components/sections/PorQue'
import Proceso from '../components/sections/Proceso'
import Testimonios from '../components/sections/Testimonios'
import Faq from '../components/sections/Faq'
import Cta from '../components/sections/Cta'

export default function Inicio() {
  return (
    <>
      <Hero
        layout="split"
        eyebrow="Contabilidad · Fiscal preventivo · Auditoría algorítmica"
        title="Cumple con el SAT sin sustos, con quien entiende cómo te fiscalizan los algoritmos."
        subtitle="Ayudo a PyMEs, profesionistas y empresas de servicios con contabilidad al día, asesoría fiscal preventiva y capacitación — detectando los focos rojos en tus CFDI antes de que lo haga el SAT."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        visual={<RiskCardVisual />}
      />
      <Confianza />
      <Servicios bg="tint" />
      <PorQue bg="base" />
      <Proceso bg="tint" />
      <Testimonios bg="base" />
      <Faq bg="tint" />
      <Cta />
    </>
  )
}
