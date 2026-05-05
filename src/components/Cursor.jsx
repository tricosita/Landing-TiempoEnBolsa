import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const move = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)

    let raf
    const loop = () => {
      const p = pos.current
      p.rx += (p.mx - p.rx) * 0.1
      p.ry += (p.my - p.ry) * 0.1
      if (ring.current) {
        ring.current.style.left = p.rx + 'px'
        ring.current.style.top = p.ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', width: 10, height: 10,
        background: 'var(--gold)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        transition: 'background .25s, transform .15s',
      }} />
      <div ref={ring} style={{
        position: 'fixed', width: 32, height: 32,
        border: '1px solid rgba(200,169,110,.35)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)',
        transition: 'width .3s, height .3s, border-color .3s',
      }} />
    </>
  )
}
