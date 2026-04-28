'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Footer from '@/components/Footer'

/* ── Magnetic button ── */
function MagBtn({ href, children, primary, download }: { href: string; children: React.ReactNode; primary?: boolean; download?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })
  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  function onLeave() { x.set(0); y.set(0) }
  const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.endsWith('.pdf')
  return (
    <motion.a
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener' : undefined}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: sx, y: sy,
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.8rem 1.6rem', borderRadius: 12,
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.87rem', fontWeight: 500,
        letterSpacing: '0.04em', textDecoration: 'none', cursor: 'pointer',
        background: primary ? '#c9a84c' : 'transparent',
        color: primary ? '#080d1a' : '#f0f2f7',
        border: `1px solid ${primary ? 'transparent' : 'rgba(201,168,76,0.28)'}`,
        boxShadow: primary ? '0 4px 24px rgba(201,168,76,0.35)' : 'none',
        transition: 'box-shadow 0.2s, background 0.2s',
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}

/* ── Animated counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = Math.ceil(to / 40)
      const interval = setInterval(() => {
        start = Math.min(to, start + step)
        setVal(start)
        if (start >= to) clearInterval(interval)
      }, 40)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── Profile 3D tilt ── */
function ProfileTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 100, damping: 20 })
  const sry = useSpring(ry, { stiffness: 100, damping: 20 })
  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    rx.set(((e.clientY - cy) / r.height) * -18)
    ry.set(((e.clientX - cx) / r.width) * 18)
  }
  function onLeave() { rx.set(0); ry.set(0) }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle:'preserve-3d', perspective:1000 }}
    >
      <div style={{
        width: 'min(320px, 44vw)', height: 'min(320px, 44vw)',
        borderRadius: '50%', position: 'relative',
        boxShadow: '0 0 0 2px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.1)',
        animation: 'float 6s ease-in-out infinite',
      }}>
        <div style={{ position:'absolute', inset:-16, borderRadius:'50%', border:'1.5px dashed rgba(201,168,76,0.2)', animation:'rotateRing 12s linear infinite' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:10, height:10, borderRadius:'50%', background:'#c9a84c', boxShadow:'0 0 12px #c9a84c', marginLeft:-5, marginTop:-5, animation:'orbitDot 12s linear infinite' }} />
        <img src="/profile.jpg" alt="Suriya Prasath" style={{ width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover', objectPosition:'center top', position:'relative', zIndex:2 }} />
      </div>
    </motion.div>
  )
}

const STATS = [
  { num: 8, suffix: '+', label: 'Projects' },
  { num: 5, suffix: '+', label: 'Certifications' },
  { num: 1, suffix: 'yr', label: 'Experience' },
  { num: 30, suffix: '+', label: 'Technologies' },
]

export default function Home() {
  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', padding: '4% 5%', gap: '4rem' }}>
        {/* left */}
        <motion.div
          initial={{ opacity:0, x:-30 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay:0.1 }}
          style={{ flex:1, maxWidth:'54%' }}
        >
          <motion.p
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            style={{ fontFamily:'DM Sans', fontSize:'0.78rem', fontWeight:300, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(240,242,247,0.45)', marginBottom:'1rem' }}
          >
            Hello, I&apos;m
          </motion.p>

          <div style={{ fontFamily:'Syne', fontWeight:800, lineHeight:1.1, marginBottom:'1.2rem' }}>
            {['Suriya Prasath', 'Parameswaran'].map((word, i) => (
              <div key={i} style={{ overflow:'hidden', lineHeight:1.15 }}>
                <motion.div
                  className="shimmer-text"
                  style={{ fontSize:'clamp(1.9rem, 3.2vw, 3.4rem)', fontWeight:800, letterSpacing:'0.02em', opacity: i === 1 ? 0.75 : 1 }}
                  initial={{ y:'105%' }}
                  animate={{ y:'0%' }}
                  transition={{ duration:0.75, ease:[0.76,0,0.24,1], delay: 0.35 + i * 0.14 }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.7 }}
            style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1.3rem', minHeight:'1.6rem' }}
          >
            <span style={{ width:24, height:2, background:'#c9a84c', flexShrink:0 }} />
            <TypedRole />
          </motion.div>

          <motion.p
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.8 }}
            style={{ fontFamily:'DM Sans', fontSize:'0.97rem', color:'rgba(240,242,247,0.6)', maxWidth:480, lineHeight:1.8, marginBottom:'2rem', fontWeight:300 }}
          >
            Specializing in decision-focused machine learning, risk modeling,
            and business intelligence systems built on real-world data.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.9 }}
            style={{ display:'flex', gap:'0.8rem', flexWrap:'wrap', marginBottom:'1.6rem' }}
          >
            <MagBtn href="/assets/resume/Suriya_Resume.pdf" primary download>
              <i className="fa-solid fa-download" /> Download CV
            </MagBtn>
            <MagBtn href="/projects">
              <i className="fa-solid fa-folder-open" /> View Projects
            </MagBtn>
            <MagBtn href="/contact">
              <i className="fa-solid fa-paper-plane" /> Contact Me
            </MagBtn>
          </motion.div>

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:1.0 }}
            style={{ display:'flex', gap:'0.7rem' }}
          >
            {[
              { icon:'fa-brands fa-github', href:'https://github.com/SURIYAPRASATH-PARAMESWARAN' },
              { icon:'fa-brands fa-linkedin-in', href:'https://www.linkedin.com/in/suriyaprasathp' },
            ].map(s => (
              <motion.a key={s.href} href={s.href} target="_blank" rel="noopener"
                whileHover={{ y:-3 }}
                style={{ width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:12, border:'1px solid rgba(201,168,76,0.2)', background:'rgba(255,255,255,0.03)', color:'rgba(136,146,164,1)', textDecoration:'none', fontSize:'1.1rem', transition:'color 0.2s' }}>
                <i className={s.icon} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity:0, x:30 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay:0.2 }}
          style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <ProfileTilt />
        </motion.div>
      </section>

      {/* stats bar */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.6, duration:0.6 }}
        style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid rgba(201,168,76,0.1)', borderBottom:'1px solid rgba(201,168,76,0.1)', background:'rgba(201,168,76,0.02)', position:'relative', zIndex:2, padding:'36px clamp(24px,5vw,80px)' }}
      >
        {STATS.map((s, i) => (
          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'0 20px', position:'relative', borderLeft: i > 0 ? '1px solid rgba(201,168,76,0.1)' : 'none' }}>
            <span style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#c9a84c', lineHeight:1 }}>
              <Counter to={s.num} suffix={s.suffix} />
            </span>
            <span style={{ fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(136,146,164,0.7)', fontWeight:500, textAlign:'center' }}>
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      <Footer />

      <style>{`
        @keyframes rotateRing { to { transform: rotate(360deg); } }
        @keyframes orbitDot {
          0%   { transform: rotate(0deg) translateY(-168px) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(-168px) rotate(-360deg); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

function TypedRole() {
  const roles = ['Data Scientist', 'ML Engineer', 'BI Developer', 'Risk Modeller', 'Analytics Engineer']
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[idx]
    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setIdx((idx + 1) % roles.length)
      }
    }
  }, [displayed, deleting, idx])

  return (
    <span style={{ fontFamily:'DM Sans', fontSize:'0.87rem', fontWeight:500, color:'#e2c97e', letterSpacing:'0.08em', textTransform:'uppercase' }}>
      {displayed}<span style={{ animation:'blink 0.9s infinite', color:'#c9a84c' }}>|</span>
    </span>
  )
}