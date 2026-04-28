'use client'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

const EXPERIENCE = [
  {
    company: 'Cognizant Technology Solutions',
    location: 'Chennai, India',
    role: 'ETL & Data Engineering Intern',
    period: 'Jul 2022 – Dec 2022',
    bullets: [
      'Worked within enterprise ETL workflows using Informatica to clean, validate and standardise structured datasets used in downstream analytics and reporting.',
      'Applied transformation rules and data validation checks to correct inconsistent records, handling missing values and ensuring reliable data formatting across multiple sources.',
      'Assisted data engineering teams in monitoring ETL job runs, identifying data quality issues, and supporting fixes to maintain stable data pipelines.',
    ],
  },
  {
    company: 'Shree Kay Vee Automation',
    location: 'Chennai, India',
    role: 'IoT & Analytics Intern',
    period: 'Jan 2023 – Apr 2023',
    bullets: [
      'Worked with a team analyzing IoT sensor data from industrial equipment to explore patterns related to machine performance and potential failures.',
      'Cleaned and preprocessed IoT sensor datasets using Python and SQL to support equipment performance analysis.',
      'Contributed to building basic dashboards and visualisations to track operational metrics and equipment performance.',
      'Supported the development of data ingestion and processing scripts used in internal analytics workflows.',
    ],
  },
]

function ExCard({ exp, i }: { exp: typeof EXPERIENCE[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-20 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:0.55, delay:i*0.12 }}
      style={{
        position:'relative', marginBottom:'1.8rem',
        padding:'1.8rem 2rem', borderRadius:18,
        border:'1px solid rgba(255,255,255,0.08)',
        background:'rgba(255,255,255,0.03)', backdropFilter:'blur(12px)',
        boxShadow:'0 8px 28px rgba(0,0,0,0.3)',
        transition:'transform 0.25s, border-color 0.25s',
      }}
      className="card-hover"
    >
      {/* timeline dot */}
      <div style={{
        position:'absolute', left:'-2.8rem', top:'2rem',
        width:12, height:12, borderRadius:'50%',
        background:'#c9a84c', boxShadow:'0 0 0 5px rgba(201,168,76,0.18)',
      }} />

      <h3 style={{ fontFamily:'Syne', fontSize:'1.1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'0.35rem' }}>
        {exp.company}
        <span style={{ fontFamily:'DM Sans', fontSize:'0.82rem', color:'rgba(240,242,247,0.4)', fontWeight:400, marginLeft:'0.5rem' }}>— {exp.location}</span>
      </h3>
      <div style={{
        display:'inline-flex', alignItems:'center', gap:'0.5rem',
        padding:'0.35rem 0.75rem', marginBottom:'1rem', borderRadius:999,
        color:'#e2c97e', background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.2)',
        fontSize:'0.84rem', fontWeight:500,
      }}>
        {exp.role} · {exp.period}
      </div>
      <ul style={{ paddingLeft:'1.1rem', margin:0 }}>
        {exp.bullets.map((b, j) => (
          <li key={j} style={{ color:'rgba(240,242,247,0.6)', lineHeight:1.65, marginBottom:'0.5rem', fontSize:'0.94rem' }}>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function About() {
  return (
    <div style={{ paddingTop:100 }}>
      <div className="page-section">
        {/* about */}
        <motion.section
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }}
          style={{ marginBottom:'4rem', paddingBottom:'2.5rem', borderBottom:'1px solid rgba(201,168,76,0.12)' }}
        >
          <h1 style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'1.2rem' }}>
            About Me
          </h1>
          <p style={{ maxWidth:640, fontSize:'1rem', color:'rgba(240,242,247,0.62)', marginBottom:'1rem', lineHeight:1.8, fontWeight:300 }}>
            I&apos;m a Data Science and Analytics graduate from the University of Leeds, currently focused on machine learning, risk modelling, and building data systems that actually help people make better decisions.
          </p>
          <p style={{ maxWidth:640, fontSize:'1rem', color:'rgba(240,242,247,0.62)', lineHeight:1.8, fontWeight:300 }}>
            I&apos;ve worked on projects spanning NLP, fraud detection, revenue forecasting, and churn analysis — mostly stuff where the goal is a useful output, not just a good accuracy score. I also have hands-on experience from internships in ETL engineering and IoT analytics.
          </p>
        </motion.section>

        {/* experience */}
        <section style={{ position:'relative', paddingLeft:'3rem' }}>
          {/* timeline line */}
          <div style={{
            position:'absolute', top:0, bottom:0, left:'1.1rem', width:2,
            background:'linear-gradient(180deg,transparent,rgba(201,168,76,0.4),rgba(201,168,76,0.2),transparent)',
          }} />

          <motion.h2
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            style={{ fontFamily:'Syne', fontSize:'clamp(1.6rem,2.8vw,2.2rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'2.5rem' }}
          >
            Experience
          </motion.h2>

          {EXPERIENCE.map((exp, i) => <ExCard key={i} exp={exp} i={i} />)}
        </section>
      </div>
      <Footer />
    </div>
  )
}
