'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATUSES = ['Initializing systems', 'Loading models', 'Preparing data', 'Ready']
const NAME = 'SURIYA P'

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)
  const [statusIdx, setStatusIdx] = useState(0)
  const [lettersShown, setLettersShown] = useState<boolean[]>(Array(NAME.length).fill(false))
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // letter drop stagger
    NAME.split('').forEach((_, i) => {
      setTimeout(() => {
        setLettersShown(prev => { const n = [...prev]; n[i] = true; return n })
      }, 100 + i * 80)
    })

    // progress ticker
    const interval = setInterval(() => {
      setPct(p => {
        const next = Math.min(100, p + Math.floor(Math.random() * 6) + 3)
        setStatusIdx(Math.min(3, Math.floor(next / 26)))
        return next
      })
    }, 55)

    // exit
    const exitTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 750)
    }, 2400)

    // particle canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.3 + 0.05,
    }))
    let raf: number
    function draw() {
      if (!canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.a})`; ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y)
          if (d < 100) {
            ctx.strokeStyle = `rgba(201,168,76,${(1 - d / 100) * 0.06})`
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { clearInterval(interval); clearTimeout(exitTimer); cancelAnimationFrame(raf) }
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.4 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#050810',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
          }}
        >
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

          {/* name letters */}
          <div style={{ display:'flex', gap:'0.04em', position:'relative', zIndex:1 }}>
            {NAME.split('').map((ch, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#c9a84c',
                  display: 'inline-block',
                  transform: lettersShown[i] ? 'translateY(0)' : 'translateY(120%)',
                  opacity: lettersShown[i] ? 1 : 0,
                  transition: `transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s, opacity 0.4s ease ${i * 0.04}s`,
                  willChange: 'transform, opacity',
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)',
              position: 'relative', zIndex: 1,
            }}
          >
            Data Science &amp; Analytics
          </motion.p>

          {/* progress bar */}
          <div style={{ width: 'min(280px, 65vw)', position:'relative', zIndex:1 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
              <span style={{ fontFamily:'DM Sans', fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>
                {STATUSES[statusIdx]}
              </span>
              <span style={{ fontFamily:'Syne', fontSize:'0.72rem', color:'rgba(201,168,76,0.6)', fontWeight:700 }}>
                {pct}%
              </span>
            </div>
            <div style={{ width:'100%', height:'2px', background:'rgba(201,168,76,0.1)', borderRadius:'99px', overflow:'hidden' }}>
              <motion.div
                style={{ height:'100%', background:'linear-gradient(90deg,#9a7230,#c9a84c,#e2c97e)', borderRadius:'99px', boxShadow:'0 0 12px rgba(201,168,76,0.5)' }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.8, ease: [0.25,0.46,0.45,0.94] }}
            style={{
              position:'absolute', bottom: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
