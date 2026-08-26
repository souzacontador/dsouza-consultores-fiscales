import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import EstadoVacio from '../components/sections/EstadoVacio'
import { IconDocument, IconLedger, IconChat, IconMail } from '../components/Icons'

export default function Recursos() {
  return (
    <>
      <Seo path="/recursos" />
      <Hero
        eyebrow="Recursos"
        title="Recursos para entender cómo te fiscalizan"
        subtitle="Estamos preparando contenido educativo sobre fiscalización algorítmica: artículos, guías y boletines para que veas venir los focos rojos antes que el SAT."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Pregunta por WhatsApp"
      />

      <EstadoVacio
        bg="base"
        icon={<IconDocument className="h-8 w-8" />}
        statusLabel="Próximamente"
        title="Nuestra biblioteca está en camino"
        description="Muy pronto encontrarás aquí material práctico para entender tu riesgo fiscal y cómo prevenirlo. Mientras tanto, escríbenos y resolvemos tu duda directamente."
        items={[
          {
            icon: <IconLedger className="h-5 w-5" />,
            label: 'Artículos prácticos',
            desc: 'Casos y explicaciones claras sobre CFDI, SAT, IMSS e INFONAVIT.',
          },
          {
            icon: <IconChat className="h-5 w-5" />,
            label: 'Guías descargables',
            desc: 'Checklists y pasos para ordenar tu cumplimiento.',
          },
          {
            icon: <IconMail className="h-5 w-5" />,
            label: 'Boletines fiscales',
            desc: 'Novedades de fiscalización algorítmica, en lenguaje simple.',
          },
        ]}
        ctaLabel="Avísame cuando esté listo"
      />
    </>
  )
}
