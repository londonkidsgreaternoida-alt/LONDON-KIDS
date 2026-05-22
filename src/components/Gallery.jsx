import { useState } from 'react'
import './Gallery.css'

const categories = ['All', 'Classroom', 'Annual Function', 'Sports Day', 'Drawing', 'Fancy Dress', 'Festivals', 'Birthdays']

const galleryItems = [
  { cat: 'Classroom', icon: '📚', color: '#e0f7ff', label: 'Classroom Learning', emoji: '👧📖' },
  { cat: 'Annual Function', icon: '🎭', color: '#fce7f3', label: 'Annual Function', emoji: '🎤🌟' },
  { cat: 'Sports Day', icon: '⚽', color: '#f0fdf4', label: 'Sports Day', emoji: '🏅🏃' },
  { cat: 'Drawing', icon: '🎨', color: '#fff7ed', label: 'Drawing Competition', emoji: '✏️🖼️' },
  { cat: 'Fancy Dress', icon: '👗', color: '#f5f3ff', label: 'Fancy Dress Competition', emoji: '👑🦸' },
  { cat: 'Festivals', icon: '🪔', color: '#fef9c3', label: 'Festival Celebrations', emoji: '🎆🎊' },
  { cat: 'Birthdays', icon: '🎂', color: '#fdf2f8', label: 'Birthday Celebrations', emoji: '🎉🎈' },
  { cat: 'Classroom', icon: '✏️', color: '#f0fdfa', label: 'Math Activities', emoji: '🔢📐' },
  { cat: 'Sports Day', icon: '🏅', color: '#ecfccb', label: 'Award Ceremony', emoji: '🏆🥇' },
  { cat: 'Annual Function', icon: '🎵', color: '#fdf4ff', label: 'Music Performance', emoji: '🎶🎸' },
  { cat: 'Festivals', icon: '🎄', color: '#ffe4e6', label: 'Christmas Celebration', emoji: '🎁🎅' },
  { cat: 'Birthdays', icon: '🎁', color: '#fff1f2', label: 'Birthday Party', emoji: '🥳🎂' },
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.cat === activeFilter)

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">📸 Gallery</span>
          <h2 className="section-title">
            Our Happy Moments
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">
            Glimpses of the joy, learning, and wonderful memories created at London Kids School.
          </p>
        </div>

        {/* Filters */}
        <div className="gallery-filters reveal">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              id={`filter-btn-${cat.replace(/\s/g,'-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <div
              key={`${item.cat}-${i}`}
              className="gallery-item reveal"
              style={{
                transitionDelay: `${(i % 6) * 0.07}s`,
                gridRow: i % 5 === 0 ? 'span 2' : 'span 1'
              }}
              onClick={() => setLightbox(item)}
              id={`gallery-item-${i}`}
            >
              <div className="gallery-img" style={{ background: item.color }}>
                <span className="gallery-emoji">{item.emoji}</span>
                <span className="gallery-icon">{item.icon}</span>
              </div>
              <div className="gallery-overlay">
                <span className="gallery-label">{item.label}</span>
                <span className="gallery-zoom">🔍 View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} id="lightbox">
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <div className="lightbox-img" style={{ background: lightbox.color }}>
              <span className="lightbox-emoji">{lightbox.emoji}</span>
            </div>
            <div className="lightbox-info">
              <h3>{lightbox.label}</h3>
              <p>London Kids School — {lightbox.cat}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
