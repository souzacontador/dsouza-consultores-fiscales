import Hero from '../components/sections/Hero'
import Servicios from '../components/sections/Servicios'
import MediaTexto from '../components/sections/MediaTexto'
import Testimonios from '../components/sections/Testimonios'
import Cta from '../components/sections/Cta'

export default function ServiciosPage() {
  return (
    <>
      <Hero
        eyebrow="Servicios"
        title="Contabilidad, prevención y auditoría algorítmica en un solo despacho"
        subtitle="Tres frentes integrados para que cumplas al día, corrijas a tiempo y entiendas tu riesgo real frente al SAT, el IMSS y el INFONAVIT."
        secondary={{ label: 'Ir a contacto', to: '/contacto' }}
      />

      {/* Resumen de los 4 servicios (sin CTA para no duplicar la acción primaria) */}
      <Servicios bg="tint" showCta={false} />

      <MediaTexto
        bg="base"
        icon="shield"
        eyebrow="Asesoría fiscal preventiva"
        title="Corrige antes de la carta invitación, no después"
        paragraphs={[
          'La mayoría de los contadores reacciona cuando ya llegó el requerimiento o la revisión electrónica. Para entonces, las opciones se reducen y los costos suben.',
          'Revisamos el riesgo de tus operaciones con anticipación y ajustamos a tiempo, cuando todavía se puede corregir de forma ordenada y sin sanciones evitables.',
        ]}
        bullets={[
          'Revisión periódica de tus obligaciones y operaciones',
          'Detección temprana de inconsistencias entre CFDI y declaraciones',
          'Recomendaciones claras y priorizadas, no tecnicismos sueltos',
        ]}
        mediaKicker="Enfoque preventivo"
        mediaCaption="Primero el riesgo, luego el trámite."
        secondary={{ label: 'Ver el proceso', to: '/nosotros' }}
      />

      <MediaTexto
        bg="tint"
        reverse
        icon="radar"
        eyebrow="Auditoría algorítmica de CFDI"
        title="Leemos tu información como la lee el algoritmo del SAT"
        paragraphs={[
          'El SAT, el IMSS y el INFONAVIT cruzan de forma automática tus comprobantes, tu nómina, tu DIOT y tus declaraciones para detectar inconsistencias.',
          'Aplicamos esa misma lógica a tus datos y te entregamos un mapa de riesgo con semáforo: qué está en orden, qué conviene revisar y qué requiere atención inmediata.',
        ]}
        bullets={[
          'Análisis de CFDI y operaciones con criterio de fiscalización',
          'Mapa de riesgo con semáforo, fácil de priorizar',
          'Acompañamiento para corregir lo que aparezca en foco rojo',
        ]}
        mediaKicker="Mapa de riesgo"
        mediaCaption="Focos rojos detectados antes que la autoridad."
        whatsapp
      />

      <Testimonios bg="base" />
      <Cta />
    </>
  )
}
