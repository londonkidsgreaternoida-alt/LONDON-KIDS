import { useState, useEffect } from 'react'
import './FloatingButtons.css'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210?text=Hello! I want to know about admissions at London Kids School, Greater Noida West."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        id="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
      >
        <span className="wa-icon">💬</span>
        <span className="wa-label">WhatsApp Us</span>
        <span className="wa-ripple"></span>
      </a>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        id="back-to-top-btn"
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
