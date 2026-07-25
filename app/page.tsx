"use client";

import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/PrototypeUI";

const features = [
  { number:"01", title:"Cross-department clarity", body:"Sales, service, and parts exports become one connected operating picture.", metric:"34% more cross-sell", href:"/journeys/cross-dept-clarity", bars:[42,70,55,88] },
  { number:"02", title:"Signal, not spreadsheets", body:"Anomalies and missed opportunities surface automatically, with context.", metric:"7 live anomalies", href:"/journeys/anomaly-detection", bars:[26,38,84,48] },
  { number:"03", title:"Ready before Monday", body:"A repeatable executive report in minutes—not half a day of manual work.", metric:"47% faster reporting", href:"/journeys/executive-reporting", bars:[78,60,88,96] },
];
const points = [{x:55,y:305,v:"$278K · Feb"},{x:145,y:292,v:"$306K · Mar"},{x:235,y:274,v:"$351K · Apr"},{x:325,y:230,v:"$388K · May"},{x:415,y:184,v:"$431K · Jun"},{x:525,y:92,v:"$472K · Jul"}];

export default function Home() {
  const [demo,setDemo]=useState(false);
  const [tip,setTip]=useState("");
  return <main className="landing landing-v2">
    <nav className="site-nav">
      <Link href="/" className="wordmark"><span>GH</span> Ghost Hand Intelligence</Link>
      <div className="nav-links"><Link href="/dashboard">Dashboard</Link><Link href="/journeys/anomaly-detection">Journeys</Link><Link href="/settings">Integrations</Link><button onClick={()=>setDemo(true)} className="button button-small button-ghost">Request demo <span>↗</span></button></div>
    </nav>
    <section className="hero hero-v2">
      <div className="hero-copy">
        <div className="eyebrow"><i/>PORSCHE DMS INTELLIGENCE · LIVE PROTOTYPE</div>
        <h1>See what<br/>your DMS is<br/><em>not telling you.</em></h1>
        <p>Ghost Hand connects the exports your teams already use—then turns them into the decisions you should make next.</p>
        <div className="hero-actions"><Link href="/dashboard" className="button button-light">View dashboard <span>→</span></Link><Link href="/journeys/anomaly-detection" className="text-link">Watch intelligence work ↗</Link></div>
      </div>
      <div className="motion-chart" aria-label="Animated gross profit intelligence chart">
        <div className="signal-top"><span>GROSS PROFIT SIGNAL · 6 MONTHS</span><span className="pulse">● LIVE</span></div>
        <svg viewBox="0 0 580 360" role="img">
          <defs><linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9ff43" stopOpacity=".3"/><stop offset="1" stopColor="#d9ff43" stopOpacity="0"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          {[60,120,180,240,300].map(y=><line key={y} x1="20" x2="560" y1={y} y2={y} className="gridline"/>)}{[100,190,280,370,460,550].map(x=><line key={x} x1={x} x2={x} y1="35" y2="330" className="gridline vertical"/>)}
          <path className="hero-area" d="M25 320 C95 310 110 285 155 292 S220 294 245 270 S300 249 335 225 S398 205 425 180 S495 135 535 85 L535 330 L25 330Z"/>
          <path className="hero-line" d="M25 320 C95 310 110 285 155 292 S220 294 245 270 S300 249 335 225 S398 205 425 180 S495 135 535 85"/>
          {points.map((p,i)=><g key={p.x} className={`hero-point point-${i}`} onMouseEnter={()=>setTip(p.v)} onMouseLeave={()=>setTip("")} tabIndex={0} onFocus={()=>setTip(p.v)} onBlur={()=>setTip("")}><circle cx={p.x} cy={p.y} r={i===5?8:5}/><circle className="point-ring" cx={p.x} cy={p.y} r={i===5?15:10}/></g>)}
        </svg>
        {tip&&<div className="chart-tip">{tip}</div>}
        <div className="chart-callout"><span>GHOST HAND SIGNAL</span><b>Momentum is 18% above baseline.</b><small>911 margin and F&amp;I penetration are driving the change.</small></div>
      </div>
    </section>
    <section className="proof-strip"><span>THE MANUAL WAY</span><b>4.5 hours</b><i/><span>WITH GHOST HAND</span><b>2m 34s</b><span className="time-back">TIME, RETURNED.</span></section>
    <section className="feature-section" id="capabilities"><div className="section-kicker">CHOOSE A STORY TO EXPLORE</div><div className="feature-grid feature-links">{features.map(f=><Link href={f.href} key={f.number}><article><div className="feature-top"><span>{f.number}</span><b>{f.metric}</b></div><div className="feature-viz">{f.bars.map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><h2>{f.title}</h2><p>{f.body}</p><strong>EXPLORE JOURNEY →</strong></article></Link>)}</div></section>
    <section className="landing-close"><div><span>DEMO PATH · 8 MINUTES</span><h2>Discovery to decision,<br/>without leaving the room.</h2></div><Link href="/onboarding/step-1" className="button button-light">Start guided setup <span>→</span></Link></section>
    <footer><div className="wordmark"><span>GH</span> Ghost Hand Studios</div><p>Private prototype · Sample data only</p></footer>
    <Modal open={demo} onClose={()=>setDemo(false)} label="Request demo"><div className="modal-kicker">PRIVATE WALKTHROUGH</div><h2>See your dealership’s blind spots.</h2><p>Choose a 30-minute working session. We’ll map the exports you already use and show where Ghost Hand can return time and margin.</p><label className="field">WORK EMAIL<input type="email" placeholder="ken@dealer.com"/></label><label className="field">DEALERSHIP<input placeholder="Porsche Centre"/></label><button className="proto-btn lime" onClick={()=>setDemo(false)}>Request walkthrough →</button></Modal>
  </main>
}
