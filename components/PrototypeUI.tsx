"use client";

import { ReactNode, useEffect } from "react";
import type { Anomaly } from "@/lib/mock-data";

export function Modal({open,onClose,children,label}:{open:boolean;onClose:()=>void;children:ReactNode;label:string}) {
  useEffect(()=>{function key(e:KeyboardEvent){if(e.key==="Escape")onClose()}document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[onClose]);
  if(!open)return null;
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal-card" role="dialog" aria-modal="true" aria-label={label} onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close">×</button>{children}</section></div>
}

export function Drawer({open,onClose,children,label}:{open:boolean;onClose:()=>void;children:ReactNode;label:string}) {
  if(!open)return null;
  return <div className="drawer-backdrop" onMouseDown={onClose}><aside className="drawer" role="dialog" aria-modal="true" aria-label={label} onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button>{children}</aside></div>
}

export function AnomalyDetail({anomaly,onClose,onAction}:{anomaly:Anomaly|null;onClose:()=>void;onAction:(status:string)=>void}) {
  return <Modal open={!!anomaly} onClose={onClose} label="Anomaly investigation">{anomaly&&<>
    <div className="modal-kicker">INVESTIGATION · {anomaly.id}</div><h2>{anomaly.title}</h2><p>{anomaly.description}</p>
    <div className="compare-numbers"><div><span>EXPECTED</span><b>{anomaly.expected.toLocaleString()}</b></div><i>→</i><div><span>ACTUAL</span><b>{anomaly.actual.toLocaleString()}</b></div><strong>{anomaly.deviation>0?"+":""}{anomaly.deviation}%</strong></div>
    <div className="modal-section"><span>SUGGESTED ACTIONS</span>{anomaly.actions.map(a=><label key={a}><input type="checkbox"/>{a}</label>)}</div>
    <div className="modal-buttons"><button onClick={()=>onAction("false positive")} className="proto-btn ghost">False positive</button><button onClick={()=>onAction("escalated")} className="proto-btn ghost">Escalate</button><button onClick={()=>onAction("resolved")} className="proto-btn lime">Mark resolved</button></div>
  </>}</Modal>
}

export function Toast({message}:{message:string}) { return message?<div className="proto-toast">✓ {message}</div>:null }

export function downloadText(filename:string, content:string, type="text/plain") {
  const url=URL.createObjectURL(new Blob([content],{type})); const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}
