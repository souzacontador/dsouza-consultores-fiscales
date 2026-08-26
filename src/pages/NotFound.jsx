import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" />
      <Hero
        eyebrow="Error 404"
        title="No encontramos esta página"
        subtitle="Es posible que el enlace haya cambiado. Vuelve al inicio o escríbenos por WhatsApp y con gusto te orientamos."
        secondary={{ label: 'Volver al inicio', to: '/' }}
        ctaLabel="Escríbenos por WhatsApp"
      />
    </>
  )
}
