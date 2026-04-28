'use client'
import { useEffect, useRef } from 'react'

const ML_LABELS = [
  'XGBoost','LightGBM','SHAP','Python','SQL',
  'scikit-learn','PyTorch','Transformers','Optuna',
  'CatBoost','PuLP','Polars','FastAPI','Docker',
  'MLflow','Power BI','DAX','Streamlit','Prophet',
  'SMOTE','Uplift','CLV','MILP','SecBERT','TF-IDF',
]

const COLORS = [
  [201,168,76],[99,102,241],[20,184,166],[239,68,68],[16,185,129],[168,85,247],
]

export default function NeuralNetBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W=0,H=0,dpr=1,rafId:number,t=0
    interface Node{x:number;y:number;vx:number;vy:number;r:number;label:string;alpha:number;pulse:number;pulseSpeed:number;color:number}
    interface Bar{x:number;w:number;baseH:number;phase:number;speed:number;alpha:number;floorY:number}
    interface ScatterPt{x:number;y:number;vx:number;vy:number;r:number;alpha:number;group:number}
    interface LinePt{phase:number;speed:number;base:number;amp:number}
    let nodes:Node[]=[],barGroups:{a:Bar;b:Bar}[]=[],scatter:ScatterPt[]=[],linePts:LinePt[]=[]
    const pulses:{from:number;to:number;t:number;speed:number;color:number}[]=[]
    let pulseTimer=0,donutAngle=0
    const mouse={x:-9999,y:-9999}
    const gold=(a:number)=>`rgba(201,168,76,${a})`
    const slate=(a:number)=>`rgba(136,146,164,${a})`
    function gc(ci:number,a:number){const[r,g,b]=COLORS[ci%COLORS.length];return`rgba(${r},${g},${b},${a})`}

    function resize(){
      dpr=Math.min(2,window.devicePixelRatio||1);W=window.innerWidth;H=window.innerHeight
      canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr)
      canvas.style.width=W+'px';canvas.style.height=H+'px'
      ctx.setTransform(dpr,0,0,dpr,0,0);build()
    }

    function build(){
      const count=Math.max(18,Math.floor((W*H)/32000))
      nodes=Array.from({length:count},(_,i)=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:2+Math.random()*2.5,label:ML_LABELS[i%ML_LABELS.length],alpha:.18+Math.random()*.45,pulse:Math.random()*Math.PI*2,pulseSpeed:.01+Math.random()*.018,color:Math.floor(Math.random()*COLORS.length)}))
      const bw=Math.min(W*.32,340),bx0=W-bw-W*.03,by0=H*.68,maxHA=H*.22,maxHB=H*.14,gw=bw/14
      barGroups=Array.from({length:14},(_,i)=>{const gx=bx0+i*gw,bwb=gw*.28,p=gw*.06;return{a:{x:gx+p,w:bwb,baseH:30+Math.random()*maxHA,phase:Math.random()*Math.PI*2,speed:.005+Math.random()*.007,alpha:.12+Math.random()*.08,floorY:by0},b:{x:gx+p+bwb+p,w:bwb,baseH:20+Math.random()*maxHB,phase:Math.random()*Math.PI*2,speed:.005+Math.random()*.007,alpha:.07+Math.random()*.05,floorY:by0}}})
      scatter=Array.from({length:45},()=>({x:W*.04+Math.random()*W*.26,y:H*.12+Math.random()*H*.55,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.14,r:1.2+Math.random()*2.2,alpha:.25+Math.random()*.4,group:Math.floor(Math.random()*3)}))
      linePts=Array.from({length:32},()=>({phase:Math.random()*Math.PI*2,speed:.003+Math.random()*.005,base:.28+Math.random()*.38,amp:.04+Math.random()*.1}))
    }

    function barTop(bar:Bar){const h=bar.baseH+Math.sin(bar.phase+t*bar.speed*60)*bar.baseH*.08;return{y:bar.floorY-h,h,cx:bar.x+bar.w/2}}

    function catmull(pts:{x:number;y:number}[],a:number,lw:number,ci:number){
      if(pts.length<2)return
      ctx.strokeStyle=ci>=0?gc(ci,a):gold(a);ctx.lineWidth=lw;ctx.lineJoin='round';ctx.lineCap='round';ctx.setLineDash([])
      ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y)
      for(let i=0;i<pts.length-1;i++){const p0=pts[Math.max(i-1,0)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(i+2,pts.length-1)],ten=.5,cp1x=p1.x+(p2.x-p0.x)*ten/3,cp1y=p1.y+(p2.y-p0.y)*ten/3,cp2x=p2.x-(p3.x-p1.x)*ten/3,cp2y=p2.y-(p3.y-p1.y)*ten/3;ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,p2.x,p2.y)}
      ctx.stroke()
    }

    function drawAxes(){
      ctx.setLineDash([2,10])
      for(let i=0;i<5;i++){ctx.strokeStyle=slate(.035+i*.006);ctx.lineWidth=.35;ctx.beginPath();ctx.moveTo(0,H*(.15+i*.16));ctx.lineTo(W,H*(.15+i*.16));ctx.stroke()}
      for(let j=0;j<7;j++){ctx.strokeStyle=slate(.028);ctx.lineWidth=.28;ctx.beginPath();ctx.moveTo(W*(.08+j*.13),0);ctx.lineTo(W*(.08+j*.13),H);ctx.stroke()}
      ctx.setLineDash([])
    }

    function drawBars(){
      for(const g of barGroups){
        for(const[bar,isA]of[[g.a,true],[g.b,false]]as[Bar,boolean][]){
          const{y,h}=barTop(bar),ci=isA?0:2
          const gr=ctx.createLinearGradient(bar.x,y,bar.x,bar.floorY)
          gr.addColorStop(0,gc(ci,bar.alpha+(isA?.1:.04)));gr.addColorStop(.6,gc(ci,bar.alpha*.3));gr.addColorStop(1,gc(ci,0))
          ctx.fillStyle=gr;ctx.fillRect(bar.x,y,bar.w,h)
          ctx.strokeStyle=gc(ci,bar.alpha+(isA?.2:.08));ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(bar.x,y);ctx.lineTo(bar.x+bar.w,y);ctx.stroke()
        }
      }
      const pA=barGroups.map(g=>{const{y,cx}=barTop(g.a);return{x:cx,y}})
      const pB=barGroups.map(g=>{const{y,cx}=barTop(g.b);return{x:cx,y}})
      catmull(pA,.38,1.1,0);catmull(pB,.18,.8,2)
      pA.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fillStyle=gold(.55);ctx.fill()})
      pB.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,1.4,0,Math.PI*2);ctx.fillStyle=gc(2,.3);ctx.fill()})
      ctx.setLineDash([2,5]);ctx.lineWidth=.3
      for(let i=0;i<pA.length;i++){ctx.strokeStyle=gold(.05);ctx.beginPath();ctx.moveTo(pA[i].x,pA[i].y);ctx.lineTo(pB[i].x,pB[i].y);ctx.stroke()}
      ctx.setLineDash([])
    }

    function drawScatter(){
      const GC=[0,4,3]
      for(let g=0;g<3;g++){
        const pts=scatter.filter(p=>p.group===g);if(pts.length<2)continue
        let sX=0,sY=0,sXY=0,sX2=0;pts.forEach(p=>{sX+=p.x;sY+=p.y;sXY+=p.x*p.y;sX2+=p.x*p.x})
        const n=pts.length,sl=(n*sXY-sX*sY)/(n*sX2-sX*sX)||0,ic=(sY-sl*sX)/n
        const xs=pts.map(p=>p.x),x0=Math.min(...xs),x1=Math.max(...xs)
        ctx.strokeStyle=gc(GC[g],.05);ctx.lineWidth=.5;ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(x0,sl*x0+ic);ctx.lineTo(x1,sl*x1+ic);ctx.stroke();ctx.setLineDash([])
      }
      for(const p of scatter){
        p.x+=p.vx;p.y+=p.vy
        if(p.x<W*.01||p.x>W*.32)p.vx*=-1
        if(p.y<H*.08||p.y>H*.72)p.vy*=-1
        ctx.beginPath();ctx.arc(p.x,p.y,p.r+3,0,Math.PI*2);ctx.fillStyle=gc(GC[p.group],.04);ctx.fill()
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=gc(GC[p.group],p.alpha);ctx.fill()
      }
    }

    function drawLine(){
      const ox=W*.05,ow=W*.22,oy=H*.88,oh=H*.11
      const pts=linePts.map((p,i)=>({x:ox+(i/(linePts.length-1))*ow,y:oy-(p.base+Math.sin(p.phase+t*p.speed*60)*p.amp)*oh}))
      const ag=ctx.createLinearGradient(0,oy-oh,0,oy);ag.addColorStop(0,gold(.09));ag.addColorStop(1,gold(0))
      ctx.fillStyle=ag;ctx.beginPath();ctx.moveTo(pts[0].x,oy)
      pts.forEach(pt=>ctx.lineTo(pt.x,pt.y));ctx.lineTo(pts[pts.length-1].x,oy);ctx.closePath();ctx.fill()
      ctx.strokeStyle=gold(.3);ctx.lineWidth=1.1;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y)
      for(let i=1;i<pts.length;i++){const cpx=(pts[i-1].x+pts[i].x)/2;ctx.bezierCurveTo(cpx,pts[i-1].y,cpx,pts[i].y,pts[i].x,pts[i].y)}
      ctx.stroke()
      for(let i=0;i<pts.length;i+=4){ctx.beginPath();ctx.arc(pts[i].x,pts[i].y,1.4,0,Math.PI*2);ctx.fillStyle=gold(.45);ctx.fill()}
    }

    function drawDonut(){
      const cx=W*.85,cy=H*.92,r=Math.min(W,H)*.055,ir=r*.55
      const data=[32,22,18,15,13],cols=[0,2,4,3,5];let sa=-Math.PI/2+donutAngle*.008
      data.forEach((v,i)=>{const sl=(v/100)*Math.PI*2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,sa,sa+sl);ctx.closePath();ctx.fillStyle=gc(cols[i],.1);ctx.fill();ctx.strokeStyle=gc(cols[i],.22);ctx.lineWidth=.7;ctx.stroke();sa+=sl})
      ctx.beginPath();ctx.arc(cx,cy,ir,0,Math.PI*2);ctx.fillStyle='rgba(8,13,26,.95)';ctx.fill();ctx.strokeStyle=gold(.08);ctx.lineWidth=.4;ctx.stroke()
    }

    function drawNodes(){
      pulseTimer++;if(pulseTimer%40===0&&nodes.length>1){const a=Math.floor(Math.random()*nodes.length),b=Math.floor(Math.random()*nodes.length);if(a!==b)pulses.push({from:a,to:b,t:0,speed:.007+Math.random()*.01,color:nodes[a].color});if(pulses.length>20)pulses.splice(0,pulses.length-20)}
      const maxD=Math.min(W,H)*.17
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.hypot(dx,dy);if(d<maxD){ctx.strokeStyle=gold((1-d/maxD)*.04);ctx.lineWidth=.35;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke()}}
      for(let i=pulses.length-1;i>=0;i--){const p=pulses[i];p.t+=p.speed;if(p.t>=1){pulses.splice(i,1);continue}const na=nodes[p.from],nb=nodes[p.to],px=na.x+(nb.x-na.x)*p.t,py=na.y+(nb.y-na.y)*p.t;const[r,g,b]=COLORS[p.color];const grad=ctx.createRadialGradient(px,py,0,px,py,7);grad.addColorStop(0,`rgba(${r},${g},${b},.9)`);grad.addColorStop(1,`rgba(${r},${g},${b},0)`);ctx.beginPath();ctx.arc(px,py,7,0,Math.PI*2);ctx.fillStyle=grad;ctx.fill()}
      for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;n.pulse+=n.pulseSpeed;const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);if(d<100){n.x+=(dx/d)*1.2;n.y+=(dy/d)*1.2}const pA=.5+.5*Math.sin(n.pulse);ctx.beginPath();ctx.arc(n.x,n.y,n.r+4,0,Math.PI*2);ctx.fillStyle=gc(n.color,.05*pA);ctx.fill();ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=gc(n.color,n.alpha*(.7+.3*pA));ctx.fill();if(n.color===0&&n.alpha*pA>.25){ctx.font='9px DM Sans,sans-serif';ctx.fillStyle=gold(n.alpha*pA*.48);ctx.textAlign='center';ctx.fillText(n.label,n.x,n.y-n.r-4)}}
      let closest:Node|null=null,closestD=90;for(const n of nodes){const d=Math.hypot(n.x-mouse.x,n.y-mouse.y);if(d<closestD){closestD=d;closest=n}}
      if(closest){ctx.beginPath();ctx.arc(closest.x,closest.y,closest.r+7,0,Math.PI*2);ctx.strokeStyle=gc(closest.color,.7);ctx.lineWidth=1;ctx.stroke();ctx.font='bold 10px DM Sans,sans-serif';ctx.fillStyle=gc(closest.color,.9);ctx.textAlign='center';ctx.fillText(closest.label,closest.x,closest.y-closest.r-8)}
    }

    function draw(){t+=.016;donutAngle+=.6;ctx.clearRect(0,0,W,H);drawAxes();drawBars();drawScatter();drawLine();drawDonut();drawNodes();rafId=requestAnimationFrame(draw)}

    window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY})
    let rTimer:any;window.addEventListener('resize',()=>{clearTimeout(rTimer);rTimer=setTimeout(resize,100)})
    resize();rafId=requestAnimationFrame(draw)
    return()=>cancelAnimationFrame(rafId)
  },[])

  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,opacity:.9}} />
}