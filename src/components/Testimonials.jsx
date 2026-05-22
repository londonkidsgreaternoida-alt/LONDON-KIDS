import { useState, useEffect, useRef } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Priya Sharma', role: 'Parent of Aryan (LKG)',
    text: 'London Kids School has created a wonderful learning environment for children. My son loves going to school every morning. The teachers are incredibly patient and dedicated.',
    rating: 5, avatar: '👩',
  },
  {
    name: 'Rahul Verma', role: 'Parent of Aarohi (Nursery)',
    text: 'Teachers are caring and supportive, and my child enjoys going to school every day. The facilities are excellent and the staff is very professional and warm.',
    rating: 5, avatar: '👨',
  },
  {
    name: 'Sneha Gupta', role: 'Parent of Vivaan (Play Group)',
    text: 'Best preschool in Greater Noida West! The day care facility is fantastic. My child has grown so much in confidence and communication since joining London Kids School.',
    rating: 5, avatar: '👩‍💼',
  },
  {
    name: 'Amit Singh', role: 'Parent of Ananya (UKG)',
    text: 'Excellent curriculum and amazing staff. The school has truly transformed my daughter\'s love for learning. Highly recommend to all parents in the area!',
    rating: 5, avatar: '👨‍💼',
  },
  {
    name: 'Kavita Joshi', role: 'Parent of Dev (Day Care)',
    text: 'The day care service is exceptional. I can work peacefully knowing my child is in safe, loving hands. The CCTV monitoring gives us great peace of mind.',
    rating: 5, avatar: '👩‍🦱',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAuto, setIsAuto] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isAuto) {
      timerRef.current = setInterval(() => {
        setCurrent(c => (c + 1) % testimonials.length)
      }, 4000)
    }
    return () => clearInterval(timerRef.current)
  }, [isAuto, current])

  const goTo = (i) => {
    setCurrent(i)
    setIsAuto(false)
    clearInterval(timerRef.current)
    setTimeout(() => setIsAuto(true), 8000)
  }

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((current + 1) % testimonials.length)

  return (
    <section className="testimonials" id="testimonials">
      <div className="testi-bg">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0,100 C360,200 1080,0 1440,100 L1440,0 L0,0 Z" fill="#f8fafc"/>
        </svg>
      </div>

      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">💬 Testimonials</span>
          <h2 className="section-title">
            What Parents Say
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            Hear from our wonderful parent community about their experience with London Kids School.
          </p>
        </div>

        <div className="testi-carousel reveal">
          {/* Main Card */}
          <div className="testi-main">
            <div className="testi-quote">❝</div>
            <div className="testi-card" key={current} id={`testi-card-${current}`}>
              <div className="testi-stars">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testi-text">{testimonials[current].text}</p>
              <div className="testi-author">
                <div className="testi-avatar">{testimonials[current].avatar}</div>
                <div>
                  <div className="testi-name">{testimonials[current].name}</div>
                  <div className="testi-role">{testimonials[current].role}</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="testi-controls">
              <button className="testi-btn" onClick={prev} id="testi-prev">‹</button>
              <div className="testi-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testi-dot ${i === current ? 'active' : ''}`}
                    onClick={() => goTo(i)}
                    id={`testi-dot-${i}`}
                  />
                ))}
              </div>
              <button className="testi-btn" onClick={next} id="testi-next">›</button>
            </div>
          </div>

          {/* Side Thumbnails */}
          <div className="testi-sidebar">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testi-thumb ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                id={`testi-thumb-${i}`}
              >
                <span className="thumb-avatar">{t.avatar}</span>
                <div>
                  <div className="thumb-name">{t.name}</div>
                  <div className="thumb-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
