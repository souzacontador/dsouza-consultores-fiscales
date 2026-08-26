import Hero from '../components/sections/Hero'

export default function Recursos() {
  return (
    <Hero
      eyebrow="Recursos"
      title="Guías y materiales para entender tu riesgo fiscal"
      subtitle="Estamos preparando una biblioteca de recursos prácticos sobre fiscalización algorítmica, focos rojos en CFDI y cumplimiento ante el SAT, el IMSS y el INFONAVIT. Muy pronto disponible. Mientras tanto, escríbenos y con gusto resolvemos tu duda."
      secondary={{ label: 'Ir a servicios', to: '/servicios' }}
      ctaLabel="Pregunta por WhatsApp"
    />
  )
}
