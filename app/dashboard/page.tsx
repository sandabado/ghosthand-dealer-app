"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PrototypeShell } from "@/components/PrototypeShell";
import { AnomalyDetail, Drawer, Toast, downloadText } from "@/components/PrototypeUI";
import { activity, anomalies as sourceAnomalies, roleMetrics, type Anomaly, type Department } from "@/lib/mock-data";

export default function Dashboard() {
  const [role,setRole]=useState("Dealer Principal");
  const [filter,setFilter]=useState<"all"|Department>("all");
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState<"impact"|"department">("impact");
  const [page,setPage]=useState(0);
  const [selected,setSelected]=useState<Anomaly|null>(null);
  const [drawer,setDrawer]=useState(false);
  const [notice,setNotice]=useState("");
  const [resolved,setResolved]=useState<string[]>([]);
  useEffect(()=>{const sync=()=>setRole(localStorage.getItem("gh-role")||"Dealer Principal");sync();window.addEventListener("gh-role",sync);setResolved(JSON.parse(localStorage.getItem("gh-resolved")||"[]"));return()=>window.removeEventListener("gh-role",sync)},[]);
  const list=useMemo(()=>sourceAnomalies.filter(a=>(filter==="all"||a.department===filter)&&(`${a.title} ${a.department}`.toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>sort==="department"?a.department.localeCompare(b.department):b.deviation-a.deviation),[filter,search,sort]);
  const metrics=roleMetrics[role]||roleMetrics["Dealer Principal"];
  function action(status:string){if(selected&&status==="resolved"){const next=[...resolved,selected.id];setResolved(next);localStorage.setItem("gh-resolved",JSON.stringify(next))}setNotice(`${selected?.id} marked ${status}.`);setSelected(null);setTimeout(()=>setNotice(""),2400)}
  function exportCsv(){downloadText("ghost-hand-anomalies.csv",["ID,Department,Anomaly,Deviation,Impact,Status",...list.map(a=>`${a.id},${a.department},\"${a.title}\",${a.deviation}%,${a.impact},${resolved.includes(a.id)?"resolved":a.status}`)].join("\n"),"text/csv");setNotice("Anomaly export downloaded.");setTimeout(()=>setNotice(""),2200)}
  return <PrototypeShell eyebrow="LIVE INTELLIGENCE" title={`Good morning, ${role==="Dealer Principal"?"Ken":role}.`} description="Here’s what changed across your dealership—and what needs a decision." actions={<><select className="proto-select" aria-label="Date range"><option>Last 30 days</option><option>Last 7 days</option><option>Quarter to date</option></select><button className="proto-btn ghost" onClick={exportCsv}>Export ↓</button><button className="proto-btn dark" onClick={()=>setDrawer(true)}>Generate report →</button></>}>
    <Toast message={notice}/>
    <div className="proto-kpis">{metrics.map(([label,value,delta])=><article key={label}><span>{label}</span><b>{value}</b><small>{delta}</small></article>)}</div>
    <div className="proto-insight"><i>✦</i><div><span>GHOST HAND INSIGHT</span><b>Revenue-impacting anomalies are down 22% since last Monday.</b><p>Service capacity remains the largest unresolved opportunity. <Link href="/journeys/anomaly-detection">Investigate now →</Link></p></div></div>
    <div className="dash-charts">
      <article className="proto-panel activity-panel"><div className="proto-panel-head"><div><span>EXPORT ACTIVITY</span><h2>Last 30 days</h2></div><b>672 today · +18%</b></div><div className="bar-spark" title="Click any day to drill down">{activity.map((v,i)=><button key={i} style={{height:`${v/7}%`}} aria-label={`Day ${i+1}: ${v} exports`} onClick={()=>setNotice(`Day ${i+1}: ${v} exports, ${i%4} anomalies.`)}/>)}</div><div className="axis-labels"><span>JUL 1</span><span>JUL 10</span><span>JUL 20</span><span>JUL 30</span></div></article>
      <article className="proto-panel dept-chart"><div className="proto-panel-head"><div><span>DEPARTMENT SIGNALS</span><h2>Anomalies by department</h2></div></div>{[["Service",8,72],["Parts",5,48],["Sales",4,38]].map(([name,count,width])=><button key={name} onClick={()=>setFilter(name.toString().toLowerCase() as Department)}><span>{name}</span><i><em style={{width:`${width}%`}}/></i><b>{count}</b></button>)}<button className="proto-text-btn" onClick={()=>setFilter("all")}>Reset department filter →</button></article>
    </div>
    <article className="proto-panel anomaly-table-wrap">
      <div className="table-tools"><div><span>AUTOMATED DETECTION</span><h2>Recent anomalies</h2></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anomalies…" aria-label="Search anomalies"/><div className="filter-pills">{(["all","sales","service","parts"] as const).map(f=><button className={filter===f?"active":""} onClick={()=>{setFilter(f);setPage(0)}} key={f}>{f}</button>)}</div></div>
      <div className="table-scroll"><table className="proto-table"><thead><tr><th>Time</th><th><button onClick={()=>setSort("department")}>Department ↕</button></th><th>Signal</th><th>Deviation</th><th>Impact</th><th>Status</th><th>Action</th></tr></thead><tbody>{list.slice(page*5,page*5+5).map(a=><tr key={a.id} onClick={()=>setSelected(a)} tabIndex={0} onKeyDown={e=>e.key==="Enter"&&setSelected(a)}><td>{a.time}</td><td><span className={`dept ${a.department}`}>{a.department}</span></td><td><b>{a.title}</b><small>{a.value}</small></td><td className={a.deviation>0?"positive":"negative"}>{a.deviation>0?"+":""}{a.deviation}%</td><td><span className={`impact ${a.impact}`}>{a.impact}</span></td><td>{resolved.includes(a.id)?"resolved":a.status}</td><td><button aria-label={`Investigate ${a.title}`}>Investigate →</button></td></tr>)}</tbody></table></div>
      <div className="pagination"><span>Showing {page*5+1}–{Math.min(page*5+5,list.length)} of {list.length}</span><div><button disabled={page===0} onClick={()=>setPage(p=>p-1)}>←</button><button disabled={(page+1)*5>=list.length} onClick={()=>setPage(p=>p+1)}>→</button></div></div>
    </article>
    <div className="dashboard-bottom"><div><span>◷</span><b>4h 29m recovered</b><small>Estimated analyst time returned this week</small></div><Link href="/journeys/cross-dept-clarity">See cross-department flow →</Link></div>
    <AnomalyDetail anomaly={selected} onClose={()=>setSelected(null)} onAction={action}/>
    <Drawer open={drawer} onClose={()=>setDrawer(false)} label="Generate report"><div className="modal-kicker">REPORT BUILDER</div><h2>Build Ken’s Monday brief.</h2><p>Ghost Hand will combine all 12 connected exports, surface material changes, and format the executive narrative.</p><label className="field">TEMPLATE<select><option>Weekly Executive Summary</option><option>Monthly Performance Review</option></select></label><label className="field">DATE RANGE<select><option>Jul 21–27, 2026</option><option>July 2026</option></select></label><div className="drawer-checks"><label><input type="checkbox" defaultChecked/>KPIs and trends</label><label><input type="checkbox" defaultChecked/>Top anomalies</label><label><input type="checkbox" defaultChecked/>Recommended actions</label></div><Link href="/journeys/executive-reporting" className="proto-btn lime">Continue to report studio →</Link></Drawer>
  </PrototypeShell>
}
