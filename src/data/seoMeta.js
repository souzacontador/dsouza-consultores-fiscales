// ============================================================
// Fuente ÚNICA de metadatos SEO por ruta.
// La consumen: el componente <Seo> (runtime) y el script
// scripts/postbuild-meta.mjs (pre-render de <head> por URL).
// Reglas: title <60 chars, description <160, keyword + marca.
// noindex: true en páginas vacías/utilitarias hasta tener contenido.
// ============================================================

export const SEO_META = {
  '/': {
    title: 'Contador en Mexicali | DSouza Consultores Fiscales',
    description:
      'Contabilidad, asesoría fiscal preventiva y auditoría de CFDI en Mexicali. Detecta los focos rojos antes que el SAT y agenda tu diagnóstico fiscal.',
  },
  '/servicios': {
    title: 'Asesoría fiscal y auditoría de CFDI | DSouza',
    description:
      'Contabilidad al día, asesoría fiscal preventiva, auditoría algorítmica de CFDI y capacitación en Mexicali. Corrige a tiempo, antes que el SAT.',
  },
  '/nosotros': {
    title: 'Nosotros | DSouza Consultores Fiscales Mexicali',
    description:
      'Despacho fiscal en Mexicali especializado en fiscalización algorítmica del SAT, IMSS e INFONAVIT. Prevención y criterio, no reacción.',
  },
  '/testimonios': {
    title: 'Testimonios | DSouza Consultores Fiscales',
    description:
      'Lo que buscamos que vivan PyMEs, profesionistas y empresas de servicios con nuestra asesoría fiscal preventiva en Mexicali. Agenda tu diagnóstico.',
    noindex: true, // solo testimonios ilustrativos; indexar cuando haya reales autorizados
  },
  '/recursos': {
    title: 'Recursos fiscales: boletines y comunicados | DSouza',
    description:
      'Boletines fiscales semanales y comunicados de DSouza Consultores: novedades del SAT, IMSS e INFONAVIT, plazos clave y qué hacer a tiempo. Gratis y en línea.',
  },
  '/calculadoras': {
    title: 'Calculadoras fiscales 2026 | DSouza Consultores',
    description:
      'Calculadora de IVA y retenciones y equivalencias USD/MXN 2026, gratuitas. Herramientas de apoyo de DSouza Consultores Fiscales en Mexicali.',
  },
  '/calculadoras-premium': {
    title: 'Calculadoras premium | DSouza Consultores',
    description:
      'Cálculos fiscales avanzados para clientes y suscriptores, con acompañamiento profesional para interpretar cada resultado. En construcción.',
    noindex: true, // sin contenido aún
  },
  '/contacto': {
    title: 'Contacto | DSouza Consultores Fiscales Mexicali',
    description:
      'Agenda tu diagnóstico fiscal en Mexicali. Escríbenos por WhatsApp o correo; respondemos en horario hábil (Lun–Vie 9:00–18:00).',
  },
  '/aviso-de-privacidad': {
    title: 'Aviso de Privacidad | DSouza Consultores Fiscales',
    description:
      'Aviso de privacidad de DSouza Consultores Fiscales sobre el tratamiento de tus datos personales conforme a la LFPDPPP.',
    noindex: true, // texto base pendiente de validación legal (LFPDPPP)
  },
  '/404': {
    title: 'Página no encontrada | DSouza Consultores Fiscales',
    description: 'La página que buscas no existe. Vuelve al inicio o escríbenos por WhatsApp.',
    noindex: true,
  },
}
