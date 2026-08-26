import Hero from '../components/sections/Hero'
import Contacto from '../components/sections/Contacto'

export default function ContactoPage() {
  return (
    <>
      <Hero
        eyebrow="Contacto"
        title="Agenda tu diagnóstico fiscal"
        subtitle="Cuéntanos tu caso y da el primer paso hacia un cumplimiento sin sustos. Te atendemos directamente, en horario de oficina y sin compromiso."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
      />
      <Contacto />
    </>
  )
}
