'use client'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Footer from '@/components/Footer'

const PROJECTS = [
  {
    id:1, featured:true, tags:['ai-nlp','machine-learning'],
    category:'AI / NLP', bannerColor:'#0f766e', bannerText:'#5eead4',
    icon:'fa-solid fa-shield-halved',
    title:'CyberSec Severity Intelligence Engine',
    problem:'How do you automatically classify thousands of CVEs by severity without manual review?',
    solution:'Built an end-to-end NLP pipeline using TF-IDF + XGBoost and fine-tuned SecBERT achieving 0.81 F1 on CRITICAL class. Includes SHAP token-level explainability so analysts know exactly why a CVE was flagged.',
    tools:['Python','SecBERT','XGBoost','SHAP','Streamlit','SMOTE','TF-IDF'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/cve-severity-intelligence-engine',
  },
  {
    id:2, featured:true, tags:['machine-learning','bi-decision'],
    category:'Machine Learning', bannerColor:'#4338ca', bannerText:'#e0e7ff',
    icon:'fa-solid fa-robot',
    title:'Fraud Triage Engine',
    problem:'Given only 500 manual reviews per day, which transactions should investigators prioritize to catch the most fraud?',
    solution:'Reframed detection as a capacity-constrained ranking problem. Calibrated LightGBM + XGBoost ensemble achieves 81.3% fraud recall at 500 daily reviews — a 70% cost reduction vs naive threshold approaches.',
    tools:['Python','LightGBM','XGBoost','SHAP','Isotonic Calibration','Drift Detection'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/Fraud-Triage-Engine',
  },
  {
    id:3, featured:true, tags:['machine-learning','bi-decision'],
    category:'BI / Decision', bannerColor:'#047857', bannerText:'#d1fae5',
    icon:'fa-solid fa-chart-line',
    title:'Telecom Churn Decision Engine',
    problem:'With a fixed £10k retention budget, which customers should you target to maximise profit — not just reduce churn?',
    solution:'Combined survival-adjusted CLV, T-learner uplift modeling, and MILP budget allocation to achieve 8.15× ROI — outperforming highest-churn-first targeting by +37.7% mean profit across 2,000 Monte Carlo scenarios.',
    tools:['Python','LightGBM','PuLP MILP','Uplift Modeling','Monte Carlo','CLV'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/teleco-churn-decision-engine',
  },
  {
    id:4, featured:true, tags:['machine-learning','bi-decision'],
    category:'BI / Decision', bannerColor:'#b45309', bannerText:'#fef3c7',
    icon:'fa-solid fa-bullseye',
    title:'Campaign ROI Optimisation Engine',
    problem:'Given N outbound calls per day, which bank customers should you contact to maximise conversion profit?',
    solution:'Optuna-tuned Random Forest (ROC-AUC 0.81) with profit-ranked triage achieves 77% conversion precision in top 1,000 contacts — 6.8× better than random. Interactive Streamlit dashboard simulates profit at any call volume.',
    tools:['Python','Random Forest','Optuna','SHAP','Streamlit','Profit Simulation'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/campaign-roi-optimization-engine',
  },
  {
    id:5, featured:false, tags:['forecasting'],
    category:'Forecasting', bannerColor:'#b91c1c', bannerText:'#fee2e2',
    icon:'fa-solid fa-chart-column',
    title:'Rossmann Sales Forecasting — 2026',
    problem:'Which forecasting model wins across 1,115 stores — and how do you detect when predictions start drifting?',
    solution:'Full boosting race (Prophet vs LightGBM vs XGBoost vs CatBoost). XGBoost wins with RMSE 1.29M vs lag-7 baseline 3.09M. Includes 18 engineered features and production drift monitoring.',
    tools:['Python','Prophet','XGBoost','LightGBM','CatBoost','Polars','Pydantic v2'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/rossmann-sales-forecasting',
  },
  {
    id:6, featured:false, tags:['data-engineering','bi-decision'],
    category:'Data Engineering', bannerColor:'#92400e', bannerText:'#fef3c7',
    icon:'fa-solid fa-database',
    title:'E-Commerce SQL Intelligence Engine',
    problem:'What is actually driving revenue and retention across 99K orders in 27 Brazilian states?',
    solution:'Full SQL analytics layer with window functions and CTEs surfaced via 3-page Power BI dashboard. Champions generate 8× the revenue of Lost customers. Delivery delays proven to drop satisfaction from 4.3 to 2.7 stars.',
    tools:['PostgreSQL','Power BI','DAX','RFM','Cohort Analysis','Window Functions'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/ecommerce-sql-intelligence',
  },
  {
    id:7, featured:false, tags:['bi-decision'],
    category:'BI / Decision', bannerColor:'#047857', bannerText:'#d1fae5',
    icon:'fa-solid fa-earth-europe',
    title:'Global Retail Intelligence',
    problem:'Why does a $12.64M revenue business run at only 11.61% profit margin — where is the money leaking?',
    solution:'Three-page Power BI dashboard with decomposition tree drilling from total profit to individual customer. Scatter analysis proves discount abuse destroys margin across 147 countries.',
    tools:['Power BI','DAX','Power Query','Decomposition Tree','Profit Analysis'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/Global-Retail-Intelligence',
  },
  {
    id:8, featured:false, tags:['bi-decision'],
    category:'BI / Decision', bannerColor:'#155e75', bannerText:'#cffafe',
    icon:'fa-solid fa-building-columns',
    title:'Financial Performance Intelligence',
    problem:'How do 15 global companies compare on ROE, ROA, and margin — and what did COVID actually do to each sector?',
    solution:'Multi-page Power BI report with drill-through from executive KPIs to full company profiles. Star schema with custom DateTable. COVID-19 impact analysis across sectors from 2009–2023.',
    tools:['Power BI','DAX','Power Query','Financial Ratios','Star Schema'],
    github:'https://github.com/SURIYAPRASATH-PARAMESWARAN/Financial-Performance-Intelligence',
  },
]

const FILTERS = [
  { label:'All', value:'all' },
  { label:'Machine Learning', value:'machine-learning' },
  { label:'AI / NLP', value:'ai-nlp' },
  { label:'Data Engineering', value:'data-engineering' },
  { label:'Forecasting', value:'forecasting' },
  { label:'BI / Decision', value:'bi-decision' },
]

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx,{stiffness:120,damping:20})
  const sry = useSpring(ry,{stiffness:120,damping:20})
  const [hovered, setHovered] = useState(false)
  const [mx, setMx] = useState(50), [my, setMy] = useState(50)

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect()
    rx.set(((e.clientY-r.top)/r.height-0.5)*-10)
    ry.set(((e.clientX-r.left)/r.width-0.5)*10)
    setMx(((e.clientX-r.left)/r.width)*100)
    setMy(((e.clientY-r.top)/r.height)*100)
  }
  function onLeave() { rx.set(0); ry.set(0); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={()=>setHovered(true)}
      style={{
        rotateX:srx, rotateY:sry,
        transformStyle:'preserve-3d', perspective:1000,
        borderRadius:16, overflow:'hidden',
        border:`1px solid ${p.featured ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.07)'}`,
        background: p.featured ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        boxShadow: hovered ? '0 24px 70px rgba(0,0,0,0.5)' : '0 8px 28px rgba(0,0,0,0.3)',
        display:'flex', flexDirection:'column', position:'relative',
      }}
      whileHover={{ y:-5 }}
    >
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        background:`radial-gradient(220px circle at ${mx}% ${my}%, rgba(201,168,76,0.06), transparent 60%)`,
        opacity: hovered ? 1 : 0, transition:'opacity 0.3s',
      }} />

      <div style={{
        background: p.bannerColor, padding:'1rem 1.4rem',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'relative', zIndex:1,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <i className={p.icon} style={{ color: p.bannerText, fontSize:'1rem' }} />
          <span style={{ fontFamily:'Syne', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.08em', textTransform:'uppercase', color: p.bannerText }}>
            {p.category}
          </span>
        </div>
        {p.featured && (
          <span style={{
            display:'flex', alignItems:'center', gap:'0.3rem',
            padding:'0.2rem 0.55rem', borderRadius:999,
            background:'rgba(0,0,0,0.25)', color:'#fff',
            fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase',
          }}>
            <i className="fa-solid fa-star" style={{fontSize:'0.55rem'}} /> FEATURED
          </span>
        )}
      </div>

      <div style={{ padding:'1.4rem', flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:1 }}>
        <h2 style={{ fontFamily:'Syne', fontSize:'1.05rem', fontWeight:700, color:'#f0f2f7', marginBottom:'0.85rem', lineHeight:1.3 }}>
          {p.title}
        </h2>
        <div style={{ marginBottom:'0.75rem' }}>
          <span style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: p.bannerText, opacity:0.9 }}>Problem</span>
          <p style={{ color:'rgba(240,242,247,0.75)', fontSize:'0.88rem', lineHeight:1.6, marginTop:'0.25rem', fontStyle:'italic' }}>{p.problem}</p>
        </div>
        <div style={{ marginBottom:'1.1rem', flex:1 }}>
          <span style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: p.bannerText, opacity:0.9 }}>Solution</span>
          <p style={{ color:'rgba(240,242,247,0.6)', fontSize:'0.88rem', lineHeight:1.65, marginTop:'0.25rem' }}>{p.solution}</p>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.1rem' }}>
          {p.tools.map(t => (
            <span key={t} style={{ padding:'0.28rem 0.7rem', borderRadius:6, fontFamily:'DM Sans', fontSize:'0.76rem', fontWeight:600, background: p.bannerColor, color: p.bannerText, boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>
              {t}
            </span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noopener" style={{
          display:'inline-flex', alignItems:'center', gap:'0.5rem',
          padding:'0.58rem 0.9rem', borderRadius:10, fontSize:'0.84rem',
          color:'rgba(240,242,247,0.6)', background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.1)', textDecoration:'none',
          transition:'all 0.2s', width:'fit-content',
        }}>
          <i className="fa-brands fa-github" /> View on GitHub
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const visible = PROJECTS.filter(p => {
    const matchFilter = filter === 'all' || p.tags.includes(filter)
    const matchSearch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.problem.toLowerCase().includes(search.toLowerCase()) ||
      p.tools.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-section">
        <motion.h1
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ fontFamily:'Syne', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:800, color:'#f0f2f7', marginBottom:'0.85rem' }}
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.1 }}
          style={{ color:'rgba(240,242,247,0.55)', fontSize:'1.02rem', lineHeight:1.75, marginBottom:'2rem', maxWidth:820 }}
        >
          Production-style ML systems built around real business problems — not just accuracy scores.
        </motion.p>

        <div style={{ marginBottom:'1.5rem', position:'relative', maxWidth:480 }}>
          <i className="fa-solid fa-magnifying-glass" style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'rgba(201,168,76,0.5)', fontSize:'0.85rem' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects, tools..."
            style={{
              width:'100%', padding:'0.75rem 1rem 0.75rem 2.5rem',
              borderRadius:12, fontFamily:'DM Sans', fontSize:'0.9rem',
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
              color:'#f0f2f7', outline:'none',
            }}
          />
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.6rem', marginBottom:'2.5rem' }}>
          {FILTERS.map(f => {
            const count = f.value === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.tags.includes(f.value)).length
            return (
              <button key={f.value} onClick={()=>setFilter(f.value)} style={{
                padding:'0.5rem 1rem', borderRadius:999, cursor:'pointer',
                fontFamily:'DM Sans', fontSize:'0.86rem', fontWeight:500,
                border: filter===f.value ? '1px solid rgba(201,168,76,0.45)' : '1px solid rgba(255,255,255,0.08)',
                background: filter===f.value ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                color: filter===f.value ? '#c9a84c' : 'rgba(240,242,247,0.55)',
                transition:'all 0.2s',
              }}>
                {f.label} <span style={{ opacity:0.5, fontSize:'0.78rem' }}>{count}</span>
              </button>
            )
          })}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,380px),1fr))', gap:'1.5rem' }}>
          {visible.map((p,i) => (
            <motion.div key={p.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}>
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}