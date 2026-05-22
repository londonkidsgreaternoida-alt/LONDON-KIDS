import './Footer.css'

export default function Footer() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="footer">
      {/* Wave top */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="#f8fafc"/>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo.png" alt="London Kids School Logo" className="footer-logo-img" />
              </div>
              <p className="footer-brand-desc">
                Nurturing young minds with love, creativity, and world-class education since 2014. Building the future, one child at a time.
              </p>
              <div className="footer-social">
                <a href="#" className="fsocial-link" id="footer-fb" aria-label="Facebook">📘</a>
                <a href="#" className="fsocial-link" id="footer-ig" aria-label="Instagram">📸</a>
                <a href="#" className="fsocial-link" id="footer-yt" aria-label="YouTube">📺</a>
                <a href="https://wa.me/919236488036" className="fsocial-link" id="footer-wa" aria-label="WhatsApp">💬</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                {[['Home','#home'],['About Us','#about'],['Programs','#programs'],['Facilities','#facilities'],['Gallery','#gallery'],['Admissions','#admissions'],['Contact','#contact']].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}>
                      <span>→</span> {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="footer-col">
              <h4 className="footer-col-title">Our Programs</h4>
              <ul className="footer-links">
                {['Play Group (1.5–2.5 yrs)', 'Nursery (2.5–3.5 yrs)', 'LKG (3.5–4.5 yrs)', 'UKG (4.5–5.5 yrs)', 'Day Care (7AM–10PM)'].map(p => (
                  <li key={p}>
                    <a href="#programs" onClick={e => { e.preventDefault(); scrollTo('#programs') }}>
                      <span>🌟</span> {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact Info</h4>
              <div className="footer-contact-info">
                <div className="fci-item">
                  <span>📍</span>
                  <p>T9,004, Ace Divino, Sector 1, Greater Noida West, UP – 201306</p>
                </div>
                <div className="fci-item">
                  <span>📞</span>
                  <a href="tel:+919236488036">+91 92364 88036</a>
                </div>
                <div className="fci-item">
                  <span>✉️</span>
                  <a href="mailto:info@londonkidsschool.in">info@londonkidsschool.in</a>
                </div>
                <div className="fci-item">
                  <span>🕐</span>
                  <p>Mon–Fri: 8:00 AM – 12:00 PM<br/>Day Care: 7 Days | 7AM – 10PM</p>
                </div>
              </div>
              <a
                href="#admissions"
                className="footer-admission-btn"
                onClick={e => { e.preventDefault(); scrollTo('#admissions') }}
                id="footer-admission-btn"
              >
                🎒 Admission Open 2025-26
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>© 2026 London Kids School | All Rights Reserved</p>
            <p>Designed with ❤️ for little learners in Greater Noida West</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
