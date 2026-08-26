import { useState } from 'react'
import { Section } from '../ui'
import { CONTACT, WHATSAPP_URL } from '../../data/site'
import { IconMapPin, IconClock, IconMail, IconWhatsApp } from '../Icons'

const WHATSAPP_BASE = 'https://wa.me/526862567293'

// Bloque de contacto: formulario + columna de datos + mapa embebido.
export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '', mensaje: '' })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // El formulario compone un mensaje de WhatsApp con los datos capturados.
  const handleSubmit = (e) => {
    e.preventDefault()
    const text = [
      'Hola, quiero información sobre un diagnóstico fiscal.',
      `Nombre: ${form.nombre}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      form.correo && `Correo: ${form.correo}`,
      form.mensaje && `Mensaje: ${form.mensaje}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <Section bg="base">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Formulario */}
        <div>
          <span className="eyebrow">Escríbenos</span>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-secondary sm:text-4xl">
            Cuéntanos tu caso
          </h2>
          <p className="lead mt-3">
            Completa el formulario y continúa la conversación por WhatsApp con tus datos ya listos.
            Te respondemos en horario de oficina.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="nombre" className="field-label">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={update}
                autoComplete="name"
                className="field-input"
                placeholder="Tu nombre"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="correo" className="field-label">
                  Correo
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={update}
                  autoComplete="email"
                  className="field-input"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="field-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={update}
                  autoComplete="tel"
                  className="field-input"
                  placeholder="686 000 0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="field-label">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={form.mensaje}
                onChange={update}
                className="field-input resize-none"
                placeholder="Cuéntanos brevemente tu situación o tu duda."
              />
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              <IconWhatsApp className="h-5 w-5" />
              Enviar por WhatsApp
            </button>
            <p className="text-xs text-muted">
              Al enviar, se abrirá WhatsApp con tu mensaje ya redactado para que solo confirmes.
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

          {/* Mapa embebido de la dirección */}
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
