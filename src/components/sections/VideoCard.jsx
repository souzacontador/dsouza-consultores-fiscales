import { useState } from 'react'
import { track } from '@vercel/analytics'
import { IconPlay, IconArrowRight } from '../Icons'

// Tarjeta de video de la Videoteca ("lite embed"): muestra la miniatura local y
// un botón de reproducir; el reproductor de YouTube (dominio sin cookies) se
// carga SOLO al hacer clic, para no cargar scripts de terceros al abrir la
// página. Acento ámbar (tercer tono de la paleta) para la categoría.
export default function VideoCard({ video, eager = false }) {
  const [playing, setPlaying] = useState(false)

  return (
    <li className="card flex flex-col overflow-hidden !p-0 border-t-4 border-t-accent transition-shadow hover:shadow-card-hover">
      <div className="relative aspect-video w-full border-b border-line bg-secondary">
        {playing ? (
          <iframe
            src={video.embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true)
              track('video_play', { video: video.id })
            }}
            aria-label={`Reproducir: ${video.title}`}
            className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          >
            <img
              src={video.thumb}
              alt=""
              width="1280"
              height="720"
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-secondary/20 transition-colors group-hover:bg-secondary/35">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-secondary shadow-card transition-transform group-hover:scale-105">
                <IconPlay className="h-7 w-7 translate-x-0.5" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time dateTime={video.dateISO} className="text-sm font-semibold uppercase tracking-wider text-status-warn">
          {video.dateLabel}
        </time>
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-secondary">{video.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{video.description}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('video_open_youtube', { video: video.id })}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary-dark"
        >
          Ver en YouTube
          <IconArrowRight className="h-4 w-4" />
        </a>
      </div>
    </li>
  )
}
