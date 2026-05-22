import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      {/* Background gradient */}
      <div className="hero-bg"></div>

      {/* Floating Shapes */}
      <div className="hero-shapes">
        <div className="shape shape-1">⭐</div>
        <div className="shape shape-2">🌈</div>
        <div className="shape shape-3">☁️</div>
        <div className="shape shape-4">🌟</div>
        <div className="shape shape-5">☁️</div>
        <div className="shape shape-6">🎈</div>
        <div className="shape shape-7">🦋</div>
        <div className="shape shape-8">🌸</div>
        <div className="hero-circle circle-1"></div>
        <div className="hero-circle circle-2"></div>
        <div className="hero-circle circle-3"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span>🏫</span> Welcome to London Kids School
        </div>

        <h1 className="hero-title">
          Where Little
          <span className="hero-title-highlight"> Dreams</span>
          <br />Begin
        </h1>

        <p className="hero-tagline">
          <span className="tag-word">Learn</span>
          <span className="tag-dot">•</span>
          <span className="tag-word">Play</span>
          <span className="tag-dot">•</span>
          <span className="tag-word">Grow</span>
        </p>

        <p className="hero-desc">
          At London Kids School, we provide a happy, safe, and inspiring environment where children learn through creativity, fun, and exploration.
        </p>

        <div className="hero-buttons">
          <button
            className="btn btn-secondary hero-btn"
            onClick={() => scrollTo('#admissions')}
            id="hero-admission-btn"
          >
            🎒 Admission Open
          </button>
          <button
            className="btn btn-outline hero-btn"
            onClick={() => scrollTo('#contact')}
            id="hero-visit-btn"
          >
            📍 Book a Visit
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">500+</span>
            <span className="stat-lbl">Happy Students</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-num">15+</span>
            <span className="stat-lbl">Expert Teachers</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-num">10+</span>
            <span className="stat-lbl">Years of Trust</span>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div className="hero-illustration">
        <div className="hero-card main-card">
          <div className="big-emoji">👧</div>
          <div className="card-content">
            <h3>Happy Learning!</h3>
            <p>Fun • Creative • Safe</p>
          </div>
          <div className="floating-badge">⭐ 5.0 Rating</div>
        </div>
        <div className="hero-card side-card side-card-1">
          <span className="card-emoji">🎨</span>
          <span>Art & Craft</span>
        </div>
        <div className="hero-card side-card side-card-2">
          <span className="card-emoji">📚</span>
          <span>Smart Learning</span>
        </div>
        <div className="hero-card side-card side-card-3">
          <span className="card-emoji">🎵</span>
          <span>Music & Dance</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={() => scrollTo('#features')}>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  )
}
