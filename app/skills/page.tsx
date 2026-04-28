'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

const CORE = [
  { name:'Python',                       pct:95, color:'#3b82f6' },
  { name:'SQL & Databases',              pct:90, color:'#10b981' },
  { name:'Machine Learning',             pct:88, color:'#8b5cf6' },
  { name:'Statistical Analysis',         pct:85, color:'#6366f1' },
  { name:'Data Analysis & Visualisation',pct:87, color:'#14b8a6' },
  { name:'Deep Learning / NLP',          pct:78, color:'#ef4444' },
  { name:'Data Engineering & ETL',       pct:82, color:'#f59e0b' },
  { name:'BI & Dashboard Design',        pct:85, color:'#d97706' },
]

const SECTIONS: { title: string; chips: { label: string; bg: string; text: string }[] }[] = [
  {
    title: 'Programming Languages',
    chips: [
      { label:'Python',      bg:'#2563eb', text:'#bfdbfe' },
      { label:'SQL',         bg:'#b45309', text:'#fef3c7' },
      { label:'R',           bg:'#c2410c', text:'#ffedd5' },
      { label:'JavaScript',  bg:'#a16207', text:'#fef9c3' },
      { label:'HTML / CSS',  bg:'#be123c', text:'#ffe4e6' },
      { label:'Dart',        bg:'#0369a1', text:'#e0f2fe' },
    ],
  },
  {
    title: 'Data Science & Machine Learning',
    chips: [
      { label:'scikit-learn',            bg:'#7c3aed', text:'#ede9fe' },
      { label:'LightGBM',                bg:'#047857', text:'#d1fae5' },
      { label:'XGBoost',                 bg:'#2563eb', text:'#bfdbfe' },
      { label:'CatBoost',                bg:'#0f766e', text:'#ccfbf1' },
      { label:'SHAP',                    bg:'#92400e', text:'#fef3c7' },
      { label:'Optuna',                  bg:'#0369a1', text:'#e0f2fe' },
      { label:'PyTorch',                 bg:'#b91c1c', text:'#fee2e2' },
      { label:'HuggingFace Transformers',bg:'#b45309', text:'#fef3c7' },
      { label:'SMOTE',                   bg:'#9d174d', text:'#fce7f3' },
      { label:'Uplift Modelling',        bg:'#3f6212', text:'#ecfccb' },
      { label:'Prophet',                 bg:'#7c3aed', text:'#ede9fe' },
      { label:'PuLP / MILP',             bg:'#155e75', text:'#cffafe' },
      { label:'Feature Engineering',     bg:'#047857', text:'#d1fae5' },
      { label:'A/B Testing',             bg:'#b45309', text:'#fef3c7' },
      { label:'Isotonic Calibration',    bg:'#4338ca', text:'#e0e7ff' },
      { label:'Monte Carlo',             bg:'#be123c', text:'#ffe4e6' },
      { label:'Survival Analysis',       bg:'#3f6212', text:'#ecfccb' },
      { label:'SecBERT',                 bg:'#b91c1c', text:'#fee2e2' },
      { label:'TF-IDF',                  bg:'#4338ca', text:'#e0e7ff' },
      { label:'sklearn Pipelines',       bg:'#7c3aed', text:'#ede9fe' },
    ],
  },
  {
    title: 'Data Analytics & Databases',
    chips: [
      { label:'PostgreSQL',              bg:'#047857', text:'#d1fae5' },
      { label:'MySQL',                   bg:'#2563eb', text:'#bfdbfe' },
      { label:'DuckDB',                  bg:'#0f766e', text:'#ccfbf1' },
      { label:'Snowflake',               bg:'#155e75', text:'#cffafe' },
      { label:'pandas',                  bg:'#b45309', text:'#fef3c7' },
      { label:'Polars',                  bg:'#4338ca', text:'#e0e7ff' },
      { label:'NumPy',                   bg:'#0369a1', text:'#e0f2fe' },
      { label:'PySpark',                 bg:'#7c3aed', text:'#ede9fe' },
      { label:'Excel',                   bg:'#047857', text:'#d1fae5' },
      { label:'Window Functions / CTEs', bg:'#c2410c', text:'#ffedd5' },
      { label:'Pydantic v2',             bg:'#92400e', text:'#fef3c7' },
      { label:'dbt',                     bg:'#b45309', text:'#fef3c7' },
    ],
  },
  {
    title: 'BI & Visualisation',
    chips: [
      { label:'Power BI',        bg:'#2563eb', text:'#bfdbfe' },
      { label:'DAX',             bg:'#4338ca', text:'#e0e7ff' },
      { label:'Power Query (M)', bg:'#0369a1', text:'#e0f2fe' },
      { label:'Tableau',         bg:'#b45309', text:'#fef3c7' },
      { label:'Streamlit',       bg:'#0f766e', text:'#ccfbf1' },
      { label:'Plotly',          bg:'#7c3aed', text:'#ede9fe' },
      { label:'Matplotlib',      bg:'#047857', text:'#d1fae5' },
      { label:'Seaborn',         bg:'#92400e', text:'#fef3c7' },
    ],
  },
  {
    title: 'DevOps & Deployment',
    chips: [
      { label:'Git / GitHub',   bg:'#c2410c', text:'#ffedd5' },
      { label:'Docker',         bg:'#2563eb', text:'#bfdbfe' },
      { label:'FastAPI',        bg:'#0f766e', text:'#ccfbf1' },
      { label:'GitHub Actions', bg:'#047857', text:'#d1fae5' },
      { label:'MLflow',         bg:'#7c3aed', text:'#ede9fe' },
      { label:'pytest',         bg:'#b45309', text:'#fef3c7' },
      { label:'REST APIs',      bg:'#0369a1', text:'#e0f2fe' },
      { label:'Linux / Bash',   bg:'#c2410c', text:'#ffedd5' },
      { label:'Apache Airflow', bg:'#be123c', text:'#ffe4e6' },
    ],
  },
  {
    title: 'Cloud Platforms',
    chips: [
      { label:'AWS',          bg:'#b45309', text:'#fef3c7' },
      { label:'Azure',        bg:'#2563eb', text:'#bfdbfe' },
      { label:'Google Cloud', bg:'#0f766e', text:'#ccfbf1' },
      { label:'BigQuery',     bg:'#047857', text:'#d1fae5' },
    ],
  },
]

function BarRow({ skill, i }: { skill: typeof CORE[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimate(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ marginBottom:'1.2rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'0.32rem' }}>
        <span style={{ fontFamily:'DM Sans', fontSize:'0.95rem', fontWeight:500, color:'#f0f2f7' }}>{skill.name}</span>
        <span style={{ fontFamily:'Syne', fontSize:'0.75rem', fontWeight:700, color:'rgba(240,242,247,0.35)' }}>{skill.pct}%</span>
      </div>
      <div style={{ width:'100%', height:5, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden' }}>
        <motion.div
          initial={{ width:0 }}
          animate={animate ? { width:`${skill.pct}%` } : { width:0 }}
          transition={{ duration:1.1, ease:[0.22,1,0.36,1], delay: i * 0.08 }}
          style={{ height:'100%', borderRadius:99, background:`linear-gradient(90deg, ${skill.color}88, ${skill.color})`, boxShadow:`0 0 8px ${skill.color}44` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section" style={{ maxWidth:900 }}>
        <motion.h1
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'0.8rem' }}
        >
          Skills &amp; Technologies
        </motion.h1>
        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.1 }}
          style={{ color:'rgba(240,242,247,0.55)', fontSize:'1.02rem', lineHeight:1.75, marginBottom:'3rem' }}
        >
          Focused on data science, analytics, ML, and BI — the skills that actually appear in job descriptions.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          style={{ marginBottom:'3rem', padding:'1.8rem 2rem', borderRadius:18, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.02)' }}
        >
          <h2 style={{ fontFamily:'Syne', fontSize:'1.1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'1.5rem' }}>
            Core Proficiencies
          </h2>
          {CORE.map((s, i) => <BarRow key={s.name} skill={s} i={i} />)}
        </motion.div>

        {SECTIONS.map((sec, si) => (
          <motion.div
            key={sec.title}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-40px' }}
            transition={{ delay:si * 0.06 }}
            style={{ marginBottom:'2.2rem', padding:'1.6rem 2rem', borderRadius:18, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.02)' }}
          >
            <h2 style={{ fontFamily:'Syne', fontSize:'1.1rem', fontWeight:700, color:'#f0f2f7', marginBottom:'1.1rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#c9a84c', boxShadow:'0 0 0 4px rgba(201,168,76,0.18)', flexShrink:0 }} />
              {sec.title}
            </h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {sec.chips.map(c => (
                <motion.span
                  key={c.label}
                  whileHover={{ y:-2, scale:1.05 }}
                  style={{
                    padding:'0.42rem 1rem', borderRadius:8,
                    fontFamily:'DM Sans', fontSize:'0.82rem', fontWeight:600,
                    background: c.bg,
                    color: c.text,
                    border:'none',
                    cursor:'default',
                    letterSpacing:'0.02em',
                    boxShadow:'0 2px 6px rgba(0,0,0,0.35)',
                  }}
                >
                  {c.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  )
}