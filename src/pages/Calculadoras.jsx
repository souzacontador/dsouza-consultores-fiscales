import Hero from '../components/sections/Hero'

export default function Calculadoras() {
  return (
    <Hero
      eyebrow="Calculadoras fiscales"
      title="Herramientas para estimar tus números con claridad"
      subtitle="Estamos desarrollando calculadoras fiscales gratuitas para ayudarte a estimar contribuciones y entender el impacto de tus operaciones. Muy pronto disponibles en esta sección. Si necesitas un cálculo hoy, escríbenos por WhatsApp."
      secondary={{ label: 'Ver calculadoras premium', to: '/calculadoras-premium' }}
      ctaLabel="Solicita un cálculo por WhatsApp"
    />
  )
}
