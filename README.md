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
| Tipografías | Lora (títulos) + Inter (texto), `display: swap` | Cargadas en `index.html`. |

### Tokens de diseño

- **Primario** `#00B8D9` · **Secundario** `#0A2540` · **Acento** `#F5A623`
- Superficies: `base` (blanco) y `tint` (tinte suave) que alternan entre secciones.
- Radio de esquinas: `md` (consistente en botones, cards e inputs).

## Páginas

`/` Inicio · `/servicios` · `/nosotros` · `/testimonios` · `/recursos` · `/calculadoras` · `/calculadoras-premium` · `/contacto` · más `/aviso-de-privacidad` (placeholder) y 404.

## Instalación y uso

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → dist/
npm run preview  # previsualiza el build
```

## Publicación (en un paso)

- **Vercel:** importar el repo o `vercel` (usa `vercel.json` para el fallback de SPA).
- **Netlify:** arrastrar la carpeta `dist/` o conectar el repo (usa `public/_redirects`).

Ambos casos ya incluyen el rewrite `/* → index.html` para que las rutas no den 404.

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
2. **Dominio propio** (p. ej. `dsouzaconsultores.mx`): comprarlo y conectarlo en
   Vercel → Settings → Domains. Al hacerlo, actualizar `SITE_URL` en
   `src/data/site.js` y las URLs de `public/sitemap.xml`, `public/robots.txt` e
   `index.html`.
3. **Contenido en LinkedIn** enlazando al sitio (skills del despacho:
   `linkedin-fiscal-mx`, `generador-contenido-fiscal-social`).

## Scripts

- `npm run dev` — desarrollo · `npm run build` — build + pre-render de metadatos
  por ruta (`scripts/postbuild-meta.mjs`) · `npm run og` — regenera
  `public/og-image.png` desde `scripts/og-image.svg`.
- `npm run boletines` — sincroniza los boletines desde el repo público
  `souzacontador/BOLETIN-DSOUZA` a `public/boletines/` y regenera
  `src/data/boletines.json` (título, descripción y fecha leídos de cada archivo).
  Genera la vista previa 1200×630 solo para los boletines que no la traigan.

## Publicar un boletín nuevo (flujo)

1. Sube el boletín al repo `BOLETIN-DSOUZA` con la convención
   `Boletin-Fiscal-DSouza-DD-DD-mmm-AAAA.html` (y opcionalmente su
   `…-preview.png` 1200×630).
2. En este proyecto: `npm run boletines` → revisa `src/data/boletines.json`.
3. Agrega la URL nueva a `public/sitemap.xml` (bloque de boletines).
4. `git commit` + `git push` → Vercel publica y aparece en `/recursos`.

Nombres fuera de la convención se mapean en `RENAME`/`DATE_OVERRIDE` dentro de
`scripts/sync-boletines.mjs`.

## Pendientes / DoD (por marcar en prompts posteriores)

- [ ] **Activar Web Analytics** en el dashboard de Vercel (ver arriba).
- [ ] Reemplazar **testimonios de ejemplo** por reales (buscar `TESTIMONIO DE EJEMPLO`).
      `/testimonios` está fuera del navbar (sigue en footer) hasta tener 1–2 reales.
- [ ] Revisar y validar legalmente el **Aviso de Privacidad** (LFPDPPP).
- [ ] Verificar datos `[VERIFICAR]`: cédula/colegios del titular, fecha de
      fundación, geo exacta del JSON-LD (hoy: centroide del C.P. 21280) y
      `SITE_URL` al conectar dominio propio.
- [ ] Conectar **backend real del formulario** (hoy compone el mensaje hacia
      WhatsApp; correo visible como vía secundaria) — `TODO` en `Contacto.jsx`.
- [ ] Quitar `noindex` de **Recursos/Calculadoras/Premium** (en `src/data/seoMeta.js`)
      y devolverlas al `sitemap.xml` cuando publiquen contenido real.

## Notas de contenido (reglas del proyecto)

- **Cero datos inventados:** no hay cifras de clientes, años de experiencia, certificaciones ni premios. Las señales de confianza son genéricas y verificables.
- **Tono preventivo y educativo:** no se prometen resultados garantizados ante el SAT.
- **Un solo H1 por página** (el del hero) y una sola acción primaria por sección.
