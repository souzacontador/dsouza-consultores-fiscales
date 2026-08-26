import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import ServiciosPage from './pages/Servicios'
import Nosotros from './pages/Nosotros'
import TestimoniosPage from './pages/TestimoniosPage'
import Recursos from './pages/Recursos'
import Calculadoras from './pages/Calculadoras'
import CalculadorasPremium from './pages/CalculadorasPremium'
import ContactoPage from './pages/ContactoPage'
import AvisoPrivacidad from './pages/AvisoPrivacidad'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="servicios" element={<ServiciosPage />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="testimonios" element={<TestimoniosPage />} />
        <Route path="recursos" element={<Recursos />} />
        <Route path="calculadoras" element={<Calculadoras />} />
        <Route path="calculadoras-premium" element={<CalculadorasPremium />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route path="aviso-de-privacidad" element={<AvisoPrivacidad />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
