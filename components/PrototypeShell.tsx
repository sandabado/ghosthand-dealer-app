"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const roles = ["Dealer Principal","General Manager","Sales Manager","Service Manager","Parts Manager","Advisor"];

export function PrototypeShell({children, title, eyebrow, description, actions}:{
  children:ReactNode; title:string; eyebrow:string; description?:string; actions?:ReactNode;
}) {
  const pathname = usePathname();
  const [role,setRole] = useState("Dealer Principal");
  const [mobile,setMobile] = useState(false);
  useEffect(()=>{ setRole(localStorage.getItem("gh-role") || "Dealer Principal"); },[]);
  function updateRole(next:string){setRole(next);localStorage.setItem("gh-role",next);window.dispatchEvent(new Event("gh-role"))}
  const links = [
    ["/dashboard","Overview","⌁"],["/journeys/anomaly-detection","Anomalies","◇"],["/journeys/executive-reporting","Reports","◫"],
    ["/journeys/cross-dept-clarity","Connections","↔"],["/departments/sales","Sales","↗"],["/departments/service","Service","⌘"],
    ["/departments/parts","Parts","▦"],["/advisors","Advisors","◎"],["/upload","Data imports","⇧"],["/settings","Settings","⚙"],
  ];
  return <main className="proto-app">
    <aside className={`proto-sidebar ${mobile?"open":""}`}>
      <Link href="/" className="wordmark"><span>GH</span><b>GHOST HAND</b></Link>
      <div className="proto-workspace"><i>PC</i><div><b>Porsche Centre</b><span>Demo workspace</span></div></div>
      <nav>{links.map(([href,label,icon])=><Link key={href} href={href} className={pathname===href?"active":""} onClick={()=>setMobile(false)}><span>{icon}</span>{label}{label==="Anomalies"&&<b>7</b>}</Link>)}</nav>
      <div className="role-switch"><span>CURRENT VIEW</span><select aria-label="Current role view" value={role} onChange={e=>updateRole(e.target.value)}>{roles.map(r=><option key={r}>{r}</option>)}</select></div>
      <div className="proto-status"><i/><div><b>Demo data active</b><span>Last sync · 8 sec ago</span></div></div>
    </aside>
    <section className="proto-main">
      <div className="proto-mobilebar"><button onClick={()=>setMobile(v=>!v)} aria-label="Toggle navigation">☰</button><div className="wordmark"><span>GH</span> GHOST HAND</div></div>
      <header className="proto-header"><div><div className="eyebrow"><i/>{eyebrow}</div><h1>{title}</h1>{description&&<p>{description}</p>}</div>{actions&&<div className="proto-actions">{actions}</div>}</header>
      {children}
      <footer className="proto-footer"><span>Ghost Hand Intelligence · Prototype 02</span><span>Sample data · No customer information</span></footer>
    </section>
  </main>
}
