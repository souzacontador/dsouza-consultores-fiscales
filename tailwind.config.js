// Consume un token RGB permitiendo modificador de opacidad de Tailwind.
const withOpacity =
  (variable) =>
  ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Tokens de diseño — SIEMPRE vía CSS variables (nunca hex en componentes).
      colors: {
        primary: {
          DEFAULT: withOpacity('--color-primary'),
          dark: withOpacity('--color-primary-dark'),
        },
        secondary: {
          DEFAULT: withOpacity('--color-secondary'),
          dark: withOpacity('--color-secondary-dark'),
        },
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          dark: withOpacity('--color-accent-dark'),
        },
        // Superficies y texto
        base: withOpacity('--color-base'),
        tint: withOpacity('--color-tint'),
        ink: withOpacity('--color-ink'),
        muted: withOpacity('--color-muted'),
        line: withOpacity('--color-line'),
        danger: withOpacity('--color-danger'),
        // Texto de estado accesible para los chips del semáforo de riesgo
        status: {
          warn: withOpacity('--color-status-warn'),
          risk: withOpacity('--color-status-risk'),
        },
        // Marca WhatsApp (para el ícono, no como color de UI arbitrario)
        whatsapp: withOpacity('--color-whatsapp'),
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Radio de esquinas consistente en botones, cards e inputs.
        md: 'var(--radius-md)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 37, 64, 0.04), 0 8px 24px rgba(10, 37, 64, 0.06)',
        'card-hover': '0 2px 4px rgba(10, 37, 64, 0.06), 0 16px 40px rgba(10, 37, 64, 0.10)',
      },
      maxWidth: {
        reading: '46rem', // ancho de lectura cómodo para cuerpos de texto
      },
    },
  },
  plugins: [],
}
