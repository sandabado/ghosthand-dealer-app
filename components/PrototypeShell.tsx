"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandSwitcher } from "@/components/BrandSwitcher";
import { GuardianBadge } from "@/components/GuardianBadge";

const roles = ["Dealer Principal","General Manager","Sales Manager","Service Manager","Parts Manager","Advisor"];

export function PrototypeShell({children, title, eyebrow, description, actions}:{
  children:ReactNode; title:string; eyebrow:string; description?:string; actions?:ReactNode;
}) {
  const pathname = usePathname();
  const [role,setRole] = useState("Dealer Principal");
  const [mobile,setMobile] = useState(false);
  useEffect(()=>{ queueMicrotask(()=>setRole(localStorage.getItem("gh-role") || "Dealer Principal")); },[]);
  function updateRole(next:string){setRole(next);localStorage.setItem("gh-role",next);window.dispatchEvent(new Event("gh-role"))}
  const links = [
    ["/dashboard","Overview","⌁"],["/journeys/anomaly-detection","Anomalies","◇"],["/journeys/executive-reporting","Reports","◫"],
    ["/journeys/cross-dept-clarity","Connections","↔"],["/departments/sales","Sales","↗"],["/departments/service","Service","⌘"],
    ["/departments/parts","Parts","▦"],["/advisors","Advisors","◎"],["/upload","Data imports","⇧"],["/settings","Settings","⚙"],
    ["/onboarding/step-1","Presentation","▶"],
  ];
  return <main className="proto-app">
    <aside className={`proto-sidebar ${mobile?"open":""}`}>
      <BrandLogo href="/" />
      <div className="proto-workspace"><i>PC</i><div><b>Porsche Centre</b><span>Demo workspace</span></div></div>
      <nav>{links.map(([href,label,icon])=><Link key={href} href={href} className={pathname===href?"active":""} onClick={()=>setMobile(false)}><span>{icon}</span>{label}{label==="Anomalies"&&<b>7</b>}</Link>)}</nav>
      <div className="sidebar-brand-switch"><BrandSwitcher /></div>
      <div className="role-switch"><span>CURRENT VIEW</span><select aria-label="Current role view" value={role} onChange={e=>updateRole(e.target.value)}>{roles.map(r=><option key={r}>{r}</option>)}</select></div>
      <Link href="/guardian" className="sidebar-guardian" onClick={()=>setMobile(false)}><GuardianBadge compact /></Link>
      <div className="proto-status"><i/><div><b>Live sync healthy</b><span>Last verified · 8 sec ago</span></div></div>
    </aside>
    <section className="proto-main">
      <div className="proto-mobilebar"><button onClick={()=>setMobile(v=>!v)} aria-label="Toggle navigation">☰</button><BrandLogo href="/" compact /></div>
      <header className="proto-header"><div><div className="eyebrow"><i/>{eyebrow}</div><h1>{title}</h1>{description&&<p>{description}</p>}</div>{actions&&<div className="proto-actions">{actions}</div>}</header>
      {children}
      <footer className="proto-footer"><span>Ghost Hand Intelligence · Prototype 03</span><span>Guardian verified · Sample data only</span></footer>
    </section>
  </main>
}
