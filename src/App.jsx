import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Programs from './components/Programs'
import DayCare from './components/DayCare'
import WhyChooseUs from './components/WhyChooseUs'
import Facilities from './components/Facilities'
import Gallery from './components/Gallery'
import Admissions from './components/Admissions'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import AdminGallery from './components/AdminGallery'
import './App.css'

// Show admin panel if URL is /admin
if (window.location.pathname === '/admin') {
  document.title = 'Admin Panel — London Kids School'
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Admin route
  if (window.location.pathname === '/admin') {
    return <AdminGallery />
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Programs />
        <DayCare />
        <WhyChooseUs />
        <Facilities />
        <Gallery />
        <Admissions />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default App

