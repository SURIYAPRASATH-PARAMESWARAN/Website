'use client'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

const ORGS = [
  { name:'Equinox', role:'Member', period:'Oct 2024 – Present', org:'', desc:'Engaged in personal fitness and wellness activities, demonstrating commitment to maintaining a balanced lifestyle. Participated in group fitness classes, endurance training, and community wellness events.' },
  { name:'Institution of Electronics and Telecommunication Engineers', role:'Member', period:'Aug 2019 – May 2023', org:'Anna University', desc:'Engaged in knowledge-sharing events and conferences, staying updated on the latest trends in telecommunications and electronics engineering.' },
  { name:'Youth Red Cross', role:'Volunteer', period:'Sep 2019 – Present', org:'Anna University', desc:'Organized and participated in blood donation drives, health awareness campaigns, and disaster relief efforts, contributing to community welfare and public health initiatives.' },
  { name:'Data Science Society', role:'Member', period:'Aug 2023 – May 2025', org:'', desc:'Engaged with the data science community through meetups, hackathons, and data-driven projects, contributing to open-source data science initiatives and collaborations.' },
]

export default function Organizations() {
  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section">
        <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
          style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'2.2rem', textAlign:'center' }}>
          Organizations
        </motion.h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.4rem' }}>
          {ORGS.map((o, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08 }}
              style={{ position:'relative', padding:'1.5rem', paddingTop:'4rem', borderRadius:18, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)', display:'flex', flexDirection:'column' }}
              className="card-hover"
            >
              <div style={{ position:'absolute', top:'1rem', left:'1rem', width:38, height:38, borderRadius:11, display:'grid', placeItems:'center', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.1)' }}>
                <i className="fa-solid fa-users" style={{ color:'#c9a84c', fontSize:'1rem' }} />
              </div>
              <h2 style={{ fontFamily:'Syne', fontSize:'1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'0.25rem', lineHeight:1.25 }}>{o.name}</h2>
              <p style={{ color:'rgba(240,242,247,0.5)', fontSize:'0.85rem', marginBottom:'0.75rem' }}>{o.role}</p>
              <p style={{ color:'rgba(240,242,247,0.55)', lineHeight:1.7, fontSize:'0.9rem', flex:1, marginBottom:'1rem' }}>{o.desc}</p>
              <div style={{ display:'flex', justifyContent:'space-between', paddingTop:'0.8rem', borderTop:'1px solid rgba(255,255,255,0.06)', color:'rgba(136,146,164,0.6)', fontSize:'0.8rem' }}>
                <span>{o.period}</span>
                {o.org && <span>{o.org}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
