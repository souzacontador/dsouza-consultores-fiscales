import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'

export default function NotFound() {
  return (
    <Hero
      eyebrow="Error 404"
      title="No encontramos esta página"
      subtitle="Es posible que el enlace haya cambiado. Vuelve al inicio o escríbenos por WhatsApp y con gusto te orientamos."
      secondary={{ label: 'Volver al inicio', to: '/' }}
      ctaLabel="Escríbenos por WhatsApp"
    />
  )
}
