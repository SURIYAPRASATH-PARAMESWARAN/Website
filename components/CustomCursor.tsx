'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on mobile
    let x = -100, y = -100, rx = -100, ry = -100
    let rafId: number

    function onMove(e: MouseEvent) { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove)

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function loop() {
      rx = lerp(rx, x, 0.12); ry = lerp(ry, y, 0.12)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`
      }
      rafId = requestAnimationFrame(loop)
    }
    loop()

    // scale on hover
    function onEnter() { ringRef.current?.style.setProperty('transform-scale', '1.8') }
    function onLeave() {}

    document.querySelectorAll('a, button, .card-hover, .pill').forEach(el => {
      el.addEventListener('mouseenter', () => { if (ringRef.current) { ringRef.current.style.width = '44px'; ringRef.current.style.height = '44px'; ringRef.current.style.borderColor = 'rgba(201,168,76,0.8)' } })
      el.addEventListener('mouseleave', () => { if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; ringRef.current.style.borderColor = 'rgba(201,168,76,0.35)' } })
    })

    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <>
      {/* dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 8, height: 8, borderRadius: '50%',
        background: '#c9a84c',
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(201,168,76,0.8)',
        transition: 'width 0.2s, height 0.2s',
        willChange: 'transform',
      }} />
      {/* ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: 36, height: 36, borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.35)',
        pointerEvents: 'none',
        willChange: 'transform',
        transition: 'width 0.25s, height 0.25s, border-color 0.25s',
      }} />
    </>
  )
}
