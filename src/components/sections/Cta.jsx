import { Section, WhatsAppButton } from '../ui'
import { CONTACT } from '../../data/site'

// Banda de CTA final (fondo oscuro). Acción primaria única: WhatsApp.
export default function Cta({
  title = 'Agenda tu diagnóstico fiscal',
  subtitle = 'En una primera conversación por WhatsApp entendemos tu caso y te decimos con claridad cómo podemos ayudarte a cumplir sin sustos. Sin compromiso.',
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
          <WhatsAppButton />
        </div>
        <p className="mt-6 text-sm text-white/60">
          {CONTACT.hours} · {CONTACT.city} · {CONTACT.phoneDisplay}
        </p>
      </div>
    </Section>
  )
}
