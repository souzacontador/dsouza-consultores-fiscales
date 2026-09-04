import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import Contacto from '../components/sections/Contacto'

export default function ContactoPage() {
  return (
    <>
      <Seo path="/contacto" />
      <Hero
        eyebrow="Contacto"
        title="Hablemos de tu situación fiscal"
        subtitle="Cuéntanos tu caso y te respondemos en horario hábil (Lun–Vie 9:00–18:00). Atención directa del titular, sin compromiso."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Solicita tu diagnóstico por WhatsApp"
      />
      <Contacto />
    </>
  )
}
