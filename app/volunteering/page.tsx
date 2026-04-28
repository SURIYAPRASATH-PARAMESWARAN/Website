'use client'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

const VOLS = [
  { org:'Youth Red Cross', role:'Volunteer', period:'Oct 2019 – Present', tag:'Health', desc:'Participated in blood donation drives, first-aid training, and health awareness campaigns in underprivileged communities. Assisted in organizing disaster relief programs, providing essential supplies and support to affected families.' },
  { org:'Food Distribution Program', role:'Volunteer', period:'Jan 2022 – Mar 2022', tag:'Poverty Alleviation', desc:'Assisted in organizing and executing food distribution drives for homeless communities. Helped sort, package, and distribute food items to families in need.' },
  { org:'International Monetary Fund', role:'Student Volunteer', period:'2024', tag:'Economic Empowerment', desc:'Assisted in organizing and coordinating logistics for the annual summit, facilitating seamless communication and event flow for international delegates.' },
]

export default function Volunteering() {
  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section" style={{ maxWidth:860 }}>
        <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
          style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'2rem' }}>
          Volunteering
        </motion.h1>
        <div style={{ position:'relative', paddingLeft:'3rem' }}>
          <div style={{ position:'absolute', top:0, bottom:0, left:'1.1rem', width:2, background:'linear-gradient(180deg,transparent,rgba(201,168,76,0.4),rgba(201,168,76,0.2),transparent)' }} />
          {VOLS.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.1 }}
              style={{ position:'relative', display:'grid', gridTemplateColumns:'52px 1fr', gap:'1rem', padding:'1.4rem 1.6rem', marginBottom:'1.5rem', borderRadius:18, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)' }}
              className="card-hover"
            >
              <div style={{ position:'absolute', left:'-2.5rem', top:'50%', transform:'translateY(-50%)', width:11, height:11, borderRadius:'50%', background:'#c9a84c', boxShadow:'0 0 0 5px rgba(201,168,76,0.18)' }} />
              <div style={{ width:50, height:50, borderRadius:14, display:'grid', placeItems:'center', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)' }}>
                <i className="fa-solid fa-heart" style={{ color:'#c9a84c', fontSize:'1.1rem' }} />
              </div>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.4rem', flexWrap:'wrap', gap:'0.5rem' }}>
                  <div>
                    <h2 style={{ fontFamily:'Syne', fontSize:'1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'0.1rem' }}>{v.org}</h2>
                    <span style={{ color:'rgba(240,242,247,0.5)', fontSize:'0.85rem' }}>{v.role}</span>
                  </div>
                  <span style={{ padding:'0.25rem 0.6rem', borderRadius:999, fontSize:'0.75rem', color:'rgba(136,146,164,0.7)', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', whiteSpace:'nowrap' }}>{v.period}</span>
                </div>
                <p style={{ color:'rgba(240,242,247,0.6)', lineHeight:1.7, marginBottom:'0.7rem', fontSize:'0.92rem' }}>{v.desc}</p>
                <span style={{ padding:'0.28rem 0.7rem', borderRadius:999, fontSize:'0.76rem', fontWeight:500, color:'#e2c97e', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)' }}>{v.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
