import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Analytics } from '@vercel/analytics/react'
import App from './App'

// Punto de entrada del pre-render (build): devuelve el HTML del cuerpo de una
// ruta. Misma jerarquía de componentes que src/main.jsx para que la hidratación
// en el navegador coincida exactamente. No importa CSS: la hoja de estilos ya
// la enlaza el index.html del build del cliente.
export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url} future={{ v7_relativeSplatPath: true }}>
        <App />
        <Analytics />
      </StaticRouter>
    </React.StrictMode>
  )
}
