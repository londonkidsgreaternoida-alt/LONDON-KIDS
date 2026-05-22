import { useEffect, useRef, useState } from 'react'
import './About.css'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const step = target / (duration / 16)
        let current = 0
        const timer = setInterval(() => {
          current += step
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const counters = [
  { icon: '😊', label: 'Happy Students', target: 500, suffix: '+' },
  { icon: '🎯', label: 'Activities', target: 50, suffix: '+' },
  { icon: '👩‍🏫', label: 'Expert Teachers', target: 15, suffix: '+' },
  { icon: '💯', label: 'Parent Satisfaction', target: 99, suffix: '%' },
]

export default function About() {
  return (
    <section className="about" id="about">
      {/* Wave top */}
      <div className="wave-top">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="#f8fafc"/>
        </svg>
      </div>

      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">🏫 About Us</span>
          <h2 className="section-title">
            About London Kids School
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            London Kids School is committed to providing quality early childhood education with modern teaching methods and caring guidance.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="vm-grid">
          <div className="vm-card vm-card--vision reveal-left">
            <div className="vm-icon">🎯</div>
            <h3>Our Vision</h3>
            <p>"To become a leading preschool that nurtures confident, creative, and intelligent children."</p>
            <div className="vm-accent"></div>
          </div>
          <div className="vm-card vm-card--mission reveal-right">
            <div className="vm-icon">🚀</div>
            <h3>Our Mission</h3>
            <p>"To provide joyful learning experiences that help children grow academically, socially, emotionally, and morally."</p>
            <div className="vm-accent"></div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="about-images reveal">
          <div className="about-img-card img-main">
            <div className="img-placeholder img-placeholder--school">
              <span className="img-emoji">🏫</span>
              <span>Our School</span>
            </div>
            <div className="img-label">London Kids School Campus</div>
          </div>
          <div className="about-img-stack">
            <div className="about-img-card img-small">
              <div className="img-placeholder img-placeholder--learning">
                <span className="img-emoji">📚</span>
                <span>Learning</span>
              </div>
            </div>
            <div className="about-img-card img-small">
              <div className="img-placeholder img-placeholder--teacher">
                <span className="img-emoji">👩‍🏫</span>
                <span>Teaching</span>
              </div>
            </div>
          </div>
        </div>

        {/* Counters */}
        <div className="counters-grid reveal">
          {counters.map((c, i) => (
            <div className="counter-card" key={i} id={`counter-${i}`}>
              <div className="counter-icon">{c.icon}</div>
              <div className="counter-num">
                <Counter target={c.target} suffix={c.suffix} />
              </div>
              <div className="counter-label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  )
}
