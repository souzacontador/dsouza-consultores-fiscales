import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
)

// En producción el HTML de cada ruta ya trae el cuerpo pre-renderizado
// (scripts/postbuild-meta.mjs): se hidrata. En desarrollo (`npm run dev`) el
// contenedor llega vacío: se renderiza en cliente como siempre.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
