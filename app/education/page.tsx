'use client'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function Education() {
  const EDU = [
    {
      icon:'fa-solid fa-graduation-cap',
      school:'University of Leeds',
      degree:'Master of Science (MSc) — Data Science and Analytics',
      period:'Sep 2024 – Sep 2025', location:'Leeds, United Kingdom',
      desc:'Focused on advanced machine learning, statistical modeling, deep learning, natural language processing, and scalable data systems.',
      tags:['Applied ML','NLP','Time Series','Cloud & Big Data'],
      bullets:['Coursework: Data Mining, Time Series Analysis, Applied ML, Cloud Computing, Big Data Analytics','Highlighted work: CVE Severity Intelligence Engine (NVD → NLP → ML classifier)'],
    },
    {
      icon:'fa-solid fa-building-columns',
      school:'SRM Easwari Engineering College — Anna University',
      degree:'Bachelor of Engineering (BE) — Mechanical Engineering',
      period:'Jun 2018 – Mar 2022', location:'Chennai, India',
      desc:'Strong foundation in engineering problem-solving with growing focus on data-driven systems, IoT, and automation.',
      tags:['Engineering Systems','IoT','Applied Projects'],
      bullets:['Hands-on project work in analysis, automation, and data visualization','Activities: IEEE, Youth Red Cross, tech + community events'],
    },
  ]

  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section" style={{ maxWidth:860 }}>
        <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
          style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'0.8rem' }}>
          Education
        </motion.h1>
        <p style={{ color:'rgba(240,242,247,0.55)', marginBottom:'2.5rem' }}>Academic background focused on data science systems, machine learning, and applied analytics.</p>
        <div style={{ position:'relative', paddingLeft:'3rem' }}>
          <div style={{ position:'absolute', top:0, bottom:0, left:'1.1rem', width:2, background:'linear-gradient(180deg,transparent,rgba(201,168,76,0.4),rgba(201,168,76,0.2),transparent)' }} />
          {EDU.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.12 }}
              style={{ position:'relative', display:'grid', gridTemplateColumns:'64px 1fr', gap:'1rem', padding:'1.5rem', marginBottom:'1.5rem', borderRadius:18, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)' }}
              className="card-hover"
            >
              <div style={{ position:'absolute', left:'-2.55rem', top:'1.5rem', width:12, height:12, borderRadius:'50%', background:'#c9a84c', boxShadow:'0 0 0 5px rgba(201,168,76,0.18)' }} />
              <div style={{ width:56, height:56, borderRadius:14, display:'grid', placeItems:'center', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.1)' }}>
                <i className={e.icon} style={{ color:'#c9a84c', fontSize:'1.25rem' }} />
              </div>
              <div>
                <h2 style={{ fontFamily:'Syne', fontSize:'1.1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'0.25rem' }}>{e.school}</h2>
                <div style={{ color:'#e2c97e', fontSize:'0.95rem', fontWeight:500, marginBottom:'0.6rem' }}>{e.degree}</div>
                <div style={{ display:'flex', gap:'1rem', marginBottom:'0.8rem', color:'rgba(240,242,247,0.45)', fontSize:'0.88rem' }}>
                  <span><i className="fa-regular fa-calendar" style={{marginRight:5}} />{e.period}</span>
                  <span><i className="fa-solid fa-location-dot" style={{marginRight:5}} />{e.location}</span>
                </div>
                <p style={{ color:'rgba(240,242,247,0.6)', lineHeight:1.7, marginBottom:'0.8rem' }}>{e.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'0.8rem' }}>
                  {e.tags.map(t => <span key={t} className="chip-base" style={{ color:'#e2c97e', borderColor:'rgba(201,168,76,0.25)', background:'rgba(201,168,76,0.08)' }}>{t}</span>)}
                </div>
                <ul style={{ paddingLeft:'1.1rem', margin:0 }}>
                  {e.bullets.map((b, j) => <li key={j} style={{ color:'rgba(240,242,247,0.55)', fontSize:'0.9rem', marginBottom:'0.35rem', lineHeight:1.6 }}>{b}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
