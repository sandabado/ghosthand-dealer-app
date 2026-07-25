"use client";

import { useEffect, useState } from "react";
import { PrototypeShell } from "@/components/PrototypeShell";
import { AnomalyDetail, Toast, downloadText } from "@/components/PrototypeUI";
import { anomalies, type Anomaly } from "@/lib/mock-data";

export default function AnomalyJourney(){
  const [feed,setFeed]=useState(anomalies.slice(0,5));const [selected,setSelected]=useState<Anomaly|null>(null);const [notice,setNotice]=useState("");const [pulse,setPulse]=useState(0);
  useEffect(()=>{const timer=setInterval(()=>{setPulse(p=>(p+1)%anomalies.length);setFeed(current=>[anomalies[(pulse+5)%anomalies.length],...current.filter(x=>x.id!==anomalies[(pulse+5)%anomalies.length].id)].slice(0,5))},3000);return()=>clearInterval(timer)},[pulse]);
  function act(status:string){setFeed(f=>f.filter(a=>a.id!==selected?.id));setNotice(`Signal ${status}. Audit trail updated.`);setSelected(null);setTimeout(()=>setNotice(""),2500)}
  return <PrototypeShell eyebrow="JOURNEY 02 · AUTOMATED DETECTION" title="Signal, not spreadsheets." description="Ghost Hand continuously compares actual operating behavior to your dealership’s expected baseline.">
    <Toast message={notice}/>
    <div className="journey-hero-stats"><div><span>SIGNALS PROCESSED TODAY</span><b>14,802</b></div><div><span>ACTIVE ANOMALIES</span><b>7</b></div><div><span>REVENUE IMPACT</span><b>$284K</b></div><i>● LIVE FEED</i></div>
    <div className="anomaly-journey-grid">
      <article className="proto-panel live-feed"><div className="proto-panel-head"><div><span>DETECTED NOW</span><h2>Live anomaly feed</h2></div><i className="live-dot"/></div>{feed.map((a,i)=><button key={`${a.id}-${i}`} onClick={()=>setSelected(a)} className={i===0?"new":""}><i className={a.impact}>!</i><div><span>{a.department} · {a.time}</span><b>{a.title}</b><small>{a.value}</small></div><strong>{Math.min(5,Math.ceil(Math.abs(a.deviation)/30)+2)} / 5</strong><em>→</em></button>)}</article>
      <article className="proto-panel comparison"><div className="proto-panel-head"><div><span>EXPECTED VS ACTUAL</span><h2>Service appointments</h2></div><b>−23%</b></div><div className="compare-chart"><div className="compare-legend"><span><i/>Expected</span><span><i/>Actual</span></div><svg viewBox="0 0 500 240"><path d="M10 190 C80 170 100 145 160 150 S260 110 330 95 S420 74 490 45" className="expected-line"/><path d="M10 190 C80 170 100 145 160 150 S250 125 320 135 S410 155 490 180" className="actual-line"/><path d="M300 103 C370 82 430 65 490 45 L490 180 C420 155 370 143 300 128Z" className="divergence"/></svg><div className="divergence-label">DIVERGENCE BEGAN · JUL 22</div></div><p>Afternoon maintenance appointments fell below forecast after reminder confirmations were paused.</p><button className="proto-btn ghost" onClick={()=>downloadText("service-anomaly-comparison.txt","Ghost Hand Comparison\nExpected: 45 appointments\nActual: 35 appointments\nDeviation: -23%")}>Download comparison ↓</button></article>
    </div>
    <section className="action-log"><div><span>WHAT THE DMS SHOWS</span><b>35 appointments</b><small>A number without context.</small></div><i>→</i><div className="highlight"><span>WHAT GHOST HAND SHOWS</span><b>$38.4K at risk</b><small>Cause, impact, and the next best action.</small></div></section>
    <AnomalyDetail anomaly={selected} onClose={()=>setSelected(null)} onAction={act}/>
  </PrototypeShell>
}
