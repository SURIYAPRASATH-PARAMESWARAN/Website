'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
]
const MORE = [
  { label: 'Education', href: '/education' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Volunteering', href: '/volunteering' },
  { label: 'Organizations', href: '/organizations' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mounted) return null

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)
  const gold = '#c9a84c'
  const mutedColor = 'rgba(240,242,247,0.55)'
  const textColor = '#f0f2f7'
  const bg = scrolled ? 'rgba(8,13,26,0.95)' : 'rgba(8,13,26,0.75)'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%', zIndex: 9999,
        background: bg,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        transition: 'background 0.3s',
      }}>
        <Link href="/" style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem',
          color: gold, letterSpacing: '0.04em', textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          Suriya Prasath
        </Link>

        <ul style={{ display: 'flex', gap: '0.2rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }} className="sp-desktop-nav">
          {NAV.map(n => (
            <li key={n.href}>
              <NavLink href={n.href} active={isActive(n.href)} textColor={textColor} mutedColor={mutedColor} gold={gold}>
                {n.label}
              </NavLink>
            </li>
          ))}

          <li style={{ position: 'relative' }}
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem',
              color: mutedColor, padding: '0.5rem 0.9rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
              transition: 'color 0.2s',
            }}>
              More <span style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', fontSize: '0.7rem' }}>▾</span>
            </span>
            <AnimatePresence>
              {dropOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: '2.8rem', right: 0, minWidth: 185,
                    listStyle: 'none', padding: '0.5rem',
                    background: 'rgba(8,13,26,0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  }}
                >
                  {MORE.map(m => (
                    <li key={m.href}>
                      <Link href={m.href} style={{
                        display: 'block', padding: '0.55rem 0.8rem', borderRadius: 9,
                        color: isActive(m.href) ? gold : mutedColor,
                        fontSize: '0.88rem', textDecoration: 'none',
                        transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
                      }}>
                        {m.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Open to work badge */}
          <li>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.38rem 0.85rem', borderRadius: 999, marginLeft: '0.4rem',
              border: '1px solid rgba(34,197,94,0.35)',
              background: 'rgba(34,197,94,0.08)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
                animation: 'pulse-green 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22c55e', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                Open to work
              </span>
            </div>
          </li>
        </ul>

        <button onClick={() => setOpen(!open)} style={{
          display: 'none', background: 'none', border: 'none',
          cursor: 'pointer', padding: '4px', color: textColor,
        }} className="sp-mobile-toggle" aria-label="Menu">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2, margin: '5px 0',
              background: textColor, borderRadius: 2, transition: 'all 0.3s',
              transform: open
                ? i===0 ? 'rotate(45deg) translate(5px,5px)'
                : i===2 ? 'rotate(-45deg) translate(5px,-5px)'
                : 'scaleX(0)' : 'none',
            }} />
          ))}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                position: 'absolute', top: 68, left: '4%', right: '4%',
                background: 'rgba(8,13,26,0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: 14, padding: '0.75rem', zIndex: 9998,
              }}
            >
              {[...NAV, ...MORE].map(n => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
                  display: 'block', padding: '0.7rem 0.9rem', borderRadius: 10,
                  color: isActive(n.href) ? gold : mutedColor,
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
                  textDecoration: 'none', transition: 'color 0.2s',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  {n.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media (max-width: 860px) {
          .sp-desktop-nav { display: none !important; }
          .sp-mobile-toggle { display: block !important; }
        }
        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 6px #22c55e; }
          50% { box-shadow: 0 0 14px #22c55e, 0 0 24px rgba(34,197,94,0.4); }
        }
      `}</style>
    </>
  )
}

function NavLink({ href, active, textColor, mutedColor, gold, children }: {
  href: string; active: boolean
  textColor: string; mutedColor: string; gold: string
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: active ? 600 : 400,
        color: active ? gold : hovered ? textColor : mutedColor,
        textDecoration: 'none', padding: '0.5rem 0.9rem',
        display: 'inline-block', transition: 'color 0.2s',
      }}
    >
      {children}
      <motion.span
        style={{
          position: 'absolute', inset: 0, borderRadius: 8,
          background: gold + '11', pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered && !active ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      {active && (
        <motion.span
          layoutId="nav-underline"
          style={{
            position: 'absolute', bottom: 2, left: '0.9rem', right: '0.9rem',
            height: 2, borderRadius: 99, background: gold,
            boxShadow: `0 0 8px ${gold}, 0 0 16px ${gold}88`,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}