"use client";

import { Activity, DatabaseZap, FileClock, KeyRound, ShieldCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { GuardianBadge } from "@/components/GuardianBadge";
import { PrototypeShell } from "@/components/PrototypeShell";
import { Toast } from "@/components/PrototypeUI";

const integrityMetrics = [
  { label: "Data Freshness", value: "99.2%", detail: "All critical feeds under 8 min", status: "healthy", icon: Activity },
  { label: "Sync Reliability", value: "47/48 hours", detail: "1 delayed workshop export", status: "warning", icon: DatabaseZap },
  { label: "Anomaly Confidence", value: "94% verified", detail: "7 signals cross-validated", status: "healthy", icon: ShieldCheck },
  { label: "API Quota Usage", value: "67%", detail: "161K requests remain", status: "normal", icon: KeyRound },
];

const connections = [
  { source: "CROSS3", scope: "Sales · Service · Parts", state: "Authenticated", freshness: "2 min", reliability: "99.9%" },
  { source: "Porsche PIWIS", scope: "Diagnostics · Workshop", state: "Authenticated", freshness: "6 min", reliability: "99.4%" },
  { source: "CDK Global", scope: "DMS connector", state: "Not configured", freshness: "—", reliability: "—" },
  { source: "Reynolds & Reynolds", scope: "DMS connector", state: "Credential review", freshness: "48 min", reliability: "97.8%" },
];

const auditEntries = [
  ["14:42:08", "GUARDIAN", "Validated GH-2047 against appointment and RO exports", "Verified"],
  ["14:38:51", "Maya Chen", "Changed Service Manager alert threshold to $25K", "Recorded"],
  ["14:31:16", "CROSS3", "Completed incremental sync · 428 records", "Authenticated"],
  ["13:54:02", "Ken Walters", "Exported Weekly Executive Operating Brief", "Recorded"],
];

export default function Guardian() {
  const [notice, setNotice] = useState("");
  const [verified, setVerified] = useState<string[]>([]);
  const verify = (signal: string) => {
    setVerified(items => items.includes(signal) ? items : [...items, signal]);
    setNotice(`${signal} independently verified.`);
    setTimeout(() => setNotice(""), 2200);
  };
  return <PrototypeShell eyebrow="TRUST & VALIDATION LAYER" title="Guardian Verification Hub." description="Prove the data behind every operating decision—without introducing a separate business system." actions={<GuardianBadge />}>
    <Toast message={notice} />
    <section className="guardian-kpis">{integrityMetrics.map(metric => {
      const Icon = metric.icon;
      return <article key={metric.label} className={metric.status}><div><Icon size={18} strokeWidth={1.8} /><span>{metric.label}</span></div><b>{metric.value}</b><small>{metric.detail}</small><i>{metric.status === "warning" ? "REVIEW" : metric.status === "normal" ? "NORMAL" : "HEALTHY"}</i></article>;
    })}</section>
    <section className="guardian-assurance">
      <div><span>GUARDIAN ASSURANCE SCORE</span><b>96.8</b><small>High confidence · Last full validation 14:42</small></div>
      <div className="assurance-ring"><i style={{"--score":"96.8%" } as React.CSSProperties}><span>96.8</span></i></div>
      <p><ShieldCheck size={20} /> Authentication, freshness, schema integrity, lineage and anomaly cross-validation are continuously scored.</p>
    </section>
    <div className="guardian-grid">
      <section className="proto-panel guardian-connections"><div className="proto-panel-head"><div><span>CONNECTION HEALTH</span><h2>Authenticated sources</h2></div><b>2 ACTIVE</b></div><div className="guardian-table-head"><span>SOURCE</span><span>PERMISSIONS</span><span>FRESHNESS</span><span>RELIABILITY</span></div>{connections.map(connection=><div className="guardian-connection" key={connection.source}><i className={connection.state === "Authenticated" ? "healthy" : connection.state === "Credential review" ? "warning" : ""}>{connection.source.slice(0,2)}</i><b>{connection.source}<small>{connection.state}</small></b><span>{connection.scope}</span><em>{connection.freshness}</em><strong>{connection.reliability}</strong><button onClick={()=>{setNotice(`${connection.source} verification details opened.`);setTimeout(()=>setNotice(""),2200)}} aria-label={`Inspect ${connection.source}`}>→</button></div>)}</section>
      <section className="proto-panel guardian-queue"><div className="proto-panel-head"><div><span>VALIDATION QUEUE</span><h2>Signals awaiting judgment</h2></div><b>2 OPEN</b></div>{[["GH-2046","Brake pad backorders","98%","3 sources agree"],["GH-2045","Test-drive no-shows","91%","Calendar lag checked"],["GH-2041","Advisor variance","87%","Deal mix normalized"]].map(item=><article key={item[0]}><div><TriangleAlert size={16}/><span>{item[0]}</span></div><b>{item[1]}</b><small>{item[3]}</small><strong>{verified.includes(item[0]) ? "VERIFIED" : item[2]}</strong><button className={verified.includes(item[0]) ? "verified" : ""} onClick={()=>verify(item[0])}>{verified.includes(item[0]) ? "✓ Verified" : "Verify signal"}</button></article>)}</section>
    </div>
    <section className="proto-panel guardian-audit"><div className="proto-panel-head"><div><span>AUDIT TRAIL</span><h2>Every trust event, preserved.</h2></div><button className="proto-text-btn" onClick={()=>{setNotice("Audit export prepared for download.");setTimeout(()=>setNotice(""),2200)}}><FileClock size={14}/> Export log</button></div><div className="guardian-audit-head"><span>TIME</span><span>ACTOR</span><span>EVENT</span><span>STATUS</span></div>{auditEntries.map(entry=><div key={`${entry[0]}-${entry[1]}`}><time>{entry[0]}</time><b>{entry[1]}</b><span>{entry[2]}</span><em>{entry[3]}</em></div>)}</section>
  </PrototypeShell>;
}
