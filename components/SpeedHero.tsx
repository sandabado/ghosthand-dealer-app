"use client";

import "@/styles/speed-hero.css";
import { JoshuaTreeScene } from "@/components/JoshuaTreeScene";
import { GaugeCluster } from "@/components/GaugeCluster";

export function SpeedHero() {
  return (
    <div className="speed-hero" aria-hidden="true">
      <JoshuaTreeScene />
      <div className="dash-housing">
        <svg className="dash-hood" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hoodFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#232419" />
              <stop offset="10%" stopColor="#1a1b13" />
              <stop offset="40%" stopColor="#111209" />
              <stop offset="100%" stopColor="#0a0a08" />
            </linearGradient>
            <radialGradient id="hoodLight" cx="52%" cy="0%" r="70%">
              <stop offset="0%" stopColor="#f0b464" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#f0b464" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M0,220 C100,190 200,150 320,125 C420,105 500,88 600,75 C700,88 780,105 880,125 C1000,150 1100,190 1200,220 L1200,500 L0,500 Z" fill="url(#hoodFill)" />
          <path d="M0,220 C100,190 200,150 320,125 C420,105 500,88 600,75 C700,88 780,105 880,125 C1000,150 1100,190 1200,220 L1200,500 L0,500 Z" fill="url(#hoodLight)" />
          <path d="M0,220 C100,190 200,150 320,125 C420,105 500,88 600,75 C700,88 780,105 880,125 C1000,150 1100,190 1200,220" className="dash-hood-rim" />
        </svg>
        <GaugeCluster />
      </div>
      <div className="speed-hero-glow" />
      <div className="hud-corner hud-tl"><b>GH-INTEL v2.0</b><span>● LIVE MONITORING</span></div>
      <div className="hud-mobile">7 ANOMALIES · 3 DEPTS · 8 SEC SYNC</div>
    </div>
  );
}
