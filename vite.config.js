import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Hora del build: el primer render de /capacitacion decide "próximo" vs "finalizado"
  // con ella (igual en prerender y cliente) y luego se corrige con la hora real.
  define: { __BUILD_TS__: JSON.stringify(Date.now()) },
})
