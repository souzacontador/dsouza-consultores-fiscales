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

## Pendientes / DoD (por marcar en prompts posteriores)

- [ ] Reemplazar **testimonios de ejemplo** por reales (buscar `TESTIMONIO DE EJEMPLO` en el código).
- [ ] Revisar y validar legalmente el **Aviso de Privacidad** (LFPDPPP).
- [ ] Verificar datos marcados `[VERIFICAR]` (p. ej. título profesional del titular).
- [ ] Sustituir el panel visual del hero y de media-texto por imágenes reales si se desean.
- [ ] Confirmar contenido de **Recursos** y **Calculadoras** (hoy en “próximamente”).

## Notas de contenido (reglas del proyecto)

- **Cero datos inventados:** no hay cifras de clientes, años de experiencia, certificaciones ni premios. Las señales de confianza son genéricas y verificables.
- **Tono preventivo y educativo:** no se prometen resultados garantizados ante el SAT.
- **Un solo H1 por página** (el del hero) y una sola acción primaria por sección.
