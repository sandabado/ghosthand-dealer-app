"use client";

import "@/styles/onboarding.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { anomalies } from "@/lib/mock-data";

const findingIds = ["GH-2045", "GH-2046", "GH-2043", "GH-2042", "GH-2044"];
const findings = findingIds.map(id => anomalies.find(a => a.id === id)!);
const [noShow, backorders, bayUse, obsolescence, taycan] = findings;
const atRiskTotal = "$141.6K";
const priority = backorders;

// Full page loads, not client-side transitions — the framework's router cache serves
// stale content for this dynamic route on soft navigation. A hard load is always correct.
function go(n: number) { window.location.href = `/onboarding/step-${n}`; }

export default function Onboarding() {
  const { step } = useParams<{ step: string }>();
  const beat = Number(step.replace("step-", "")) || 1;

  return (
    <main className="beat-shell" data-beat={beat}>
      <nav className="beat-nav">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hard load avoids a client-router cache bug on this dynamic route */}
        <a href="/onboarding/step-1" className="wordmark"><span>GH</span> Ghost Hand Intelligence</a>
        <Link href="/dashboard" className="beat-skip">Skip to demo →</Link>
      </nav>
      {/* Shortened flow: Arrival -> Connector -> Decision -> Dashboard. Beats 2, 4, 5 stay reachable by direct URL but are skipped here. */}
      {beat === 1 && <Beat1 onNext={() => go(3)} />}
      {beat === 2 && <Beat2 onNext={() => go(3)} />}
      {beat === 3 && <Beat3 onNext={() => go(6)} />}
      {beat === 4 && <Beat4 onNext={() => go(5)} />}
      {beat === 5 && <Beat5 onNext={() => go(6)} />}
      {beat === 6 && <Beat6 onNext={() => go(7)} />}
      {beat === 7 && <Beat7 />}
    </main>
  );
}

function Beat1({ onNext }: { onNext: () => void }) {
  return (
    <section className="beat beat-1">
      <div className="beat-1-mark">GHOST HAND INTELLIGENCE</div>
      <p className="beat-1-tag">See what your DMS is <em>NOT</em> telling you.</p>
      <button className="beat-begin" onClick={onNext}>BEGIN</button>
    </section>
  );
}

function Beat2({ onNext }: { onNext: () => void }) {
  return (
    <section className="beat beat-2">
      <p className="b2-line" style={{ animationDelay: "300ms" }}>Your DMS told you the numbers.</p>
      <p className="b2-line" style={{ animationDelay: "1100ms" }}>It didn&rsquo;t tell you the story.</p>
      <p className="b2-line b2-figure" style={{ animationDelay: "2600ms" }}>
        Last month your dealership generated <b>$472,350</b> in gross profit.
      </p>
      <p className="b2-line" style={{ animationDelay: "3400ms" }}>Your DMS recorded every transaction.</p>
      <p className="b2-line" style={{ animationDelay: "3900ms" }}>It missed every pattern.</p>
      <p className="b2-line b2-question" style={{ animationDelay: "5100ms" }}>What are you not seeing?</p>
      <button className="beat-cta b2-cta" style={{ animationDelay: "5700ms" }} onClick={onNext}>Continue →</button>
    </section>
  );
}

function Beat3({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"idle" | "testing" | "connected">("idle");
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (phase !== "connected") return;
    if (revealed >= 3) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 1000);
    return () => clearTimeout(t);
  }, [phase, revealed]);
  function test() {
    setPhase("testing");
    setTimeout(() => setPhase("connected"), 1400);
  }
  const streams = [
    ["Sales exports detected", "4 streams"],
    ["Service exports detected", "5 streams"],
    ["Parts exports detected", "3 streams"],
  ];
  return (
    <section className="beat beat-3">
      <div className="eyebrow"><i />CONNECT YOUR DMS</div>
      <p className="beat-3-body">Select your dealer management system. Ghost Hand reads your exports. Nothing is stored outside your dealership.</p>
      <div className="b3-form">
        <label className="field">DMS PROVIDER<select defaultValue="CROSS3"><option>CROSS3</option><option>CDK Global</option><option>Reynolds &amp; Reynolds</option></select></label>
        <label className="field">DEALER CODE<input defaultValue="4471" /></label>
        <label className="field">EXPORT KEY<input type="password" defaultValue="••••••••••" /></label>
      </div>
      {phase === "idle" && <button className="proto-btn lime" onClick={test}>Test Connection</button>}
      {phase === "testing" && <button className="proto-btn lime" disabled>Establishing secure handshake…</button>}
      {phase === "connected" && (
        <div className="b3-streams">
          {streams.map((s, i) => (
            <p key={s[0]} className={i < revealed ? "b3-stream in" : "b3-stream"}>
              <span>✓</span> {s[0]} <b>{s[1]}</b>
            </p>
          ))}
        </div>
      )}
      {revealed >= 3 && (
        <>
          <div className="b3-summary">
            <p>3 departments connected.</p>
            <p>12 exports online.</p>
            <p className="guardian-line">Data integrity verified.</p>
          </div>
          <button className="beat-cta" onClick={onNext}>Begin Scan →</button>
        </>
      )}
    </section>
  );
}

const scanCards = [
  { at: 20, dept: noShow.department, title: `${noShow.title === "Test-drive no-shows reached 31%" ? "Test-drive no-shows at 31%" : noShow.title}`, detail: `Est. impact: ${noShow.value} in lost conversion` },
  { at: 45, dept: backorders.department, title: "Brake pad backorders +147%", detail: `${backorders.value} · Est. impact: deferred service revenue` },
  { at: 60, dept: bayUse.department, title: "Bay utilization -7% vs. target", detail: `Est. impact: ${bayUse.value}` },
  { at: 80, dept: obsolescence.department, title: "Obsolescence risk identified", detail: `Est. exposure: ${obsolescence.value}` },
  { at: 95, dept: taycan.department, title: "Taycan gross profit +23% above baseline", detail: "Opportunity: replicate margin pattern across lineup" },
];

function Beat4({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress >= 100) return;
    const t = setTimeout(() => setProgress(p => Math.min(100, p + 2)), 90);
    return () => clearTimeout(t);
  }, [progress]);
  const phase = progress < 34 ? "sales" : progress < 67 ? "service" : "parts";
  return (
    <section className="beat beat-4">
      <div className="eyebrow"><i />SCANNING YOUR DEALERSHIP</div>
      <div className="b4-depts">
        {["sales", "service", "parts"].map(d => <span key={d} className={phase === d || (d === "sales" && progress >= 34) || (d === "service" && progress >= 67) ? "hit" : ""}>{d.toUpperCase()}</span>)}
      </div>
      <div className="b4-bar"><i style={{ width: `${progress}%` }} /><b>{progress}%</b></div>
      <div className="b4-cards">
        {scanCards.filter(c => progress >= c.at).map(c => (
          <article key={c.title} className={`b4-card dept-${c.dept}`}>
            <span>{c.dept.toUpperCase()}</span>
            <b>{c.title}</b>
            <small>{c.detail}</small>
          </article>
        ))}
      </div>
      {progress >= 100 && (
        <>
          <p className="b4-done">Scan complete. 5 findings. 4 departments reviewed.</p>
          <button className="beat-cta" onClick={onNext}>View Full Findings →</button>
        </>
      )}
    </section>
  );
}

function Beat5({ onNext }: { onNext: () => void }) {
  return (
    <section className="beat beat-5">
      <p className="b2-line" style={{ animationDelay: "200ms" }}>Here&rsquo;s what changed.</p>
      <p className="b2-line" style={{ animationDelay: "800ms" }}>Here&rsquo;s what&rsquo;s at risk.</p>
      <p className="b2-line" style={{ animationDelay: "1400ms" }}>Here&rsquo;s what to do next.</p>
      <div className="b5-section" style={{ animationDelay: "2200ms" }}>
        <span>WHAT CHANGED</span>
        <p>Your Taycan line is outperforming by 23%. That margin pattern is repeatable.</p>
      </div>
      <div className="b5-section" style={{ animationDelay: "2900ms" }}>
        <span>WHAT&rsquo;S AT RISK</span>
        <p><b>{bayUse.value}</b> and rising backorders are pressuring service revenue.</p>
        <p><b>{obsolescence.value}</b> in parts is aging toward obsolescence.</p>
        <p><b>{noShow.value}</b> is walking out the door through no-show test drives.</p>
      </div>
      <div className="b5-section" style={{ animationDelay: "3600ms" }}>
        <span>WHAT TO DO NEXT</span>
        <p>Two paths. Ranked by impact. Each takes less than 8 seconds to initiate.</p>
      </div>
      <p className="b5-close" style={{ animationDelay: "4300ms" }}>Your DMS showed you the number. We show you the pattern.</p>
      <button className="beat-cta" style={{ animationDelay: "4900ms" }} onClick={onNext}>Choose Your First Move →</button>
    </section>
  );
}

function Beat6({ onNext }: { onNext: () => void }) {
  const [choice, setChoice] = useState<"investigate" | "generate" | null>(null);
  const [reportProgress, setReportProgress] = useState(0);
  useEffect(() => {
    if (choice !== "generate" || reportProgress >= 100) return;
    const t = setTimeout(() => setReportProgress(p => Math.min(100, p + 8)), 90);
    return () => clearTimeout(t);
  }, [choice, reportProgress]);

  if (choice === "investigate") {
    return (
      <section className="beat beat-6 b6-detail">
        <div className="eyebrow"><i />{priority.id} · INVESTIGATION</div>
        <h2>{priority.title}</h2>
        <p>{priority.description}</p>
        <div className="compare-numbers"><div><span>EXPECTED</span><b>{priority.expected}</b></div><i>→</i><div><span>ACTUAL</span><b>{priority.actual}</b></div><strong>+{priority.deviation}%</strong></div>
        <div className="modal-section"><span>SUGGESTED ACTIONS</span>{priority.actions.map(a => <label key={a}><input type="checkbox" />{a}</label>)}</div>
        <button className="beat-cta" onClick={onNext}>Continue to dashboard →</button>
      </section>
    );
  }
  if (choice === "generate") {
    return (
      <section className="beat beat-6 b6-detail">
        <div className="eyebrow"><i />EXECUTIVE REPORT</div>
        {reportProgress < 100
          ? <div className="generation-progress"><i style={{ width: `${reportProgress}%` }} /><span>{reportProgress}%</span></div>
          : <><h2>Report ready. Sent to ken@porschecentre.com.</h2><p>5 findings covered · PDF attached · delivered in 8 seconds.</p><button className="beat-cta" onClick={onNext}>Continue to dashboard →</button></>}
      </section>
    );
  }
  return (
    <section className="beat beat-6">
      <h2 className="b6-prompt">What&rsquo;s your first move?</h2>
      <div className="b6-cards">
        <button className="b6-card" onClick={() => setChoice("investigate")}>
          <span>INVESTIGATE</span>
          <b>Brake pad backorders +147%</b>
          <small>{priority.value} · Dig into the root cause. See which ROs, which parts, which timeline.</small>
        </button>
        <button className="b6-card" onClick={() => setChoice("generate")}>
          <span>GENERATE</span>
          <b>Executive report covering all 5 findings</b>
          <small>Ready in 8 seconds. PDF + email delivery.</small>
        </button>
      </div>
      <p className="b6-footer">Either path. Same system. Same data. Eight seconds.</p>
    </section>
  );
}

function Beat7() {
  useEffect(() => { const t = setTimeout(() => { window.location.href = "/dashboard"; }, 5200); return () => clearTimeout(t); }, []);
  return (
    <section className="beat beat-7">
      <div className="eyebrow"><i />GOOD MORNING, KEN</div>
      <div className="b7-kpis">
        <div><span>MONTHLY GP</span><b>$472,350</b></div>
        <div><span>ANOMALIES</span><b>5 active</b></div>
        <div><span>AT RISK</span><b>{atRiskTotal}</b></div>
        <div><span>OPPORTUNITY</span><b>+23%</b></div>
      </div>
      <p className="b7-close">You&rsquo;re oriented. Your priority anomaly is highlighted.<br />You&rsquo;re not learning a tool. You&rsquo;re already working.</p>
    </section>
  );
}
