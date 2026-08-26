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
  },
  '/recursos': {
    title: 'Recursos fiscales | DSouza Consultores Fiscales',
    description:
      'Artículos, guías y boletines sobre fiscalización algorítmica y capacitación fiscal en Mexicali. Contenido educativo próximamente; escríbenos.',
    noindex: true, // sin contenido aún — quitar cuando se publique la biblioteca
  },
  '/calculadoras': {
    title: 'Calculadoras fiscales | DSouza Consultores',
    description:
      'Herramientas gratuitas para estimar tus contribuciones y entender el impacto fiscal de tus operaciones. En construcción; solicita un cálculo hoy.',
    noindex: true, // sin contenido aún
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
  },
  '/404': {
    title: 'Página no encontrada | DSouza Consultores Fiscales',
    description: 'La página que buscas no existe. Vuelve al inicio o escríbenos por WhatsApp.',
    noindex: true,
  },
}
