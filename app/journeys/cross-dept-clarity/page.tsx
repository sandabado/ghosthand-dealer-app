"use client";

import { useState } from "react";
import Link from "next/link";
import { PrototypeShell } from "@/components/PrototypeShell";
import { Modal } from "@/components/PrototypeUI";

const departments=[
  {name:"Sales",icon:"S",metric:"28 deliveries",detail:"Test drives, leads, appraisals, deal structure and customer intent."},
  {name:"Service",icon:"SV",metric:"847 repair orders",detail:"Appointments, declined work, technician capacity, warranty and CSI."},
  {name:"Parts",icon:"P",metric:"94% fill rate",detail:"Orders, demand velocity, backorders, aging and margin."},
];
const events=[["MAR 12","Test drive","Sales","Customer explored a 911 Carrera S with Michael R."],["MAR 15","Service history matched","Service","Prior Cayenne service profile revealed loyalty and ownership cadence."],["MAR 18","Accessory signal","Parts","Roof transport package availability matched stated lifestyle need."],["MAR 25","Vehicle purchase","Sales","911 delivered with $8.5K in relevant add-ons."]];

export default function Connections(){
  const [detail,setDetail]=useState<{title:string;body:string}|null>(null);
  return <PrototypeShell eyebrow="JOURNEY 01 · CONNECTED OPERATIONS" title="Connect your operating picture." description="See the customer, revenue, and capacity signals that disappear between departmental exports." actions={<Link href="/onboarding/step-1" className="proto-btn dark">See your connections →</Link>}>
    <section className="flow-stage"><div className="flow-heading"><span>ONE CUSTOMER · THREE DEPARTMENTS · ONE DECISION LAYER</span><b>Data moved across 12 connected exports today</b></div><div className="department-flow">{departments.map((d,i)=><div className="flow-cluster" key={d.name}>{i>0&&<button className="flow-arrow" onClick={()=>setDetail({title:`${departments[i-1].name} → ${d.name}`,body:i===1?"Customer ownership, appointment propensity, declined work, and active sales intent.":"Repair demand, parts availability, labor scheduling, and aging exposure."})}><i/><span>DATA FLOW</span>→</button>}<button className="dept-node" onClick={()=>setDetail({title:d.name,body:d.detail})}><i>{d.icon}</i><span>{d.name}</span><b>{d.metric}</b><small>View connected metrics →</small></button></div>)}</div></section>
    <section className="journey-section"><div className="proto-panel-head"><div><span>CONNECTED CUSTOMER TIMELINE</span><h2>From first signal to delivery</h2></div><b>13 DAYS</b></div><div className="customer-timeline">{events.map((e,i)=><button key={e[1]} onClick={()=>setDetail({title:e[1],body:e[3]})}><span>{e[0]}</span><i>{i+1}</i><b>{e[1]}</b><small>{e[2]}</small>{i===1&&<em>3 DAYS WITHOUT CONTACT</em>}</button>)}</div></section>
    <section className="case-study"><div><span>DEALER CASE · CONNECTED EXPORTS</span><h2>Cross-sell increased 34% without adding another dashboard.</h2><p>Ghost Hand matched sales intent to service history and live parts availability, then surfaced the right next action inside the Monday brief.</p><button onClick={()=>setDetail({title:"The $47K connection",body:"Before: three exports, three owners, and no shared view. After: Ghost Hand identified 19 high-propensity opportunities, leading to $47K in incremental Q1 revenue and a 34% increase in relevant cross-sell."})}>Read full case study →</button></div><strong><span>Q1 REVENUE FOUND</span>$47K<small>from existing customer signals</small></strong></section>
    <Modal open={!!detail} onClose={()=>setDetail(null)} label="Connection details">{detail&&<><div className="modal-kicker">CONNECTED INTELLIGENCE</div><h2>{detail.title}</h2><p>{detail.body}</p><div className="modal-mini-grid"><div><span>RECORDS LINKED</span><b>1,284</b></div><div><span>OPPORTUNITY</span><b>$47K</b></div><div><span>CONFIDENCE</span><b>94%</b></div></div><button className="proto-btn lime" onClick={()=>setDetail(null)}>Done</button></>}</Modal>
  </PrototypeShell>
}
