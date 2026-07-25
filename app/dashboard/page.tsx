"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const trend = [278, 306, 298, 351, 388, 472];
const advisors = [
  { name: "Michael R.", value: 19.8, units: 7 },
  { name: "James K.", value: 18.2, units: 6 },
  { name: "Priya S.", value: 16.9, units: 5 },
  { name: "Sarah L.", value: 14.2, units: 6 },
];
const service = [
  { week: "W1", labor: 68, parts: 32 }, { week: "W2", labor: 61, parts: 39 },
  { week: "W3", labor: 66, parts: 34 }, { week: "W4", labor: 59, parts: 41 },
];

function Sparkline() {
  return <svg className="sparkline" viewBox="0 0 540 190" preserveAspectRatio="none" aria-label="Gross profit increased from February to July">
    <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9ff43" stopOpacity=".3"/><stop offset="1" stopColor="#d9ff43" stopOpacity="0"/></linearGradient></defs>
    <path d="M0 163 C45 145 55 121 105 132 S170 146 213 112 S270 91 322 96 S385 65 430 74 S490 30 540 19 L540 190 L0 190Z" fill="url(#fill)"/>
    <path d="M0 163 C45 145 55 121 105 132 S170 146 213 112 S270 91 322 96 S385 65 430 74 S490 30 540 19" fill="none" stroke="#d9ff43" strokeWidth="3"/>
    <circle cx="540" cy="19" r="6" fill="#d9ff43"/>
  </svg>;
}

export default function Dashboard() {
  const [recovery, setRecovery] = useState(15);
  const [range, setRange] = useState("Jul 1–31, 2026");
  const [notice, setNotice] = useState("");
  const recovered = useMemo(() => Math.round(5827 * recovery / 100) * 100, [recovery]);

  function exportReport() {
    const rows = ["Metric,Value","Monthly Gross Profit,$472350","Units Sold,28","CSI Score,4.7","Technician Efficiency,82%"];
    const blob = new Blob([rows.join("\n")], {type: "text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "ghost-hand-july-report.csv"; a.click();
    URL.revokeObjectURL(url); setNotice("Executive report exported.");
    setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main className="dashboard">
      {notice && <div className="toast">✓ {notice}</div>}
      <aside className="sidebar">
        <Link href="/" className="wordmark"><span>GH</span><b>GHOST HAND</b></Link>
        <div className="dealer"><i>PC</i><div><b>Porsche Centre</b><span>Demo workspace</span></div><em>⌄</em></div>
        <nav>
          <Link href="/dashboard" className="active"><span>⌁</span>Overview</Link>
          <a href="#performance"><span>↗</span>Sales</a>
          <a href="#service"><span>⌘</span>Service</a>
          <a href="#parts"><span>▦</span>Parts</a>
          <small>INTELLIGENCE</small>
          <a href="#alerts"><span>◇</span>Anomalies <b>3</b></a>
          <a href="#forecast"><span>◫</span>Forecast</a>
          <small>WORKSPACE</small>
          <Link href="/upload"><span>⇧</span>Data imports</Link>
          <a href="#settings"><span>⚙</span>Settings</a>
        </nav>
        <div className="sidebar-foot"><i /><div><b>Demo data active</b><span>Last sync · 8 sec ago</span></div></div>
      </aside>

      <section className="dash-body">
        <header className="dash-header">
          <div><div className="eyebrow"><i /> LIVE INTELLIGENCE</div><h1>Good morning, Ken.</h1><p>Here’s what changed across your dealership this month.</p></div>
          <div className="header-actions">
            <select value={range} onChange={e => setRange(e.target.value)} aria-label="Date range">
              <option>Jul 1–31, 2026</option><option>Jun 1–30, 2026</option><option>Last 90 days</option>
            </select>
            <button className="button button-dark" onClick={exportReport}>Export report ↓</button>
          </div>
        </header>

        <div className="kpi-grid">
          {[
            ["MONTHLY GROSS PROFIT", "$472,350", "↗ 12.4%", "vs. prior month", "up"],
            ["UNITS SOLD", "28", "↗ 3 units", "vs. prior month", "up"],
            ["CSI SCORE", "4.7", "↘ 0.1", "needs attention", "down"],
            ["TECHNICIAN EFFICIENCY", "82%", "↗ 4.2%", "vs. target: 88%", "up"],
          ].map(([label,value,delta,note,tone]) => <article className="kpi" key={label}><span>{label}</span><strong>{value}</strong><div className={tone}>{delta} <i>{note}</i></div><b className="kpi-glyph">{tone === "down" ? "⌄" : "⌁"}</b></article>)}
        </div>

        <div className="insight-banner">
          <div className="insight-icon">✦</div><div><span>GHOST HAND INSIGHT</span><b>Gross profit is pacing 18% above your 6-month average.</b><p>Driven by stronger 911 margins and improved F&amp;I penetration. <button onClick={() => document.getElementById("performance")?.scrollIntoView({behavior:"smooth"})}>View drivers →</button></p></div>
          <button aria-label="Dismiss insight" onClick={e => e.currentTarget.parentElement?.remove()}>×</button>
        </div>

        <div className="main-grid" id="performance">
          <article className="panel trend-panel">
            <div className="panel-head"><div><span>PERFORMANCE</span><h2>Gross profit trend</h2></div><span>6 MONTHS</span></div>
            <div className="chart-total"><strong>$472.4k</strong><span>JUL 2026</span></div>
            <div className="trend-chart"><Sparkline /><div className="y-axis"><span>$500k</span><span>$400k</span><span>$300k</span><span>$200k</span></div></div>
            <div className="month-row">{["FEB","MAR","APR","MAY","JUN","JUL"].map((m,i)=><span key={m}><b>${trend[i]}k</b>{m}</span>)}</div>
          </article>

          <article className="panel advisor-panel">
            <div className="panel-head"><div><span>SALES TEAM</span><h2>Advisor ranking</h2></div><button>AVG GROSS ↕</button></div>
            <div className="benchmark"><span>TEAM AVERAGE</span><b>$16,850</b></div>
            <div className="advisor-list">{advisors.map((a,i)=><div className={i===3?"warning":""} key={a.name}><span className="rank">0{i+1}</span><b>{a.name}<small>{a.units} units sold</small></b><i><em style={{width:`${a.value/20*100}%`}} /></i><strong>${a.value.toFixed(1)}k</strong>{i===3&&<span className="flag">!</span>}</div>)}</div>
            <button className="panel-link">View advisor details →</button>
          </article>
        </div>

        <div className="secondary-grid">
          <article className="panel heatmap-panel" id="parts">
            <div className="panel-head"><div><span>MARGIN INTELLIGENCE</span><h2>Model margin distribution</h2></div><button>•••</button></div>
            <div className="heatmap">
              {[
                ["911","22.4","hot"],["Taycan","18.7","lime"],["Cayenne","15.2","mid"],
                ["Macan","13.8","low"],["Panamera","17.4","lime"],["718","19.1","lime"]
              ].map(([name,val,tone])=><div className={tone} key={name}><span>{name}</span><b>{val}%</b></div>)}
            </div>
            <div className="legend"><span>LOW</span><i/><i/><i/><i/><span>HIGH</span></div>
          </article>

          <article className="panel service-panel" id="service">
            <div className="panel-head"><div><span>FIXED OPERATIONS</span><h2>Service revenue split</h2></div><button>JULY⌄</button></div>
            <div className="service-chart">{service.map(s=><div key={s.week}><b><i style={{height:`${s.labor}%`}}/><em style={{height:`${s.parts}%`}}/></b><span>{s.week}</span></div>)}</div>
            <div className="service-legend"><span><i className="labor"/>Labor <b>$386k</b></span><span><i className="parts"/>Parts <b>$191k</b></span></div>
          </article>

          <article className="panel anomaly-panel" id="alerts">
            <div className="panel-head"><div><span>AUTOMATED DETECTION</span><h2>Flagged anomalies</h2></div><b>3</b></div>
            {[
              ["HIGH","Taycan gross spiked 23%","Above 90-day baseline · Review recommended","lime"],
              ["MED","Bay utilization below target","82% actual vs. 88% target · $18.4k at risk","amber"],
              ["LOW","Advisor variance detected","Sarah L. is 15.7% below team average","muted"]
            ].map(([sev,title,desc,tone])=><button className="anomaly" key={title}><i className={tone}>{sev}</i><span><b>{title}</b><small>{desc}</small></span><em>→</em></button>)}
            <button className="panel-link">Review all anomalies →</button>
          </article>
        </div>

        <div className="whatif" id="forecast">
          <div><span>WHAT IF CALCULATOR</span><h2>Turn improvement into a number.</h2><p>If advisor turnover decreased by <b>{recovery}%</b>, estimated quarterly recovery:</p></div>
          <div className="slider-wrap"><input type="range" min="0" max="30" value={recovery} onChange={e=>setRecovery(+e.target.value)} aria-label="Advisor turnover decrease" /><div><span>0%</span><span>15%</span><span>30%</span></div></div>
          <strong>${recovered.toLocaleString()}<span>/ QUARTER</span></strong>
        </div>

        <div className="time-counter"><span>◷</span><div><b>4 hours, 29 minutes, 52 seconds</b><small>Estimated analyst time recovered by this report</small></div><i>PROCESSED IN 8 SEC</i></div>
        <footer className="dash-footer"><span>Ghost Hand Intelligence · Prototype 01</span><span>Sample data · No customer information</span></footer>
      </section>
    </main>
  );
}
