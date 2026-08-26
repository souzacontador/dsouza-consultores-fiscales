import Hero from '../components/sections/Hero'
import MediaTexto from '../components/sections/MediaTexto'
import PorQue from '../components/sections/PorQue'
import Equipo from '../components/sections/Equipo'
import Cta from '../components/sections/Cta'

export default function Nosotros() {
  return (
    <>
      <Hero
        eyebrow="Nosotros"
        title="Un despacho que se anticipa, no que solo reacciona"
        subtitle="En DSouza Consultores Fiscales integramos contabilidad, prevención y capacitación con un mismo eje: entender cómo te fiscaliza la autoridad para que cumplas con tranquilidad."
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
      />

      <MediaTexto
        bg="base"
        icon="layers"
        eyebrow="Quiénes somos"
        title="Contabilidad al día, prevención y capacitación, sin fragmentar tu información"
        paragraphs={[
          'Somos un despacho contable y fiscal establecido en Mexicali, B.C., enfocado en PyMEs, profesionistas independientes y empresas de servicios.',
          'Nacimos de una convicción: no basta con capturar, timbrar y declarar. Cumplir hoy exige entender cómo el SAT, el IMSS y el INFONAVIT fiscalizan con algoritmos e inteligencia artificial, y actuar antes de que aparezca el problema.',
          'Por eso integramos los tres frentes bajo un mismo responsable, para que no repartas tu información fiscal entre proveedores que no se hablan entre sí.',
        ]}
        mediaKicker="Nuestro enfoque"
        mediaCaption="Preventivo, técnico y cercano."
      />

      <PorQue
        bg="tint"
        eyebrow="Nuestra forma de trabajar"
        title="Lo que nos hace distintos"
        subtitle="No prometemos blindajes mágicos ante el SAT. Prometemos criterio, prevención y claridad para que tomes mejores decisiones."
      />

      <Equipo bg="base" />
      <Cta />
    </>
  )
}
