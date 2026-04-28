'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function Contact() {
  const [status, setStatus] = useState<'idle'|'sending'|'done'|'error'>('idle')
  const [form, setForm] = useState({ name:'', email:'', message:'' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace YOUR_FORM_ID with your actual Formspree ID
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('done'); setForm({ name:'', email:'', message:'' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'0.9rem 1rem', borderRadius:12,
    fontFamily:'DM Sans', fontSize:'0.95rem', color:'#f0f2f7',
    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
    outline:'none', transition:'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section" style={{ maxWidth:800 }}>
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ textAlign:'center', marginBottom:'3rem' }}
        >
          <h1 style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'0.8rem' }}>
            Get In Touch
          </h1>
          <p style={{ color:'rgba(240,242,247,0.55)', fontSize:'1.02rem', lineHeight:1.78, maxWidth:580, margin:'0 auto' }}>
            Open to collaborations, data projects, and opportunities in Data Science / Analytics. Feel free to reach out.
          </p>
        </motion.div>

        {/* contact cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1rem', marginBottom:'2.5rem' }}>
          {[
            { icon:'fa-solid fa-envelope', label:'Email', value:'suriyavictor6@gmail.com', href:'mailto:suriyavictor6@gmail.com' },
            { icon:'fa-solid fa-location-dot', label:'Location', value:'Leeds, UK', href: null },
          ].map(c => (
            <motion.div key={c.label}
              whileHover={{ y:-3, borderColor:'rgba(201,168,76,0.25)' }}
              style={{
                display:'flex', gap:'1rem', alignItems:'center',
                padding:'1.3rem 1.5rem', borderRadius:16,
                border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)',
                backdropFilter:'blur(12px)',
              }}
            >
              <div style={{ width:50, height:50, borderRadius:13, display:'grid', placeItems:'center', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.1)' }}>
                <i className={c.icon} style={{ color:'#c9a84c', fontSize:'1.2rem' }} />
              </div>
              <div>
                <div style={{ fontSize:'0.75rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(136,146,164,0.8)', marginBottom:'0.2rem' }}>{c.label}</div>
                {c.href
                  ? <a href={c.href} style={{ fontSize:'1rem', fontWeight:500, color:'#f0f2f7', textDecoration:'none' }}>{c.value}</a>
                  : <div style={{ fontSize:'1rem', fontWeight:500, color:'#f0f2f7' }}>{c.value}</div>
                }
              </div>
            </motion.div>
          ))}
        </div>

        {/* form */}
        <motion.form
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.2 }}
          onSubmit={handleSubmit}
          style={{ padding:'2rem', borderRadius:20, border:'1px solid rgba(201,168,76,0.15)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)' }}
        >
          <h3 style={{ fontFamily:'Syne', fontSize:'1.1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'1.5rem' }}>
            Send a message
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
            <div>
              <label style={{ display:'block', fontSize:'0.8rem', color:'rgba(240,242,247,0.5)', marginBottom:'0.4rem', letterSpacing:'0.04em' }}>Name</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name" required
                onFocus={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.45)'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(201,168,76,0.08)' }}
                onBlur={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow='none' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.8rem', color:'rgba(240,242,247,0.5)', marginBottom:'0.4rem', letterSpacing:'0.04em' }}>Email</label>
              <input type="email" style={inputStyle} value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="your@email.com" required
                onFocus={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.45)'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(201,168,76,0.08)' }}
                onBlur={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow='none' }} />
            </div>
          </div>
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.8rem', color:'rgba(240,242,247,0.5)', marginBottom:'0.4rem', letterSpacing:'0.04em' }}>Message</label>
            <textarea rows={5} style={{...inputStyle, resize:'vertical', minHeight:120}} value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Your message..." required
              onFocus={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.45)'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(201,168,76,0.08)' }}
              onBlur={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow='none' }} />
          </div>
          <motion.button
            type="submit" disabled={status==='sending'||status==='done'}
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            style={{
              width:'100%', padding:'0.9rem', borderRadius:12,
              fontFamily:'DM Sans', fontSize:'0.95rem', fontWeight:600, letterSpacing:'0.04em',
              background: status==='done' ? '#10b981' : '#c9a84c',
              color: status==='done' ? '#fff' : '#080d1a',
              border:'none', cursor: status==='sending'||status==='done' ? 'not-allowed' : 'pointer',
              transition:'background 0.3s',
              boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
            }}
          >
            {status==='idle' && <><i className="fa-solid fa-paper-plane" /> Send Message</>}
            {status==='sending' && 'Sending...'}
            {status==='done' && <><i className="fa-solid fa-check" /> Message Sent!</>}
            {status==='error' && 'Error — try again'}
          </motion.button>

          <p style={{ fontSize:'0.78rem', color:'rgba(240,242,247,0.3)', textAlign:'center', marginTop:'0.8rem' }}>
            Powered by Formspree — replace <code style={{color:'#c9a84c'}}>YOUR_FORM_ID</code> in contact/page.tsx
          </p>
        </motion.form>

        {/* social */}
        <div style={{ display:'flex', justifyContent:'center', gap:'0.8rem', marginTop:'2rem', flexWrap:'wrap' }}>
          {[
            { icon:'fa-brands fa-github', label:'GitHub', href:'https://github.com/SURIYAPRASATH-PARAMESWARAN' },
            { icon:'fa-brands fa-linkedin-in', label:'LinkedIn', href:'https://www.linkedin.com/in/suriyaprasathp' },
          ].map(s => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener"
              whileHover={{ y:-3, borderColor:'rgba(201,168,76,0.35)' }}
              style={{
                display:'inline-flex', alignItems:'center', gap:'0.55rem',
                padding:'0.75rem 1.1rem', borderRadius:999,
                border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)',
                color:'rgba(240,242,247,0.6)', textDecoration:'none', fontSize:'0.9rem',
                fontFamily:'DM Sans', fontWeight:500, transition:'all 0.2s',
              }}
            >
              <i className={s.icon} style={{fontSize:'1.1rem'}} /> {s.label}
            </motion.a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
