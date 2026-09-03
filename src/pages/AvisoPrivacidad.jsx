import Seo from '../components/Seo'
import Hero from '../components/sections/Hero'
import { Section } from '../components/ui'
import { CONTACT } from '../data/site'

// Texto base del aviso. Está en noindex (src/data/seoMeta.js) hasta que se
// valide conforme a la LFPDPPP. [VERIFICAR] con asesoría legal.
export default function AvisoPrivacidad() {
  return (
    <>
      <Seo path="/aviso-de-privacidad" />
      <Hero
        eyebrow="Legal"
        title="Aviso de Privacidad"
        subtitle="Documento informativo sobre el tratamiento de tus datos personales por parte de DSouza Consultores Fiscales."
        secondary={{ label: 'Volver al inicio', to: '/' }}
      />

      <Section bg="base">
        <div className="mx-auto max-w-reading">
          <div className="prose-body">
            <h2 className="font-heading text-2xl font-semibold text-secondary">Responsable</h2>
            <p>
              DSouza Consultores Fiscales, con domicilio en {CONTACT.address}, es responsable del
              tratamiento y protección de tus datos personales.
            </p>

            <h2 className="mt-8 font-heading text-2xl font-semibold text-secondary">
              Datos que recabamos
            </h2>
            <p>
              Podemos recabar nombre, correo electrónico, teléfono y la información que nos
              proporciones voluntariamente a través de nuestros formularios o canales de contacto.
            </p>

            <h2 className="mt-8 font-heading text-2xl font-semibold text-secondary">Finalidades</h2>
            <p>
              Utilizamos tus datos para atender tus solicitudes de información, agendar tu
              diagnóstico fiscal, brindarte nuestros servicios y darte seguimiento. No los
              compartimos con terceros para fines ajenos sin tu consentimiento.
            </p>

            <h2 className="mt-8 font-heading text-2xl font-semibold text-secondary">
              Derechos ARCO
            </h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, cancelación u oposición (ARCO),
              así como revocar tu consentimiento, escribiendo a{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-primary-dark hover:text-secondary">
                {CONTACT.email}
              </a>
              .
            </p>

            <h2 className="mt-8 font-heading text-2xl font-semibold text-secondary">Contacto</h2>
            <p>
              Para cualquier duda sobre este aviso, escríbenos a{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-primary-dark hover:text-secondary">
                {CONTACT.email}
              </a>{' '}
              o comunícate a nuestro WhatsApp {CONTACT.phoneDisplay}. Horario de atención:{' '}
              {CONTACT.hours}.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
