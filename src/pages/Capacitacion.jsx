import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import { Section, SectionHeader } from '../components/ui'
import { IconArrowRight, IconWhatsApp } from '../components/Icons'
import cursos from '../data/capacitacion.json'

// Cursos de capacitación: HTML autocontenidos (flyers) copiados a
// public/capacitacion/ por scripts/sync-capacitacion.mjs, que también genera
// src/data/capacitacion.json. Para agregar un curso basta una entrada nueva en
// ese script y `npm run capacitacion`: la introducción de la página no cambia.
//
// "Próximos" vs "finalizados" se decide AQUÍ con la fecha de fin del curso
// (endISO), no en el JSON, para que un curso que concluye entre despliegues
// pase a "Finalizados" sin volver a sincronizar. El primer render (prerender y
// primera pasada del cliente) usa la hora del build (__BUILD_TS__) para que la
// hidratación coincida; después se corrige con la hora real del visitante.
const toMs = (iso) => Date.parse(iso)

function useNow() {
  const [now, setNow] = useState(__BUILD_TS__)
  useEffect(() => {
    setNow(Date.now())
  }, [])
  return now
}

function Dato({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium leading-snug text-secondary">{children}</dd>
    </div>
  )
}

function CursoCard({ curso, finalizado, eager }) {
  return (
    <li
      className={`card flex flex-col overflow-hidden !p-0 border-t-4 transition-shadow hover:shadow-card-hover ${
        finalizado ? 'border-t-line' : 'border-t-primary'
      }`}
    >
      <div className="relative">
        <img
          src={curso.preview}
          alt={`Vista previa: ${curso.title}`}
          width="1200"
          height="630"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`aspect-[1200/630] w-full border-b border-line object-cover ${
            finalizado ? 'grayscale' : ''
          }`}
        />
        {finalizado && (
          <span className="absolute left-4 top-4 rounded-md bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Finalizado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-dark">{curso.tipo}</p>
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-secondary">
          {curso.title}
        </h3>

        <dl className="mt-4 grid flex-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Dato label="Fechas">{curso.fecha}</Dato>
          </div>
          <Dato label="Horario">{curso.horario}</Dato>
          <Dato label="Modalidad">{curso.modalidad}</Dato>
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={`/capacitacion/${curso.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('capacitacion_open', { curso: curso.slug })}
            className="btn-secondary flex-1"
            aria-label={`Ver curso: ${curso.title} (abre en pestaña nueva)`}
          >
            Ver curso
            <IconArrowRight className="h-4 w-4" />
          </a>
          {finalizado ? (
            <button
              type="button"
              disabled
              className="btn flex-1 cursor-not-allowed border border-line bg-tint text-muted"
            >
              Inscripción cerrada
            </button>
          ) : (
            <a
              href={curso.enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('capacitacion_whatsapp', { curso: curso.slug })}
              className="btn-whatsapp flex-1"
            >
              <IconWhatsApp className="h-5 w-5" />
              Inscribirme por WhatsApp
            </a>
          )}
        </div>
      </div>
    </li>
  )
}

export default function Capacitacion() {
  const now = useNow()
  const proximos = cursos
    .filter((c) => toMs(c.endISO) > now)
    .sort((a, b) => toMs(a.startISO) - toMs(b.startISO))
  const finalizados = cursos
    .filter((c) => toMs(c.endISO) <= now)
    .sort((a, b) => toMs(b.startISO) - toMs(a.startISO))

  return (
    <>
      <Seo path="/capacitacion" />

      <Hero
        title="Capacitación"
        subtitle="Explora nuestros cursos, talleres y jornadas de actualización profesional. Consulta los detalles de cada evento y solicita informes o inscríbete por WhatsApp."
        showCta={false}
      />

      {proximos.length > 0 && (
        <Section bg="base" id="proximos" className="scroll-mt-36">
          <SectionHeader
            title="Próximos cursos"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {proximos.map((c, i) => (
              <CursoCard key={c.slug} curso={c} eager={i < 2} />
            ))}
          </ul>
        </Section>
      )}

      {finalizados.length > 0 && (
        <Section bg="tint" id="finalizados" className="scroll-mt-36">
          <SectionHeader
            title="Cursos finalizados"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {finalizados.map((c) => (
              <CursoCard key={c.slug} curso={c} finalizado />
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
