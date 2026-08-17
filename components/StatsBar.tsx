"use client";

import { useCountUp } from "@/hooks/useCountUp";

const money = (v: number) => `$${Math.round(v)}K`;
const plain = (v: number) => String(Math.round(v));
const seconds = (v: number) => `${Math.round(v)} SEC`;

function Stat({ label, target, format, delay }: { label: string; target: number; format: (v: number) => string; delay: number }) {
  const ref = useCountUp(target, 800, delay, format);
  return (
    <div className="stat-item" style={{ animationDelay: `${delay}ms` }}>
      <b ref={ref}>0</b>
      <span>{label}</span>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="stats-bar">
      <Stat label="EXPORTS CONNECTED" target={12} format={plain} delay={4000} />
      <i />
      <Stat label="ANOMALIES DETECTED" target={7} format={plain} delay={4100} />
      <i />
      <Stat label="IMPACT IDENTIFIED" target={284} format={money} delay={4200} />
      <i />
      <Stat label="REPORT TIME" target={8} format={seconds} delay={4300} />
      <i />
      <div className="stat-item stat-item-static" style={{ animationDelay: "4400ms" }}>
        <b>4.5HRS → 8SEC</b>
        <span>TIME RETURNED</span>
      </div>
    </section>
  );
}
