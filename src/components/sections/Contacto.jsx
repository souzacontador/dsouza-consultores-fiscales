import { useState } from 'react'
import { Section } from '../ui'
import { CONTACT, WHATSAPP_URL } from '../../data/site'
import { IconMapPin, IconClock, IconMail, IconWhatsApp } from '../Icons'

// Validación de campos con mensajes claros en español.
function validate(f) {
  const e = {}
  if (!f.nombre.trim()) e.nombre = 'Escribe tu nombre.'
  if (!f.correo.trim()) e.correo = 'Escribe tu correo.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo.trim()))
    e.correo = 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
  if (f.telefono.trim() && f.telefono.replace(/\D/g, '').length < 10)
    e.telefono = 'Escribe un teléfono a 10 dígitos, o déjalo vacío.'
  if (!f.mensaje.trim()) e.mensaje = 'Cuéntanos brevemente tu situación.'
  else if (f.mensaje.trim().length < 10)
    e.mensaje = 'Da un poco más de detalle (mínimo 10 caracteres).'
  return e
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
    </svg>
  )
}

// Bloque de contacto: formulario + columna de datos + mapa embebido.
export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // Limpia el error del campo mientras el usuario lo corrige.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(false)
    const errs = validate(form)
    setErrors(errs)
    const firstError = ['nombre', 'correo', 'telefono', 'mensaje'].find((k) => errs[k])
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    // Sin backend disponible: el envío compone el mensaje hacia WhatsApp
    // (canal principal del despacho y fiable en cualquier dispositivo).
    // TODO: conectar backend de formulario
    setSubmitting(true)
    const text = [
      'Hola, quiero información sobre un diagnóstico fiscal.',
      `Nombre: ${form.nombre}`,
      `Correo: ${form.correo}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      '',
      form.mensaje,
    ]
      .filter((line) => line !== false && line !== undefined)
      .join('\n')

    setTimeout(() => {
      window.open(
        `https://wa.me/526862567293?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener'
      )
      setSubmitting(false)
      setSent(true)
    }, 300)
  }

  // Atributos accesibles por campo con error.
  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `field-input ${errors[name] ? 'border-danger focus:border-danger focus:ring-danger/30' : ''}`,
  })

  const ErrorMsg = ({ name }) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm font-medium text-danger">
        {errors[name]}
      </p>
    ) : null

  return (
    <Section bg="base">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Formulario (primero en móvil) */}
        <div>
          <span className="eyebrow">Escríbenos</span>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-secondary sm:text-4xl">
            Cuéntanos tu caso
          </h2>
          <p className="lead mt-3">
            Completa el formulario y te respondemos en horario de oficina. ¿Prefieres algo más
            directo? Escríbenos por WhatsApp aquí al lado.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="nombre" className="field-label">
                Nombre <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                required
                aria-required="true"
                autoComplete="name"
                placeholder="Tu nombre"
                {...fieldProps('nombre')}
              />
              <ErrorMsg name="nombre" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="correo" className="field-label">
                  Correo <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  placeholder="tucorreo@ejemplo.com"
                  {...fieldProps('correo')}
                />
                <ErrorMsg name="correo" />
              </div>
              <div>
                <label htmlFor="telefono" className="field-label">
                  Teléfono <span className="text-muted">(opcional)</span>
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="686 000 0000"
                  {...fieldProps('telefono')}
                />
                <ErrorMsg name="telefono" />
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="field-label">
                Mensaje <span className="text-danger">*</span>
              </label>
              <textarea
                rows={4}
                required
                aria-required="true"
                placeholder="Cuéntanos brevemente tu situación o tu duda."
                {...fieldProps('mensaje')}
                className={`${fieldProps('mensaje').className} resize-none`}
              />
              <ErrorMsg name="mensaje" />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {submitting ? (
                <>
                  <Spinner />
                  Enviando…
                </>
              ) : (
                <>
                  <IconWhatsApp className="h-5 w-5" />
                  Enviar por WhatsApp
                </>
              )}
            </button>

            {/* Mensaje de estado accesible */}
            {sent && (
              <p role="status" className="rounded-md border border-line bg-tint px-4 py-3 text-sm text-secondary">
                Se abrió WhatsApp con tu mensaje ya redactado: solo confirma el envío. Si no
                ocurrió, escríbenos directo al {CONTACT.phoneDisplay}.
              </p>
            )}
            <p className="text-xs text-muted">
              Al enviar se abrirá WhatsApp con tu mensaje ya redactado para que solo confirmes.
              ¿Prefieres correo? Escríbenos a{' '}
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-primary-dark hover:text-secondary">
                {CONTACT.email}
              </a>
              .
            </p>
          </form>
        </div>

        {/* Datos + mapa */}
        <div className="flex flex-col gap-6">
          <div className="card">
            <h3 className="font-heading text-lg font-semibold text-secondary">Datos de contacto</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                <span className="text-ink">{CONTACT.address}</span>
              </li>
              <li className="flex gap-3">
                <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                <span className="text-ink">{CONTACT.hours}</span>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                <a href={`mailto:${CONTACT.email}`} className="text-ink hover:text-primary-dark">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <IconWhatsApp className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-primary-dark"
                >
                  WhatsApp {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              <IconWhatsApp className="h-5 w-5" />
              Solicita info por WhatsApp
            </a>
          </div>

          {/* Mapa embebido de la dirección (carga diferida) */}
          <div className="overflow-hidden rounded-md border border-line shadow-card">
            <iframe
              title={`Ubicación de ${CONTACT.brand} en ${CONTACT.city}`}
              src={CONTACT.mapEmbed}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}
