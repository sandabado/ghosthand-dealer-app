"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Modal } from "@/components/PrototypeUI";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandSwitcher } from "@/components/BrandSwitcher";

const HeroScene = dynamic(() => import("@/components/HeroScene").then(module => module.HeroScene), {
  ssr: false,
  loading: () => <div className="telemetry-scene"><div className="telemetry-static" aria-hidden="true"><i/><i/><i/><span/><span/><span/><span/></div></div>,
});

const features = [
  { number:"01", title:"Cross-department clarity", body:"Sales, service, and parts exports become one connected operating picture.", metric:"34% more cross-sell", href:"/journeys/cross-dept-clarity", bars:[42,70,55,88] },
  { number:"02", title:"Signal, not spreadsheets", body:"Anomalies and missed opportunities surface automatically, with context.", metric:"7 live anomalies", href:"/journeys/anomaly-detection", bars:[26,38,84,48] },
  { number:"03", title:"Ready before Monday", body:"A repeatable executive report in minutes—not half a day of manual work.", metric:"47% faster reporting", href:"/journeys/executive-reporting", bars:[78,60,88,96] },
];
export default function Home() {
  const [demo,setDemo]=useState(false);
  return <main className="landing landing-v2">
    <nav className="site-nav">
      <BrandLogo href="/" />
      <div className="nav-links"><Link href="/dashboard">Dashboard</Link><Link href="/journeys/anomaly-detection">Journeys</Link><Link href="/settings">Integrations</Link><BrandSwitcher compact /><button onClick={()=>setDemo(true)} className="button button-small button-ghost">Request demo <span>↗</span></button></div>
    </nav>
    <section className="hero hero-v2">
      <HeroScene />
      <div className="hero-copy">
        <div className="eyebrow"><i/>GHOST HAND INTELLIGENCE · TELEMETRY ACTIVE</div>
        <h1>See what<br/>your DMS is<br/><em>not telling you.</em></h1>
        <p>Ghost Hand connects the exports your teams already use—then turns them into the decisions you should make next.</p>
        <div className="hero-actions"><Link href="/dashboard" className="button button-light">View dashboard <span>→</span></Link><button onClick={()=>setDemo(true)} className="text-link hero-demo-link">Request demo ↗</button></div>
      </div>
      <div className="hero-intel-card"><span>ACTIVE INTELLIGENCE</span><b>Margin momentum +18%</b><small>911 mix and F&amp;I penetration are driving the change.</small><Link href="/journeys/anomaly-detection">OPEN SIGNAL →</Link></div>
    </section>
    <section className="proof-strip"><span>THE MANUAL WAY</span><b>4.5 hours</b><i/><span>WITH GHOST HAND</span><b>2m 34s</b><span className="time-back">TIME, RETURNED.</span></section>
    <section className="feature-section" id="capabilities"><div className="section-kicker">CHOOSE A STORY TO EXPLORE</div><div className="feature-grid feature-links">{features.map(f=><Link href={f.href} key={f.number}><article><div className="feature-top"><span>{f.number}</span><b>{f.metric}</b></div><div className="feature-viz">{f.bars.map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><h2>{f.title}</h2><p>{f.body}</p><strong>EXPLORE JOURNEY →</strong></article></Link>)}</div></section>
    <section className="landing-close"><div><span>DEMO PATH · 8 MINUTES</span><h2>Discovery to decision,<br/>without leaving the room.</h2></div><Link href="/onboarding/step-1" className="button button-light">Start guided setup <span>→</span></Link></section>
    <footer><BrandLogo /><p>Private prototype · Sample data only</p></footer>
    <Modal open={demo} onClose={()=>setDemo(false)} label="Request demo"><div className="modal-kicker">PRIVATE WALKTHROUGH</div><h2>See your dealership’s blind spots.</h2><p>Choose a 30-minute working session. We’ll map the exports you already use and show where Ghost Hand can return time and margin.</p><label className="field">WORK EMAIL<input type="email" placeholder="ken@dealer.com"/></label><label className="field">DEALERSHIP<input placeholder="Porsche Centre"/></label><button className="proto-btn lime" onClick={()=>setDemo(false)}>Request walkthrough →</button></Modal>
  </main>
}
