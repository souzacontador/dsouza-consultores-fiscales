import { track } from '@vercel/analytics'
import { WHATSAPP_URL } from '../data/site'
import { IconWhatsApp } from './Icons'

// --- Botón CTA de WhatsApp (acción primaria del sitio) ---
// variant: 'primary' (acento) | 'on-ink' (sobre fondo oscuro)
// Cada clic se registra en Vercel Analytics con la página de origen,
// para medir el objetivo del sitio (diagnósticos agendados vía WhatsApp).
export function WhatsAppButton({ variant = 'primary', className = '', children }) {
  const cls = variant === 'on-ink' ? 'btn-on-ink' : 'btn-primary'
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { page: window.location.pathname })}
      className={`${cls} ${className}`}
    >
      <IconWhatsApp className="h-5 w-5" />
      {children || 'Solicita info por WhatsApp'}
    </a>
  )
}

// --- Sección semántica con gramática Nexora ---
// bg: 'base' | 'tint' | 'ink' — alterna fondo base y tinte suave entre secciones.
export function Section({ id, bg = 'base', className = '', children, ...rest }) {
  const bgClass = bg === 'tint' ? 'section-tint' : bg === 'ink' ? 'section-ink' : 'section-base'
  return (
    <section id={id} className={`section ${bgClass} ${className}`} {...rest}>
      <div className="container-site">{children}</div>
    </section>
  )
}

// --- Encabezado de sección: etiqueta opcional → H2 → subtítulo ---
export function SectionHeader({ eyebrow, title, subtitle, align = 'center', as: Heading = 'h2' }) {
  const alignCls = align === 'left' ? 'text-left' : 'mx-auto text-center'
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</Heading>
      {subtitle && <p className="lead mt-4">{subtitle}</p>}
    </div>
  )
}
