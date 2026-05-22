import './Facilities.css'

const facilities = [
  { icon: '🖥️', title: 'Smart Classrooms', desc: 'Interactive screens & modern teaching tech', color: 'blue' },
  { icon: '🛝', title: 'Kids Play Zone', desc: 'Safe & fun outdoor & indoor play equipment', color: 'green' },
  { icon: '🎵', title: 'Dance & Music', desc: 'Professional music & dance training studio', color: 'pink' },
  { icon: '🖌️', title: 'Art & Craft Room', desc: 'Creative art studio for self-expression', color: 'orange' },
  { icon: '💻', title: 'Computer Learning', desc: 'Age-appropriate digital literacy programs', color: 'purple' },
  { icon: '🚌', title: 'Safe Transportation', desc: 'GPS-tracked safe school transport service', color: 'yellow' },
  { icon: '📹', title: 'CCTV Monitoring', desc: '24/7 surveillance for complete safety', color: 'teal' },
  { icon: '🌿', title: 'Clean Environment', desc: 'Hygienic & green campus for healthy growth', color: 'lime' },
]

export default function Facilities() {
  return (
    <section className="facilities" id="facilities">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">🏗️ Our Facilities</span>
          <h2 className="section-title">
            World-Class Facilities
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            Premium infrastructure designed to provide the best learning and growing environment for your child.
          </p>
        </div>

        <div className="facilities-grid">
          {facilities.map((f, i) => (
            <div
              key={i}
              className={`facility-card facility-card--${f.color} reveal`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              id={`facility-card-${i}`}
            >
              <div className="facility-icon-wrap">
                <span className="facility-icon">{f.icon}</span>
              </div>
              <div className="facility-info">
                <h3 className="facility-title">{f.title}</h3>
                <p className="facility-desc">{f.desc}</p>
              </div>
              <div className="facility-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
