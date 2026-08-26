import { Section, SectionHeader } from '../ui'
import { CONTACT } from '../../data/site'
import { IconLinkedIn, IconRadar, IconShield, IconChat } from '../Icons'

// Equipo. No se inventan años de experiencia, certificaciones ni premios.
// Cualquier dato específico debe verificarse antes de publicar.
export default function Equipo({ bg = 'tint' }) {
  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Quién te atiende"
        title="Atención directa con el responsable del despacho"
        subtitle="No pasas por intermediarios: trabajas con quien revisa tu información y responde por ella."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-5">
        {/* Titular */}
        <article className="card md:col-span-3">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-secondary font-heading text-2xl font-bold text-primary">
              DS
            </span>
            <div>
              <h3 className="font-heading text-xl font-semibold text-secondary">
                Daniel Souza Vázquez
              </h3>
              {/* [VERIFICAR] título profesional y forma de presentarlo */}
              <p className="text-sm text-muted">Titular · DSouza Consultores Fiscales</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Lidera el despacho con un enfoque preventivo y técnico: entender cómo el SAT, el IMSS y
            el INFONAVIT fiscalizan con algoritmos, para detectar los focos rojos en CFDI y
            operaciones antes de que lo haga la autoridad. Su prioridad es que cada cliente entienda
            su riesgo real y tome decisiones informadas.
          </p>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition-colors hover:text-secondary"
          >
            <IconLinkedIn className="h-5 w-5" />
            Perfil profesional en LinkedIn
          </a>
        </article>

        {/* Cómo trabaja el despacho */}
        <div className="md:col-span-2 grid gap-4">
          {[
            { icon: IconRadar, text: 'Lectura algorítmica de tu información fiscal' },
            { icon: IconShield, text: 'Criterio preventivo antes que reactivo' },
            { icon: IconChat, text: 'Explicaciones claras, en lenguaje de negocio' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-md border border-line bg-base p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary-dark">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-secondary">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
