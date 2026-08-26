import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/site'
import { WhatsAppButton } from './ui'
import { IconMenu, IconClose } from './Icons'

function Brand({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2 font-heading text-lg font-bold leading-tight text-secondary sm:text-xl"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-secondary font-heading text-base font-bold text-primary">
        D
      </span>
      <span>
        DSouza <span className="hidden text-muted sm:inline">Consultores Fiscales</span>
        <span className="text-muted sm:hidden">C.F.</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Sticky compacto al hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cerrar el menú móvil al cambiar de página.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-base/95 backdrop-blur transition-all duration-200 ${
        scrolled ? 'py-1.5 shadow-card' : 'py-3'
      }`}
    >
      <nav className="container-site flex items-center justify-between gap-4" aria-label="Principal">
        <Brand />

        {/* Navegación de escritorio */}
        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-dark'
                      : 'text-secondary hover:bg-tint hover:text-primary-dark'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <WhatsAppButton className="hidden !px-4 !py-2.5 text-sm sm:inline-flex">
            WhatsApp
          </WhatsAppButton>

          {/* Botón hamburger (móvil / tablet) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid h-10 w-10 place-items-center rounded-md border border-line text-secondary hover:bg-tint xl:hidden"
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {open && (
        <div id="mobile-menu" className="container-site xl:hidden">
          <ul className="mt-3 flex flex-col gap-1 border-t border-line pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-tint text-primary-dark'
                        : 'text-secondary hover:bg-tint hover:text-primary-dark'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <WhatsAppButton className="w-full" />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
