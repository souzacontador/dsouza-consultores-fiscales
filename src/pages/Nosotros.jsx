import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import MediaTexto from '../components/sections/MediaTexto'
import PorQue from '../components/sections/PorQue'
import Equipo from '../components/sections/Equipo'
import Cta from '../components/sections/Cta'
import { IloFilosofia } from '../components/sections/illustrations'

// Diferenciadores de /nosotros — mismos conceptos que Inicio, redacción distinta.
const NOSOTROS_REASONS = [
  {
    icon: 'radar',
    title: 'Anticipación al algoritmo',
    desc: 'Reviso tu información con la misma lógica automatizada del SAT, el IMSS y el INFONAVIT, para ver lo que ellos verían — antes que ellos.',
  },
  {
    icon: 'layers',
    title: 'Un solo interlocutor para todo',
    desc: 'Contabilidad, asesoría preventiva y capacitación en un mismo lugar. Tu información fiscal deja de estar repartida entre proveedores desconectados.',
  },
  {
    icon: 'clock',
    title: 'Corregir a tiempo, no lamentar después',
    desc: 'Actúo sobre el riesgo mientras todavía se puede ordenar, no cuando ya llegó el requerimiento, la carta invitación o la multa.',
  },
  {
    icon: 'chat',
    title: 'Claridad para decidir',
    desc: 'Te explico en lenguaje de negocio qué significa cada foco rojo, para que tomes decisiones con información y no a ciegas.',
  },
]

export default function Nosotros() {
  return (
    <>
      <Seo path="/nosotros" />
      <Hero
        eyebrow="Nosotros"
        title="Un despacho que entiende los algoritmos del SAT"
        subtitle="Integramos contabilidad, asesoría preventiva y capacitación con un mismo eje: entender cómo te fiscaliza la autoridad para que cumplas con tranquilidad."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Solicita tu diagnóstico por WhatsApp"
      />

      {/* [VERIFICAR] fecha de fundación y trayectoria — no se afirman por no estar confirmadas. */}
      <MediaTexto
        bg="base"
        media={<IloFilosofia />}
        eyebrow="Nuestra historia y filosofía"
        title="Por qué existimos para prevenir, no para reaccionar"
        paragraphs={[
          'La fiscalización cambió. Hoy el SAT, el IMSS y el INFONAVIT utilizan información digital, CFDI, declaraciones y herramientas tecnológicas para identificar inconsistencias y seleccionar operaciones o contribuyentes de mayor riesgo. Una inconsistencia puede convertirse en una carta invitación o en una acción de comprobación sin previo aviso.',
          'Frente a eso, capturar, timbrar y declarar ya no alcanza. Por eso nuestra respuesta es prevenir: leer tu información con esa misma lógica y corregir a tiempo, cuando todavía se puede hacer de forma ordenada.',
          'Somos un despacho establecido en Mexicali, B.C., enfocado en PyMEs, profesionistas independientes y empresas de servicios que quieren cumplir bien y entender su riesgo real. Atendemos de forma presencial en Mexicali y a distancia en el resto de Baja California y en Puerto Peñasco, Sonora.',
        ]}
      />

      <PorQue
        bg="tint"
        eyebrow="Nuestra forma de trabajar"
        title="Lo que nos hace distintos"
        subtitle="No prometemos blindajes mágicos ante el SAT. Ofrecemos criterio, prevención y claridad para que tomes mejores decisiones."
        reasons={NOSOTROS_REASONS}
      />

      <Equipo bg="base" />
      <Cta />
    </>
  )
}
