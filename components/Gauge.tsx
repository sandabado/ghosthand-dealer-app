"use client";

const CX = 120, CY = 120, R = 108;

function angleFor(value: number, max: number) { return -135 + (value / max) * 270; }
function pointAt(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.sin(rad), CY - radius * Math.cos(rad)] as const;
}
function arcPath(radius: number, from: number, to: number, max: number) {
  const [x1, y1] = pointAt(radius, angleFor(from, max));
  const [x2, y2] = pointAt(radius, angleFor(to, max));
  const large = to - from > max / 2 ? 1 : 0;
  return `M${x1.toFixed(2)},${y1.toFixed(2)} A${radius},${radius} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)}`;
}

export type GaugeProps = {
  id: string;
  size: "lg" | "md" | "sm";
  max: number;
  value: number;
  tickStep?: number;
  redlineFrom?: number;
  digitalLabel: string;
  digitalValue: string;
  unitLabel: string;
  delay: number;
};

export function Gauge({ id, size, max, value, tickStep = 1, redlineFrom, digitalLabel, digitalValue, unitLabel, delay }: GaugeProps) {
  const majorTicks: number[] = [];
  for (let v = 0; v <= max; v += tickStep) majorTicks.push(v);
  const restAngle = angleFor(value, max);
  const glowId = `glow-${id}`;

  return (
    <div className={`gauge gauge-${size}`} style={{ animationDelay: `${delay}ms` }}>
      <svg viewBox="0 0 240 240">
        <defs>
          <radialGradient id={`face-${id}`} cx="50%" cy="40%" r="72%">
            <stop offset="0%" stopColor="#1c1d17" />
            <stop offset="70%" stopColor="#101109" />
            <stop offset="100%" stopColor="#08080600" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`bezel-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#57594f" />
            <stop offset="45%" stopColor="#232420" />
            <stop offset="100%" stopColor="#0d0e0b" />
          </linearGradient>
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r={R} fill="none" stroke={`url(#bezel-${id})`} strokeWidth={9} />
        <circle cx={CX} cy={CY} r={R - 8} fill={`url(#face-${id})`} />
        <circle cx={CX} cy={CY} r={R - 8} fill="none" className="gauge-tickring" style={{ animationDelay: `${delay + 700}ms` }} />

        {redlineFrom !== undefined && (
          <path d={arcPath(96, redlineFrom, max, max)} className="gauge-redline" filter={`url(#${glowId})`} />
        )}

        {majorTicks.map(v => {
          const [x1, y1] = pointAt(90, angleFor(v, max));
          const [x2, y2] = pointAt(76, angleFor(v, max));
          const [lx, ly] = pointAt(62, angleFor(v, max));
          const inRedline = redlineFrom !== undefined && v >= redlineFrom;
          return (
            <g key={v}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className={inRedline ? "gauge-tick gauge-tick-red" : "gauge-tick"} strokeWidth={2.5} />
              <text x={lx} y={ly} className={inRedline ? "gauge-num gauge-num-red" : "gauge-num"} textAnchor="middle" dominantBaseline="middle">{v}</text>
            </g>
          );
        })}

        <text x={CX} y={CY + 40} className="gauge-scale-label" textAnchor="middle">{unitLabel}</text>

        <g>
          <rect x={CX - 36} y={CY - 21} width={72} height={32} rx={3} className="gauge-digital-bg" />
          <text x={CX} y={CY - 9} className="gauge-digital-label" textAnchor="middle">{digitalLabel}</text>
          <text x={CX} y={CY + 6} className="gauge-digital-value" textAnchor="middle">{digitalValue}</text>
        </g>

        <g
          className="gauge-needle-group"
          style={{ "--rest-angle": `${restAngle}deg`, animationDelay: `${delay}ms, ${delay + 1100}ms` } as React.CSSProperties}
        >
          <polygon points={`${CX - 2},${CY} ${CX + 2},${CY} ${CX + 1},${CY - 80} ${CX - 1},${CY - 80}`} className="gauge-needle" filter={`url(#${glowId})`} />
          <polygon points={`${CX - 2.5},${CY} ${CX + 2.5},${CY} ${CX + 1.5},${CY + 14} ${CX - 1.5},${CY + 14}`} className="gauge-needle-tail" />
        </g>
        <circle cx={CX} cy={CY} r={7} className="gauge-hub" />
        <ellipse cx={CX - 20} cy={CY - 55} rx={58} ry={30} fill={`url(#glass-${id})`} className="gauge-glass" />
      </svg>
    </div>
  );
}
