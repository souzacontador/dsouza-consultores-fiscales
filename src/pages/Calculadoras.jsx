import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import EstadoVacio from '../components/sections/EstadoVacio'
import { IconCalculator } from '../components/Icons'

export default function Calculadoras() {
  return (
    <>
      <Seo path="/calculadoras" />
      <Hero
        eyebrow="Calculadoras fiscales"
        title="Calculadoras fiscales para estimar con claridad"
        subtitle="Estamos desarrollando herramientas gratuitas para que estimes tus contribuciones y entiendas el impacto de tus operaciones antes de decidir."
        secondary={{ label: 'Ver calculadoras premium', to: '/calculadoras-premium' }}
        ctaLabel="Solicita un cálculo por WhatsApp"
      />

      <EstadoVacio
        bg="base"
        icon={<IconCalculator className="h-8 w-8" />}
        statusLabel="En construcción"
        title="Nuestras calculadoras están en construcción"
        description="Muy pronto podrás hacer estimaciones fiscales de forma gratuita, directo en el sitio. Si necesitas un cálculo hoy, escríbenos y lo revisamos contigo."
        ctaLabel="Solicita un cálculo por WhatsApp"
        secondary={{ label: 'Ver versión premium', to: '/calculadoras-premium' }}
      />
    </>
  )
}
