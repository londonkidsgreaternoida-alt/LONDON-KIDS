import './Programs.css'

const programs = [
  {
    icon: '🍼', title: 'Play Group', age: 'Age 1.5 – 2.5 yrs',
    desc: 'A fun and interactive environment for toddlers to learn communication and social skills.',
    color: 'blue', features: ['Social Skills', 'Play Learning', 'Music & Rhymes'],
  },
  {
    icon: '🌸', title: 'Nursery', age: 'Age 2.5 – 3.5 yrs',
    desc: 'Creative learning through stories, games, music, and activities that spark imagination.',
    color: 'pink', features: ['Story Time', 'Art & Craft', 'Outdoor Play'],
  },
  {
    icon: '✏️', title: 'LKG', age: 'Age 3.5 – 4.5 yrs',
    desc: 'Strong foundation in language, numbers, and writing for early academic development.',
    color: 'yellow', features: ['Reading Basics', 'Number Skills', 'Writing Practice'],
  },
  {
    icon: '📚', title: 'UKG', age: 'Age 4.5 – 5.5 yrs',
    desc: 'Preparation for primary school with advanced learning and comprehensive curriculum.',
    color: 'orange', features: ['Advanced Reading', 'Math Concepts', 'Science Basics'],
  },
  {
    icon: '🌟', title: 'Day Care', age: '7 AM – 10 PM',
    desc: 'A safe and caring environment with supervised activities and rest time throughout the day.',
    color: 'green', features: ['Safe Supervision', 'Healthy Meals', 'Indoor Activities'],
  },
]

export default function Programs() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="programs" id="programs">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">📖 Our Programs</span>
          <h2 className="section-title">
            Programs We Offer
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            Age-appropriate programs designed to foster growth, learning, and joy at every stage.
          </p>
        </div>

        <div className="programs-grid">
          {programs.map((p, i) => (
            <div
              key={i}
              className={`program-card program-card--${p.color} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              id={`program-card-${i}`}
            >
              <div className="program-header">
                <div className="program-icon">{p.icon}</div>
                <div className="program-age">{p.age}</div>
              </div>
              <h3 className="program-title">{p.title}</h3>
              <p className="program-desc">{p.desc}</p>
              <ul className="program-features">
                {p.features.map((f, j) => (
                  <li key={j}><span className="check">✓</span> {f}</li>
                ))}
              </ul>
              <button
                className="program-btn"
                onClick={() => scrollTo('#admissions')}
                id={`program-btn-${i}`}
              >
                Learn More →
              </button>
              <div className="program-decoration"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
