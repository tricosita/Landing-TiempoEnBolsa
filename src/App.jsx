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
      <Contacto />
      <Footer />
    </>
  )
}
