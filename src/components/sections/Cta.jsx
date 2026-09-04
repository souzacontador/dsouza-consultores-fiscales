import { Section, WhatsAppButton } from '../ui'
import { CONTACT } from '../../data/site'

// Banda de CTA final (fondo oscuro). Acción primaria única: WhatsApp.
export default function Cta({
  title = 'Agenda tu diagnóstico fiscal',
  subtitle = 'En una primera conversación por WhatsApp entendemos tu caso y te decimos con claridad cómo podemos ayudarte a cumplir sin sustos. Sin compromiso.',
  ctaLabel, // texto opcional del botón (por defecto, el de WhatsAppButton)
}) {
  return (
    <Section bg="ink">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Da el primer paso</span>
        <h2 className="font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/75">{subtitle}</p>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton>{ctaLabel}</WhatsAppButton>
        </div>
        {/* Expectativas claras: la conversación inicial no compromete; el alcance y los
            honorarios se confirman antes de revisar documentación. */}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">
          La primera conversación es sin compromiso. Antes de revisar documentación, confirmamos
          alcance, información necesaria y honorarios aplicables.
        </p>
        <p className="mt-4 text-sm text-white/60">
          {CONTACT.hours} · {CONTACT.city} · {CONTACT.phoneDisplay}
        </p>
      </div>
    </Section>
  )
}
