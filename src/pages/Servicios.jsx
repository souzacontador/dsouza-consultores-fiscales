import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import MediaTexto from '../components/sections/MediaTexto'
import Cta from '../components/sections/Cta'
import { IloContabilidad, IloAuditoria } from '../components/sections/illustrations'

// Sin cita ilustrativa: se añadirá un testimonio real con autorización del cliente.

export default function ServiciosPage() {
  return (
    <>
      <Seo path="/servicios" />
      <Hero
        eyebrow="Servicios"
        title="Servicios contables y fiscales con visión algorítmica"
        subtitle="Contabilidad al día, asesoría fiscal preventiva, auditoría algorítmica de CFDI y capacitación — cuatro frentes para que cumplas con el SAT, el IMSS y el INFONAVIT y entiendas tu riesgo real."
        secondary={{ label: 'Ir a contacto', to: '/contacto' }}
        ctaLabel="Agenda tu diagnóstico"
      />

      <MediaTexto
        bg="base"
        media={<IloContabilidad />}
        eyebrow="Contabilidad y asesoría preventiva"
        title="Tu contabilidad al día y tu riesgo bajo control"
        paragraphs={[
          'Llevo tu contabilidad y tus obligaciones en orden, y además reviso el riesgo de tus operaciones con anticipación — no solo capturo, timbro y declaro.',
          'Así corregimos a tiempo, cuando todavía se puede hacer de forma ordenada, antes de que llegue una carta invitación o una revisión electrónica.',
        ]}
        bullets={[
          'Contabilidad al día, sin sorpresas a fin de mes',
          'Obligaciones ante SAT, IMSS e INFONAVIT cubiertas y en orden',
          'Revisión del riesgo de tus operaciones antes de que la autoridad actúe',
          'Reportes claros mes a mes, en lenguaje de negocio',
        ]}
        whatsapp
      />

      <MediaTexto
        bg="tint"
        reverse
        media={<IloAuditoria />}
        eyebrow="Auditoría algorítmica y capacitación"
        title="Un mapa de riesgo con semáforo, y equipos que entienden la IA fiscal"
        paragraphs={[
          'Analizo tus CFDI y operaciones con la misma lógica con la que fiscalizan el SAT, el IMSS y el INFONAVIT, y te entrego un mapa de riesgo con semáforo: qué está en orden, qué conviene revisar y qué requiere atención.',
          'Y formo a tu equipo, contadores y empresarios en cómo la autoridad fiscaliza con inteligencia artificial, con casos y simulaciones para que la prevención sea parte de la operación.',
        ]}
        bullets={[
          'Análisis de tus CFDI y operaciones con criterio de fiscalización',
          'Mapa de riesgo con semáforo (verde, ámbar, rojo) y prioridades',
          'Informe con los focos rojos detectados y recomendaciones concretas',
          'Capacitación con casos y simulaciones para equipo, contadores y empresarios',
        ]}
      />

      <Cta />
    </>
  )
}
