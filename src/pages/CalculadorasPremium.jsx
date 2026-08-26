import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import EstadoVacio from '../components/sections/EstadoVacio'
import { IconSparkles } from '../components/Icons'

export default function CalculadorasPremium() {
  return (
    <>
      <Seo path="/calculadoras-premium" />
      <Hero
        eyebrow="Calculadoras premium"
        title="Calculadoras premium para clientes y suscriptores"
        subtitle="Herramientas de cálculo más completas, con escenarios avanzados y el respaldo del despacho para interpretar los resultados en tu contexto real."
        secondary={{ label: 'Ver calculadoras gratuitas', to: '/calculadoras' }}
        ctaLabel="Quiero saber más por WhatsApp"
      />

      <EstadoVacio
        bg="base"
        icon={<IconSparkles className="h-8 w-8" />}
        statusLabel="En construcción"
        title="Estamos preparando las herramientas premium"
        description="Cálculos avanzados pensados para clientes y suscriptores del despacho, con más variables y escenarios que las versiones gratuitas."
        note="A diferencia de las gratuitas, las premium incluyen el acompañamiento profesional para interpretar cada resultado y decidir con criterio, no solo el número."
        ctaLabel="Quiero saber más por WhatsApp"
        secondary={{ label: 'Ver calculadoras gratuitas', to: '/calculadoras' }}
      />
    </>
  )
}
