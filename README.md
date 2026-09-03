# DSouza Consultores Fiscales — Sitio web

Sitio de conversión del despacho **DSouza Consultores Fiscales** (Mexicali, B.C.). MVP completo, navegable y publicable, construido con **Vite + React + Tailwind CSS**.

## Brief del proyecto

- **Problema que resuelve:** la mayoría de los contadores solo capturan, timbran y declaran, y reaccionan cuando ya llegó el requerimiento. El sitio posiciona a DSouza como un despacho preventivo que integra contabilidad al día, asesoría fiscal preventiva y capacitación.
- **Público:** PyMEs, profesionistas independientes y empresas de servicios en Mexicali/B.C.
- **Diferenciador (eje del copy):** dominio de cómo el SAT, IMSS e INFONAVIT fiscalizan con algoritmos e IA — detecta focos rojos en CFDI antes que la autoridad.
- **Objetivo:** generar diagnósticos fiscales agendados vía WhatsApp (CTA principal en todo el sitio).

## Stack y decisiones base

| Decisión | Elección | Porqué |
|---|---|---|
| Framework | Vite + React 18 | Rápido, editable e iterable; el refinamiento vendrá en prompts posteriores. |
| Estilos | Tailwind CSS 3.4 | Usa `tailwind.config.js` (tokens de diseño), mobile-first. |
| Ruteo | react-router-dom 6 | 8 páginas con rutas reales, sin recarga. |
| Tokens | CSS variables en `src/index.css` + mapeo en `tailwind.config.js` | Los componentes nunca usan hex; solo clases semánticas (`bg-primary`, `text-ink`, `rounded-md`, …). |
| Tipografías | Lora (títulos) + Inter (texto), `display: swap` | Auto-hospedadas en `public/fonts` (fuentes variables, subset latin, SIL OFL); `@font-face` en `src/index.css` y `preload` en `index.html`. Sin petición a Google Fonts. |

### Tokens de diseño

- **Primario** `#00B8D9` · **Secundario** `#0A2540` · **Acento** `#F5A623`
- Superficies: `base` (blanco) y `tint` (tinte suave) que alternan entre secciones.
- Radio de esquinas: `md` (consistente en botones, cards e inputs).

## Páginas

`/` Inicio · `/servicios` · `/nosotros` · `/testimonios` (noindex, ilustrativa) · `/recursos` · `/calculadoras` · `/calculadoras-premium` (noindex, en construcción) · `/contacto` · más `/aviso-de-privacidad` (noindex hasta validación legal) y 404 real (`dist/404.html`).

## Instalación y uso

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → dist/
npm run preview  # previsualiza el build
```

## Publicación (en un paso)

- **Vercel:** importar el repo (auto-deploy en cada push a `main`; cada rama genera un preview).
  `vercel.json` **no** reescribe todo a `index.html`: cada ruta existe pre-renderizada en `dist/`
  (`scripts/postbuild-meta.mjs`) y las URLs inexistentes reciben un **404 real** con
  `dist/404.html` (noindex). El mismo archivo define las cabeceras de seguridad y la caché
  inmutable de `/assets` y `/fonts`.
- Netlify ya no está contemplado (se eliminó `public/_redirects`).

## Medición y tráfico (condiciones para el objetivo de 4 diagnósticos/mes)

**Medición (ya integrada en el código):** cada clic en un botón de WhatsApp se
registra como evento `whatsapp_click` con la página de origen, vía Vercel
Analytics. **Falta un paso manual:** en el dashboard de Vercel → proyecto →
pestaña **Analytics** → *Enable Web Analytics* (gratis). Sin eso, el script no
carga y no se mide nada.

**Tráfico (acciones fuera del código, en orden de impacto):**
1. **Google Business Profile** (gratis, ~20 min): crear la ficha en
   business.google.com con la dirección real, horario, teléfono y link al sitio.
   Para búsquedas locales "contador Mexicali / cerca de mí" rinde más que todo
   el SEO on-page.
2. **Dominio propio — hecho:** `dsouzaconsultores.mx` conectado en Vercel (HTTPS en raíz
   y www; `SITE_URL` ya apunta al dominio). Siguiente paso: verificar el dominio en
   **Google Search Console** (registro TXT en GoDaddy, sin tocar MX) y enviar
   `https://dsouzaconsultores.mx/sitemap.xml`.
3. **Contenido en LinkedIn** enlazando al sitio (skills del despacho:
   `linkedin-fiscal-mx`, `generador-contenido-fiscal-social`).

## Scripts

- `npm run dev` — desarrollo · `npm run build` — build + pre-render de metadatos
  por ruta, `404.html` y JSON-LD FAQPage en Inicio (`scripts/postbuild-meta.mjs`) ·
  `npm run og` — regenera `public/og-image.png` desde `scripts/og-image.svg` ·
  `npm run icons` — regenera `favicon.ico`, `apple-touch-icon.png` e
  `icon-192/512.png` desde `public/favicon.svg`.
- `npm run boletines` — sincroniza los boletines desde el repo público
  `souzacontador/BOLETIN-DSOUZA` a `public/boletines/` y regenera
  `src/data/boletines.json` (título, descripción y fecha leídos de cada archivo).
  Genera la vista previa 1200×630 solo para los boletines que no la traigan.
- `npm run calculadoras` — sincroniza las calculadoras desde el repo público
  `souzacontador/dsouza-app` a `public/calculadoras/<slug>/` y regenera
  `src/data/calculadoras.json`. Para una calculadora nueva: súbela a su carpeta
  en dsouza-app y añade su slug + textos de tarjeta en `CALCULADORAS` dentro
  de `scripts/sync-calculadoras.mjs`. El sitemap la incluye solo en el build.

## Pre-render del cuerpo (HTML completo sin JavaScript)

El build genera el HTML de **cada ruta con el contenido ya renderizado**
(`vite build --ssr src/entry-server.jsx` → `scripts/postbuild-meta.mjs`
inyecta el cuerpo en `<div id="root">`). Crawlers, scrapers sociales y
asistentes de IA que no ejecutan JavaScript ven la página completa; en el
navegador React **hidrata** ese HTML (`hydrateRoot` en `src/main.jsx`; en
`npm run dev` sigue renderizando en cliente).

**Regla para componentes nuevos (SSR-safe):** en el cuerpo del render no usar
`window`, `document`, `localStorage`, `Math.random()` ni fechas actuales —
solo dentro de `useEffect` o en manejadores de eventos. El estado inicial de
`useState` debe ser el mismo en servidor y cliente. Si se rompe esta regla,
React avisa en consola de un error de hidratación y la página puede parpadear.

## Publicar un boletín nuevo (flujo)

1. Sube el boletín al repo `BOLETIN-DSOUZA` con la convención
   `Boletin-Fiscal-DSouza-DD-DD-mmm-AAAA.html` (y opcionalmente su
   `…-preview.png` 1200×630).
2. En este proyecto: `npm run boletines` → revisa `src/data/boletines.json`.
3. `git commit` + `git push` → Vercel publica y aparece en `/recursos`.

El `sitemap.xml` se genera solo en cada build (`scripts/generate-sitemap.mjs`)
a partir de las rutas indexables, `boletines.json` y `calculadoras.json`; no
existe un sitemap manual que actualizar.

Nombres fuera de la convención se mapean en `RENAME`/`DATE_OVERRIDE` dentro de
`scripts/sync-boletines.mjs`. Los títulos/descriptions SEO aprobados (≤60/≤160
caracteres) viven en `SEO_OVERRIDE` del mismo script: se aplican al `<title>`,
`og:title`, `description`, `og:description`, al JSON-LD `Article` y a `/recursos`;
el contenido del boletín no se toca. El sync también inyecta (idempotente) una barra
de regreso al sitio y un script de refuerzo (`scripts/lib/site-inject.mjs`) porque
algunos boletines y calculadoras reconstruyen el documento al cargar.

## Pendientes / DoD (por marcar en prompts posteriores)

- [x] **Web Analytics** activado en el dashboard de Vercel.
- [ ] Reemplazar **testimonios de ejemplo** por reales (buscar `TESTIMONIO DE EJEMPLO`).
      Mientras tanto `/testimonios` está en `noindex`, fuera del navbar y del footer, e
      Inicio/Servicios no muestran bloques de testimonios.
- [ ] Revisar y validar legalmente el **Aviso de Privacidad** (LFPDPPP). Mientras tanto la
      página está en `noindex` (quitarlo en `src/data/seoMeta.js` al validar el texto).
- [ ] Crear la ficha de **Google Business Profile** y verificar **Search Console** (enviar sitemap).
- [ ] Verificar datos `[VERIFICAR]`: cédula/colegios del titular, fecha de
      fundación, geo exacta del JSON-LD (hoy: centroide del C.P. 21280) y
      `SITE_URL` al conectar dominio propio.
- [ ] Conectar **backend real del formulario** (hoy compone el mensaje hacia
      WhatsApp; correo visible como vía secundaria) — `TODO` en `Contacto.jsx`.
- [ ] Quitar `noindex` de **Calculadoras Premium** (en `src/data/seoMeta.js`)
      cuando publique contenido real; el sitemap la incluirá solo.
      (Recursos y Calculadoras ya están indexadas y con contenido.)

## Notas de contenido (reglas del proyecto)

- **Cero datos inventados:** no hay cifras de clientes, años de experiencia, certificaciones ni premios. Las señales de confianza son genéricas y verificables.
- **Zona de atención (fuente única `CONTACT.serviceArea` en `src/data/site.js`):** presencial en Mexicali; a distancia en el resto de Baja California y en Puerto Peñasco, Sonora. Se refleja en Confianza, Nosotros, Contacto, footer, FAQ y en `areaServed` del JSON-LD (`index.html`). Sin páginas por ciudad sin contenido real.
- **Tono preventivo y educativo:** no se prometen resultados garantizados ante el SAT.
- **Un solo H1 por página** (el del hero) y una sola acción primaria por sección.
