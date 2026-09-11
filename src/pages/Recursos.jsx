import { track } from '@vercel/analytics'
import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import EstadoVacio from '../components/sections/EstadoVacio'
import CategoriasRecursos, { SectionPill } from '../components/sections/CategoriasRecursos'
import VideoCard from '../components/sections/VideoCard'
import { Section, SectionHeader } from '../components/ui'
import { IconDocument, IconLedger, IconChat, IconLayers, IconCheck, IconPlay, IconArrowRight } from '../components/Icons'
import boletines from '../data/boletines.json'
import comunicados from '../data/comunicados.json'
import guias from '../data/guias.json'
import videosData from '../data/videos.json'

// Videoteca: videos del canal de YouTube del titular, sincronizados desde el
// feed público (ver scripts/sync-videos.mjs). Miniatura local; el reproductor
// se carga solo al hacer clic.
const videos = videosData.videos

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
  { id: 'guias', label: 'Guías', icon: <IconCheck />, accent: 'primary', count: guias.length },
  { id: 'videoteca', label: 'Videoteca', icon: <IconPlay />, accent: 'accent', count: videos.length },
  { id: 'blog', label: 'Blog', icon: <IconLayers />, soon: true },
  { id: 'articulos', label: 'Artículos', icon: <IconLedger />, soon: true },
]

export default function Recursos() {
  const total = boletines.length

  return (
    <>
      <Seo path="/recursos" />

      <Hero
        eyebrow="Recursos"
        title="Recursos para entender cómo te fiscalizan"
        subtitle={`Boletines fiscales semanales, comunicados puntuales, guías prácticas y videos sobre lo que el SAT, el IMSS y el INFONAVIT están haciendo, explicado a tiempo. ${total} boletines, ${comunicados.length} comunicados, ${guias.length} ${guias.length === 1 ? 'guía' : 'guías'} y ${videos.length} videos publicados; blog y artículos en camino.`}
        secondary={{ label: 'Conoce los servicios', to: '/servicios' }}
        ctaLabel="Pregunta por WhatsApp"
      />

      <CategoriasRecursos categorias={CATEGORIAS} />

      <Section bg="base" id="boletines" className="scroll-mt-36">
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
        <Section bg="tint" id="comunicados" className="scroll-mt-36">
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

      {guias.length > 0 && (
        <Section bg="base" id="guias" className="scroll-mt-36">
          <SectionHeader
            eyebrow={<SectionPill accent="primary">Guías prácticas</SectionPill>}
            title="Guías DSouza"
            subtitle="Presentaciones interactivas para entender un tema y resolverlo paso a paso. Se abren a pantalla completa; navega con flechas o clic. Del más reciente al más antiguo."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {guias.map((g, i) => (
              <li key={g.slug} className="card flex flex-col overflow-hidden !p-0 border-t-4 border-t-primary transition-shadow hover:shadow-card-hover">
                <a
                  href={`/guias/${g.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('guia_open', { guia: g.slug })}
                  className="group flex h-full flex-col focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Abrir ${g.title} (abre en pestaña nueva)`}
                >
                  <img
                    src={g.preview}
                    alt={`Vista previa de ${g.title}`}
                    width="1200"
                    height="630"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="aspect-[1200/630] w-full border-b border-line object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={g.dateISO} className="text-sm font-semibold uppercase tracking-wider text-primary-dark">
                      {g.dateLabel}
                    </time>
                    <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-secondary group-hover:text-primary-dark">
                      {g.title}
                    </h3>
                    {g.description && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{g.description}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                      Abrir guía
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {videos.length > 0 && (
        <Section bg="tint" id="videoteca" className="scroll-mt-36">
          <SectionHeader
            eyebrow={<SectionPill accent="accent">Videoteca</SectionPill>}
            title="Videoteca DSouza"
            subtitle="Videos del canal de YouTube del titular: explicaciones breves sobre obligaciones, plazos y cambios fiscales. Se reproducen aquí mismo."
          />

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} eager={i < 2} />
            ))}
          </ul>

          <p className="mt-8 text-center text-sm text-muted">
            <a
              href={videosData.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-secondary transition-colors hover:text-primary-dark"
            >
              Ver todos los videos en el canal de YouTube
              <IconArrowRight className="h-4 w-4" />
            </a>
          </p>
        </Section>
      )}

      <EstadoVacio
        bg="base"
        icon={<IconDocument className="h-8 w-8" />}
        statusLabel="Próximamente"
        title="Blog y artículos en camino"
        description="Además de los boletines, comunicados y guías, estamos preparando material práctico para entender tu riesgo fiscal y cómo prevenirlo."
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
        ]}
        ctaLabel="Avísame cuando estén listos"
      />
    </>
  )
}
