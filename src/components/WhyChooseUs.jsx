import './WhyChooseUs.css'

const reasons = [
  { icon: '👩‍🏫', title: 'Experienced & Friendly Teachers', color: 'blue' },
  { icon: '🧹', title: 'Safe & Hygienic Campus', color: 'green' },
  { icon: '📹', title: 'CCTV Security', color: 'orange' },
  { icon: '💻', title: 'Smart Classrooms', color: 'purple' },
  { icon: '🎨', title: 'Creative Activities', color: 'pink' },
  { icon: '🗣️', title: 'English Speaking Environment', color: 'yellow' },
  { icon: '⛹️', title: 'Indoor & Outdoor Play Area', color: 'teal' },
  { icon: '❤️', title: 'Individual Attention', color: 'red' },
  { icon: '🎉', title: 'Festival Celebrations', color: 'lime' },
]

export default function WhyChooseUs() {
  return (
    <section className="why" id="why">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">💫 Why Choose Us</span>
          <h2 className="section-title">
            Why Parents Choose Us
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            We go above and beyond to ensure every child has the best start in life.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div
              key={i}
              className={`why-card why-card--${r.color} reveal`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              id={`why-card-${i}`}
            >
              <div className="why-icon">{r.icon}</div>
              <h3 className="why-title">{r.title}</h3>
              <div className="why-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
