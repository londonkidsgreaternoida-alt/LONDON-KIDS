import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }


  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">📍 Contact Us</span>
          <h2 className="section-title">
            Get In Touch
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            We'd love to hear from you! Visit us, call us, or send us a message.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-cards reveal">
          <a href="tel:+919236488036" className="contact-card contact-card--blue" id="contact-phone">
            <div className="cc-icon">📞</div>
            <div className="cc-info">
              <div className="cc-label">Call Us</div>
              <div className="cc-value">+91 92364 88036</div>
            </div>
          </a>
          <a
            href="https://wa.me/919236488036?text=Hello! I want to know about admissions at London Kids School."
            target="_blank" rel="noopener noreferrer"
            className="contact-card contact-card--green" id="contact-whatsapp"
          >
            <div className="cc-icon">💬</div>
            <div className="cc-info">
              <div className="cc-label">WhatsApp</div>
              <div className="cc-value">Chat with us</div>
            </div>
          </a>
          <a href="mailto:contact@londonkidsindia.com" className="contact-card contact-card--orange" id="contact-email">
            <div className="cc-icon">✉️</div>
            <div className="cc-info">
              <div className="cc-label">Email Us</div>
              <div className="cc-value">contact@londonkidsindia.com</div>
            </div>
          </a>
        </div>

        {/* Main grid */}
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal-left">
            <div className="info-card">
              <h3 className="info-title">🏫 London Kids School</h3>
              <div className="info-item">
                <span className="info-icon">📍</span>
                <p>T9,004, Ace Divino, Plot No. GH-14A, Sector 1, Greater Noida West (Noida Extension), Uttar Pradesh – 201306</p>
              </div>
              <div className="info-item">
                <span className="info-icon">🕐</span>
                <div>
                  <p><strong>School:</strong> Mon – Fri | 8:00 AM – 12:00 PM</p>
                  <p><strong>Day Care:</strong> 7 Days | 7:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="map-container">
              <div className="map-placeholder">
                <span className="map-pin">📍</span>
                <div className="map-text">
                  <strong>London Kids School</strong>
                  <p>Ace Divino, Sector 1, Greater Noida West</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ace+Divino+Greater+Noida+West"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary map-btn"
                  id="map-btn"
                >
                  🗺️ Open in Maps
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="social-section">
              <p className="social-title">Follow Us</p>
              <div className="social-links">
                <a href="#" className="social-link" id="social-fb" aria-label="Facebook">📘</a>
                <a href="#" className="social-link" id="social-ig" aria-label="Instagram">📸</a>
                <a href="#" className="social-link" id="social-yt" aria-label="YouTube">📺</a>
                <a href="#" className="social-link" id="social-wa" aria-label="WhatsApp">💬</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section reveal-right">
            <h3 className="form-title">💌 Send a Message</h3>
            {status === 'success' ? (
              <div className="form-success">
                <span>✅</span>
                <h4>Message Sent!</h4>
                <p>We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input id="contact-name" type="text" placeholder="Your full name" required
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone Number *</label>
                  <input id="contact-phone" type="tel" placeholder="+91 92364 88036" required
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input id="contact-email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea id="contact-message" rows="4" placeholder="How can we help you?" required
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                </div>
                {status === 'error' && (
                  <div className="form-error">⚠️ {errorMsg || 'Failed to send. Please try again.'}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
                  id="contact-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? <><span className="spinner"></span> Sending...</> : '📤 Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
