import { useEffect } from 'react'
import './index.css'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import QueEs from './components/QueEs'
import LaBolsa from './components/LaBolsa'
import LosNodos from './components/LosNodos'
import Trayecto from './components/Trayecto'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import LogoLoop from './components/LogoLoop'
import { instituciones } from './data/logos'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.seccion')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <QueEs />
      <LaBolsa />
      <LosNodos />
      <Trayecto />

      <div style={{ padding: '48px 0', borderBottom: '1px solid #0f0f0f' }}>
        <LogoLoop
          logos={instituciones}
          speed={22}
          direction="left"
          logoHeight={165}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#080808"
          ariaLabel="Instituciones del proyecto"
        />
      </div>

      <Contacto />
      <Footer />
    </>
  )
}
