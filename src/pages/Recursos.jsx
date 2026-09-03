import { track } from '@vercel/analytics'
import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import EstadoVacio from '../components/sections/EstadoVacio'
import CategoriasRecursos, { SectionPill } from '../components/sections/CategoriasRecursos'
import { Section, SectionHeader } from '../components/ui'
import { IconDocument, IconLedger, IconChat, IconLayers, IconCheck, IconArrowRight } from '../components/Icons'
import boletines from '../data/boletines.json'
import comunicados from '../data/comunicados.json'

// Boletines: HTML autocontenidos copiados desde el repo BOLETIN-DSOUZA a
// public/boletines/ (ver scripts/sync-boletines.mjs). Comunicados: ídem desde
// souzacontador/Comunicados (scripts/sync-comunicados.mjs). Ambos abren en
// pestaña nueva porque no llevan la navegación del sitio.
//
// Categorías de la página: las publicadas llevan conteo y ancla; Blog,
// Artículos y Guías se anuncian como "Próximamente" hasta tener contenido.
// Ícono y acento por categoría (solo tokens de la paleta: cian / azul marino / gris).
const CATEGORIAS = [
  { id: 'boletines', label: 'Boletines', icon: <IconDocument />, accent: 'primary', count: boletines.length },
  { id: 'comunicados', label: 'Comunicados', icon: <IconChat />, accent: 'secondary', count: comunicados.length },
  { id: 'blog', label: 'Blog', icon: <IconLayers />, soon: true },
  { id: 'articulos', label: 'Artículos', icon: <IconLedger />, soon: true },
  { id: 'guias', label: 'Guías', icon: <IconCheck />, soon: true },
]

export default function Recursos() {
  const total = boletines.length

  return (
    <>
      <Seo path="/recursos" />

      <Hero
        eyebrow="Recursos"
        title="Recursos para entender cómo te fiscalizan"
        subtitle={`Boletines fiscales semanales y comunicados puntuales sobre lo que el SAT, el IMSS y el INFONAVIT están haciendo, explicado a tiempo. ${total} boletines y ${comunicados.length} comunicados publicados; blog, artículos y guías en camino.`}
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Pregunta por WhatsApp"
      />

      <CategoriasRecursos categorias={CATEGORIAS} />

      <Section bg="base" id="boletines" className="scroll-mt-32">
        <SectionHeader
          eyebrow={<SectionPill accent="primary">Boletines fiscales</SectionPill>}
          title="Boletín Fiscal Semanal DSouza"
          subtitle="Novedades de fiscalización, plazos clave y qué hacer al respecto. Del más reciente al más antiguo."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {boletines.map((b, i) => (
            <li key={b.slug} className="card flex flex-col overflow-hidden !p-0 border-t-4 border-t-primary transition-shadow hover:shadow-card-hover">
              <a
                href={`/boletines/${b.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('boletin_open', { boletin: b.slug })}
                className="group flex h-full flex-col focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Leer ${b.title} (abre en pestaña nueva)`}
              >
                <img
                  src={b.preview}
                  alt={`Vista previa del ${b.title}`}
                  width="1200"
                  height="630"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-[1200/630] w-full border-b border-line object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <time dateTime={b.dateISO} className="text-sm font-semibold uppercase tracking-wider text-primary-dark">
                    {b.dateLabel}
                  </time>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-secondary group-hover:text-primary-dark">
                    {b.title}
                  </h3>
                  {b.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.description}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                    Leer boletín
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {comunicados.length > 0 && (
        <Section bg="tint" id="comunicados" className="scroll-mt-32">
          <SectionHeader
            eyebrow={<SectionPill accent="secondary">Comunicados</SectionPill>}
            title="Comunicados DSouza"
            subtitle="Avisos puntuales sobre obligaciones y plazos concretos ante el SAT, el IMSS y el INFONAVIT. Del más reciente al más antiguo."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {comunicados.map((c, i) => (
              <li key={c.slug} className="card flex flex-col overflow-hidden !p-0 border-t-4 border-t-secondary transition-shadow hover:shadow-card-hover">
                <a
                  href={`/comunicados/${c.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('comunicado_open', { comunicado: c.slug })}
                  className="group flex h-full flex-col focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Leer ${c.title} (abre en pestaña nueva)`}
                >
                  <img
                    src={c.preview}
                    alt={`Vista previa del ${c.title}`}
                    width="1200"
                    height="630"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="aspect-[1200/630] w-full border-b border-line object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={c.dateISO} className="text-sm font-semibold uppercase tracking-wider text-primary-dark">
                      {c.dateLabel}
                    </time>
                    <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-secondary group-hover:text-primary-dark">
                      {c.title}
                    </h3>
                    {c.description && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                      Leer comunicado
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <EstadoVacio
        bg="tint"
        icon={<IconDocument className="h-8 w-8" />}
        statusLabel="Próximamente"
        title="Blog, artículos y guías en camino"
        description="Además de los boletines y comunicados, estamos preparando material práctico para entender tu riesgo fiscal y cómo prevenirlo."
        items={[
          {
            icon: <IconLayers className="h-5 w-5" />,
            label: 'Blog',
            desc: 'Actualidad fiscal comentada, en lenguaje de negocio.',
          },
          {
            icon: <IconLedger className="h-5 w-5" />,
            label: 'Artículos prácticos',
            desc: 'Casos y explicaciones claras sobre CFDI, SAT, IMSS e INFONAVIT.',
          },
          {
            icon: <IconCheck className="h-5 w-5" />,
            label: 'Guías descargables',
            desc: 'Checklists y pasos para ordenar tu cumplimiento.',
          },
        ]}
        ctaLabel="Avísame cuando estén listos"
      />
    </>
  )
}
