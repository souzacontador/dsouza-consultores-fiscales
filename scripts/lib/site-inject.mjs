// Utilidades compartidas por los scripts de sync (boletines y calculadoras) para
// añadir navegación y metadatos del sitio a páginas HTML autocontenidas SIN tocar
// su contenido ni su lógica.
//
// Algunas de esas páginas (empaquetadas con un esquema "__bundler": manifest +
// template en base64) reconstruyen el documento completo en runtime y descartan
// cualquier nodo estático del archivo. Por eso se inyectan dos cosas:
//   1) una barra estática tras <body> — visible sin JavaScript y para crawlers;
//   2) un script (id="dsz-inject") que, después de la carga, vuelve a insertar la
//      barra, el canonical, la description y el JSON-LD si la página los eliminó.
// Ambas inserciones son idempotentes (se detectan por id) para re-sync seguro.
import { SITE_URL } from '../../src/data/site.js'

export const BAR_ID = 'dsz-site-bar'
const BAR_STYLE =
  'font:600 14px/1.4 Inter,system-ui,sans-serif;background:#0A2540;color:#fff;padding:10px 16px;text-align:center'

// HTML de la barra: enlace de regreso + enlace al sitio.
export function barHtml(back) {
  return (
    `<div id="${BAR_ID}" style="${BAR_STYLE}">` +
    `<a href="${back.href}" style="color:#00B8D9;text-decoration:none">&larr; ${back.label}</a>` +
    `<span style="opacity:.5;margin:0 10px">|</span>` +
    `<a href="${SITE_URL}/" style="color:#fff;text-decoration:none">dsouzaconsultores.mx</a>` +
    `</div>`
  )
}

export function injectStaticBar(html, back) {
  if (html.includes(`id="${BAR_ID}"`)) return html
  return html.replace(/<body([^>]*)>/i, (tag) => `${tag}\n${barHtml(back)}\n`)
}

// Script de refuerzo en runtime.
// cfg: { canonical, back:{href,label}, ld?, description?, title?, force? }
//   - description sin `force`: solo se añade si la página no trae una.
//   - title / description con `force`: se imponen (metadatos SEO aprobados) aunque
//     la plantilla interna de la página traiga otros.
export function injectRuntimeEnsure(html, cfg) {
  if (html.includes('id="dsz-inject"')) return html
  // `<` escapado para que ningún texto pueda cerrar el <script>.
  const config = JSON.stringify(cfg).replace(/</g, '\\u003c')
  const js =
    `(function(){var C=${config};var n=0;` +
    `function ensure(){var b=document.body,h=document.head;if(!b||!h)return;` +
    `if(!document.getElementById('${BAR_ID}')){var d=document.createElement('div');d.id='${BAR_ID}';` +
    `d.setAttribute('style','${BAR_STYLE}');` +
    `d.innerHTML='<a href="'+C.back.href+'" style="color:#00B8D9;text-decoration:none">&larr; '+C.back.label+'</a>` +
    `<span style="opacity:.5;margin:0 10px">|</span><a href="${SITE_URL}/" style="color:#fff;text-decoration:none">dsouzaconsultores.mx</a>';` +
    `b.insertBefore(d,b.firstChild)}` +
    `if(C.canonical&&!h.querySelector('link[rel="canonical"]')){var l=document.createElement('link');l.rel='canonical';l.href=C.canonical;h.appendChild(l)}` +
    `if(C.title&&C.force&&document.title!==C.title){document.title=C.title}` +
    `if(C.description){var m=h.querySelector('meta[name="description"]');if(!m){m=document.createElement('meta');m.name='description';m.content=C.description;h.appendChild(m)}else if(C.force&&m.content!==C.description){m.content=C.description}}` +
    `if(C.ld&&!h.querySelector('script[data-dsz]')){var s=document.createElement('script');s.type='application/ld+json';s.setAttribute('data-dsz','1');s.textContent=JSON.stringify(C.ld);h.appendChild(s)}}` +
    // Reintenta durante ~8 s: cubre reconstrucciones asíncronas del documento.
    `var t=setInterval(function(){ensure();if(++n>16)clearInterval(t)},500);ensure();window.addEventListener('load',ensure)})();`
  return html.replace(/<\/body>/i, `<script id="dsz-inject">${js}</script>\n</body>`)
}
