import { useState } from 'react'
import './Admissions.css'

const steps = [
  { num: '01', icon: '📝', title: 'Fill Admission Form', desc: 'Complete the online or offline inquiry form with student details.' },
  { num: '02', icon: '🏫', title: 'Visit School Campus', desc: 'Schedule a school visit to see our facilities and meet our team.' },
  { num: '03', icon: '👨‍👩‍👧', title: 'Parent & Child Interaction', desc: "A friendly interaction session to understand your child's needs." },
  { num: '04', icon: '✅', title: 'Admission Confirmation', desc: 'Complete the formalities and welcome your child to London Kids School!' },
]

const documents = [
  { icon: '📋', doc: 'Birth Certificate' },
  { icon: '📷', doc: 'Passport Photos (2)' },
  { icon: '🪪', doc: 'Aadhaar Card Copy' },
  { icon: '🏫', doc: 'Previous School Record' },
]

export default function Admissions() {
  const [form, setForm] = useState({ name: '', parent: '', phone: '', email: '', program: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      setStatus('success')
      setForm({ name: '', parent: '', phone: '', email: '', program: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className="admissions" id="admissions">
      {/* Banner */}
      <div className="admissions-banner">
        <div className="banner-shapes">
          <div className="ban-shape ban-shape-1">⭐</div>
          <div className="ban-shape ban-shape-2">🌟</div>
          <div className="ban-shape ban-shape-3">🎈</div>
          <div className="ban-shape ban-shape-4">✨</div>
        </div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-badge">🎒 Admissions Open 2025-26</span>
            <h2 className="banner-title">Admissions Open!</h2>
            <p className="banner-subtitle">Give your child the perfect start for a bright future.</p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Steps */}
        <div className="section-header reveal" style={{ paddingTop: '4rem' }}>
          <span className="section-badge">📋 How to Apply</span>
          <h2 className="section-title">
            Admission Process
            <span className="title-underline"></span>
          </h2>
        </div>

        <div className="admission-steps reveal">
          {steps.map((s, i) => (
            <div key={i} className="step-card" id={`step-card-${i}`}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>

        {/* Documents + Form */}
        <div className="admission-grid">
          {/* Documents */}
          <div className="docs-section reveal-left">
            <h3 className="docs-title">📄 Documents Required</h3>
            <div className="docs-list">
              {documents.map((d, i) => (
                <div className="doc-item" key={i}>
                  <span className="doc-icon">{d.icon}</span>
                  <span className="doc-text">{d.doc}</span>
                  <span className="doc-check">✓</span>
                </div>
              ))}
            </div>
            <div className="admission-note">
              <span>📞</span>
              <p>For more info, call us or visit our campus. We're happy to help!</p>
            </div>
          </div>

          {/* Form */}
          <div className="form-section reveal-right">
            <h3 className="form-title">📝 Enquiry Form</h3>

            {status === 'success' ? (
              <div className="form-success">
                <span>🎉</span>
                <h4>Thank You!</h4>
                <p>Your enquiry has been submitted. We'll contact you within 24 hours!</p>
                <p className="form-success-sub">Check your email for a confirmation message.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form" id="inquiry-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="child-name">Child's Name *</label>
                    <input id="child-name" type="text" placeholder="Child's full name" required
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="parent-name">Parent's Name *</label>
                    <input id="parent-name" type="text" placeholder="Parent's full name" required
                      value={form.parent} onChange={e => setForm({...form, parent: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input id="phone" type="tel" placeholder="+91 92364 88036" required
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="program">Program Interested In *</label>
                  <select id="program" required
                    value={form.program} onChange={e => setForm({...form, program: e.target.value})}>
                    <option value="">Select Program</option>
                    <option>Play Group (1.5–2.5 yrs)</option>
                    <option>Nursery (2.5–3.5 yrs)</option>
                    <option>LKG (3.5–4.5 yrs)</option>
                    <option>UKG (4.5–5.5 yrs)</option>
                    <option>Day Care</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea id="message" rows="3" placeholder="Any questions or special requirements..."
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                </div>

                {status === 'error' && (
                  <div className="form-error">
                    ⚠️ {errorMsg || 'Failed to submit. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  id="form-submit-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <><span className="spinner"></span> Sending...</>
                  ) : (
                    '🎒 Submit Enquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
