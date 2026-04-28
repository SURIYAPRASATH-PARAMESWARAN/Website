'use client'
import Link from 'next/link'

const LINKS = [
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

export default function Footer() {
  return (
    <footer style={{
      background: '#060b16', borderTop: '1px solid rgba(201,168,76,0.12)',
      padding: '48px 5% 0', fontFamily: 'DM Sans, sans-serif',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr', gap: 40,
        paddingBottom: 40, borderBottom: '1px solid rgba(201,168,76,0.08)',
        maxWidth: 1100, margin: '0 auto',
      }}>
        {/* brand */}
        <div>
          <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.1rem', letterSpacing:'0.1em', color:'#c9a84c', textTransform:'uppercase', marginBottom:12 }}>
            SURIYA P
          </div>
          <p style={{ fontSize:'0.82rem', color:'rgba(201,168,76,0.3)', lineHeight:1.7, maxWidth:300, fontWeight:300 }}>
            Data Scientist &amp; ML Engineer specializing in decision-focused machine learning, risk modeling, and business intelligence systems.
          </p>
          <div style={{ display:'flex', gap:10, marginTop:18 }}>
            {[
              { icon:'fa-brands fa-github', href:'https://github.com/SURIYAPRASATH-PARAMESWARAN' },
              { icon:'fa-brands fa-linkedin-in', href:'https://www.linkedin.com/in/suriyaprasathp' },
              { icon:'fa-solid fa-envelope', href:'mailto:suriyavictor6@gmail.com' },
            ].map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener" style={{
                width:34, height:34, borderRadius:8,
                border:'1px solid rgba(201,168,76,0.18)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'rgba(201,168,76,0.4)', textDecoration:'none',
                transition:'all 0.2s', fontSize:'0.85rem',
              }}>
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div>
          <h4 style={{ fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#c9a84c', fontWeight:600, marginBottom:16 }}>
            Quick Links
          </h4>
          <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
            {LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{ fontSize:'0.85rem', color:'rgba(240,242,247,0.35)', textDecoration:'none', transition:'color 0.2s', fontWeight:400 }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* more */}
        <div>
          <h4 style={{ fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#c9a84c', fontWeight:600, marginBottom:16 }}>
            More
          </h4>
          <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
            {MORE.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{ fontSize:'0.85rem', color:'rgba(240,242,247,0.35)', textDecoration:'none', transition:'color 0.2s', fontWeight:400 }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ padding:'18px 0', textAlign:'center', maxWidth:1100, margin:'0 auto' }}>
        <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.12)', letterSpacing:'0.04em' }}>
          &copy; 2026 Suriya Prasath Parameswaran. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
