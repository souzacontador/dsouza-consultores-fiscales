import { useEffect } from 'react'
import { SITE_URL } from '../data/site'
import { SEO_META } from '../data/seoMeta'

// Gestión de <head> por ruta sin dependencias: actualiza (upsert) los tags
// existentes en su lugar, evitando duplicados y sin depender de rAF.
function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// SEO por página. Lee título/description/noindex de SEO_META (fuente única).
export default function Seo({ path = '/' }) {
  useEffect(() => {
    const meta = SEO_META[path]
    if (!meta) return
    const { title, description, noindex } = meta
    const url = `${SITE_URL}${path === '/' ? '' : path}`
    const image = `${SITE_URL}/og-image.png`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
  }, [path])

  return null
}
