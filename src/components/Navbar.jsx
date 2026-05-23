import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(sec => {
        const top = sec.offsetTop - 100
        const bottom = top + sec.offsetHeight
        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive('#' + sec.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setActive(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={() => handleNavClick('#home')}>
          <img src="/logo.png" alt="London Kids School Logo" className="logo-img" />
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${active === link.href ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#admissions"
          className="nav-cta"
          onClick={(e) => { e.preventDefault(); handleNavClick('#admissions') }}
        >
          <span>🎒</span> Admission Open
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`mobile-link ${active === link.href ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#admissions"
              className="mobile-cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#admissions') }}
            >
              🎒 Admission Open
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
