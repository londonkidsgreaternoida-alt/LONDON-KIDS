import './DayCare.css'

const features = [
  { icon: '📹', label: 'CCTV Monitoring', desc: '24/7 camera surveillance' },
  { icon: '🤗', label: 'Caring Staff', desc: 'Trained & loving caregivers' },
  { icon: '🥗', label: 'Healthy Meals', desc: 'Nutritious & tasty food' },
  { icon: '🎮', label: 'Indoor Activities', desc: 'Fun games & activities' },
  { icon: '🛡️', label: 'Safe Environment', desc: 'Secure & hygienic space' },
  { icon: '😴', label: 'Rest Area', desc: 'Comfortable nap space' },
]

export default function DayCare() {
  return (
    <section className="daycare" id="daycare">
      <div className="daycare-bg-shapes">
        <div className="dc-shape dc-shape-1"></div>
        <div className="dc-shape dc-shape-2"></div>
        <div className="dc-shape dc-shape-3"></div>
      </div>

      <div className="container">
        <div className="daycare-content">
          <div className="daycare-text reveal-left">
            <span className="section-badge">🌙 Day Care</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginTop: '0.5rem' }}>
              Safe & Caring
              <br />
              <span className="dc-highlight">Day Care</span>
              <span className="title-underline" style={{ margin: '0.75rem 0 0' }}></span>
            </h2>
            <p className="dc-desc">
              We provide a secure, nurturing, and joyful day care environment where children stay happy, active, and cared for throughout the day.
            </p>
            <div className="dc-timing">
              <div className="timing-card">
                <span className="timing-icon">🏫</span>
                <div>
                  <div className="timing-label">School Timing</div>
                  <div className="timing-value">Mon – Fri | 8:00 AM – 12:00 PM</div>
                </div>
              </div>
              <div className="timing-card" style={{ marginTop: '0.75rem' }}>
                <span className="timing-icon">🌙</span>
                <div>
                  <div className="timing-label">Day Care</div>
                  <div className="timing-value">7 Days | 7:00 AM – 10:00 PM</div>
                </div>
              </div>
            </div>
            <div className="dc-trust">
              <div className="trust-badge"><span>🌟</span> Trusted by 200+ Families</div>
              <div className="trust-badge"><span>✅</span> Safe & Hygienic</div>
              <div className="trust-badge"><span>👶</span> Age 1 – 6 Years</div>
            </div>
          </div>

          <div className="daycare-features reveal-right">
            <div className="dc-features-grid">
              {features.map((f, i) => (
                <div
                  className="dc-card"
                  key={i}
                  id={`dc-card-${i}`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <div className="dc-card-icon">{f.icon}</div>
                  <div className="dc-card-label">{f.label}</div>
                  <div className="dc-card-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
