import './Features.css'

const features = [
  { icon: '🧠', title: 'Smart Learning', desc: 'Technology-integrated classrooms for enhanced learning experiences and cognitive development.', color: 'blue', delay: '0s' },
  { icon: '🎨', title: 'Creative Activities', desc: 'Art, craft, music, and dance activities to nurture creativity and imagination.', color: 'orange', delay: '0.1s' },
  { icon: '🌟', title: 'Personality Development', desc: 'Building confidence, communication skills, and leadership qualities from an early age.', color: 'yellow', delay: '0.2s' },
  { icon: '🛡️', title: 'Safe Environment', desc: 'CCTV monitored campus with trained staff ensuring complete child safety at all times.', color: 'green', delay: '0.3s' },
  { icon: '🎮', title: 'Fun-Based Education', desc: 'Learning through play and games that make education enjoyable and memorable.', color: 'pink', delay: '0.4s' },
  { icon: '💪', title: 'Child Growth & Confidence', desc: "Individual attention to foster every child's academic, emotional, and social growth.", color: 'purple', delay: '0.5s' },
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">✨ What We Offer</span>
          <h2 className="section-title">
            Why Children Love Us
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            We provide a holistic learning environment where every child thrives and grows with joy.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-card feature-card--${f.color} reveal`}
              style={{ transitionDelay: f.delay }}
              id={`feature-card-${i}`}
            >
              <div className="feature-icon-wrap">
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
