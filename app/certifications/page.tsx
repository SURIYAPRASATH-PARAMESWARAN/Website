'use client'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

const CERTS = [
  { title:'Certified Data Analyst', org:'Greens Technology', desc:'Certified proficiency in data science methodologies, machine learning algorithms, and statistical analysis.', date:'March 2024' },
  { title:'AWS & DevOps', org:'Cloudzone', desc:'Hands-on training in AWS core services, CI/CD pipelines, infrastructure as code, containerisation, and DevOps automation workflows.', date:'September 2025' },
  { title:'Internet of Things (IoT)', org:'KaaShiv InfoTech', desc:'Certified in IoT architecture, sensor networks, real-time data processing, and embedded systems integration.', date:'February 2024' },
  { title:'Programming in C', org:'NIIT Limited', desc:'Certification in C programming fundamentals, memory management, and systems programming.', date:'2022' },
  { title:'AWS Academy Cloud Architecting', org:'Amazon Web Services', desc:'Graduate-level certification covering compute, storage, networking, security, and scalable cloud architecture.', date:'December 2024' },
  { title:'Certified Mechanical Design Engineer', org:'CERO / SolidWorks / CATIA / ANSYS / Fusion 360', desc:'Certified in professional mechanical design tools and simulation platforms used in industrial engineering.', date:'2023' },
]

export default function Certifications() {
  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section">
        <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
          style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'0.7rem', textAlign:'center' }}>
          Certifications
        </motion.h1>
        <p style={{ textAlign:'center', color:'rgba(240,242,247,0.55)', marginBottom:'2.5rem', maxWidth:600, margin:'0 auto 2.5rem' }}>
          Verified learning and practical training across data analytics, cloud architecture, DevOps, IoT, and engineering tools.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.4rem' }}>
          {CERTS.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08 }}
              style={{ position:'relative', padding:'1.5rem', paddingTop:'3.8rem', borderRadius:18, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)', display:'flex', flexDirection:'column' }}
              className="card-hover"
            >
              <div style={{ position:'absolute', top:'1rem', left:'1rem', width:38, height:38, borderRadius:11, display:'grid', placeItems:'center', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.1)' }}>
                <i className="fa-solid fa-circle-check" style={{ color:'#c9a84c', fontSize:'1rem' }} />
              </div>
              <h3 style={{ fontFamily:'Syne', fontSize:'1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'0.35rem', lineHeight:1.25 }}>{c.title}</h3>
              <div style={{ color:'#e2c97e', fontSize:'0.85rem', fontWeight:500, marginBottom:'0.7rem' }}>{c.org}</div>
              <p style={{ color:'rgba(240,242,247,0.55)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'0.85rem', flex:1 }}>{c.desc}</p>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', padding:'0.38rem 0.7rem', borderRadius:999, fontSize:'0.78rem', color:'rgba(136,146,164,0.8)', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', width:'fit-content' }}>
                <i className="fa-solid fa-certificate" style={{color:'#c9a84c'}} /> {c.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}