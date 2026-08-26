import Hero from '../components/sections/Hero'

export default function CalculadorasPremium() {
  return (
    <Hero
      eyebrow="Calculadoras premium"
      title="Cálculos avanzados con acompañamiento profesional"
      subtitle="Próximamente: calculadoras premium con escenarios más completos y el respaldo de nuestro despacho para interpretar los resultados en tu contexto real. Déjanos saber tu interés por WhatsApp y te avisamos cuando estén listas."
      secondary={{ label: 'Ver calculadoras gratuitas', to: '/calculadoras' }}
      ctaLabel="Quiero saber más por WhatsApp"
    />
  )
}
