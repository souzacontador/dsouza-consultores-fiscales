import { track } from '@vercel/analytics'
import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import EstadoVacio from '../components/sections/EstadoVacio'
import { Section, SectionHeader } from '../components/ui'
import { IconCalculator, IconCurrency, IconArrowRight, IconSparkles } from '../components/Icons'
import calculadoras from '../data/calculadoras.json'

const ICONS = { calculator: IconCalculator, currency: IconCurrency }

// Calculadoras: HTML autocontenidos copiados desde el repo dsouza-app a
// public/calculadoras/<slug>/ (ver scripts/sync-calculadoras.mjs). Abren a
// pantalla completa en pestaña nueva porque son apps con su propio encabezado.
export default function Calculadoras() {
  return (
    <>
      <Seo path="/calculadoras" />

      <Hero
        eyebrow="Calculadoras fiscales"
        title="Calculadoras fiscales para estimar con claridad"
        subtitle="Calculadoras y utilidades de apoyo para el ejercicio 2026, gratuitas y listas para usar. Elige una herramienta para comenzar."
        secondary={{ label: 'Ver calculadoras premium', to: '/calculadoras-premium' }}
        ctaLabel="Solicita un cálculo por WhatsApp"
      />

      <Section bg="base" id="herramientas">
        <SectionHeader
          eyebrow="Herramientas disponibles"
          title="Elige una calculadora"
          subtitle="Cada herramienta se abre a pantalla completa en una pestaña nueva."
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {calculadoras.map((c) => {
            const Icon = ICONS[c.icon] || IconCalculator
            return (
              <li key={c.slug}>
                <a
                  href={c.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('calculadora_open', { calculadora: c.slug })}
                  aria-label={`Abrir ${c.title} (abre en pestaña nueva)`}
                  className="card group flex h-full flex-col transition-shadow hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary-dark">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-secondary group-hover:text-primary-dark">
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                    Abrir calculadora
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-muted">
          Herramientas de apoyo interno: no sustituyen el análisis del caso concreto.
        </p>
      </Section>

      <EstadoVacio
        bg="tint"
        icon={<IconSparkles className="h-8 w-8" />}
        statusLabel="En camino"
        title="Más calculadoras en camino"
        description="Aquí aparecerán las siguientes herramientas (nómina, ISR, pagos provisionales, etc.) conforme se publiquen. Si necesitas un cálculo hoy, escríbenos."
        ctaLabel="Solicita un cálculo por WhatsApp"
        secondary={{ label: 'Ver versión premium', to: '/calculadoras-premium' }}
      />
    </>
  )
}
