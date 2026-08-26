import { useState } from 'react'
import { Section, SectionHeader } from '../ui'
import { FAQS } from '../../data/site'
import { IconChevronDown } from '../Icons'

// Preguntas frecuentes — acordeón accesible.
export default function Faq({ bg = 'tint' }) {
  const [open, setOpen] = useState(0)

  return (
    <Section bg={bg}>
      <SectionHeader
        eyebrow="Preguntas frecuentes"
        title="Lo que suelen preguntarnos antes de empezar"
        subtitle="Y si tu duda no está aquí, escríbenos por WhatsApp: la resolvemos sin compromiso."
      />

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-md border border-line bg-base">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          const btnId = `faq-btn-${i}`
          const panelId = `faq-panel-${i}`
          return (
            <div key={i}>
              <h3 className="m-0">
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-base font-semibold text-secondary transition-colors hover:bg-tint"
                >
                  <span>{faq.q}</span>
                  <IconChevronDown
                    aria-hidden
                    className={`h-5 w-5 shrink-0 text-primary-dark transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!isOpen}
                className="px-5 pb-5 text-sm leading-relaxed text-muted"
              >
                {faq.a}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
