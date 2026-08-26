import Hero from '../components/sections/Hero'
import Testimonios from '../components/sections/Testimonios'
import Cta from '../components/sections/Cta'

export default function TestimoniosPage() {
  return (
    <>
      <Hero
        eyebrow="Testimonios"
        title="La experiencia que queremos que vivas con nosotros"
        subtitle="Estamos construyendo nuestro muro de testimonios reales con la autorización de cada cliente. Mientras tanto, estos ejemplos ilustran el tipo de acompañamiento y claridad que ofrecemos."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
      />
      <Testimonios bg="tint" />
      <Cta />
    </>
  )
}
