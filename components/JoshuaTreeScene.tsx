"use client";

// Single shared vanishing point for the whole scene — sun, ridgeline, road, and wind all converge here.
// VP sits low (near the dash line), like real eye-level over a hood — most of the frame is sky, a thin strip is ground.
const VP_X = 600, VP_Y = 400;
const VIEW_W = 1200, VIEW_H = 500;

const n = (v: number) => Math.round(v * 100) / 100;

function JoshuaTreeGlyph({ x, scale }: { x: number; scale: number }) {
  const s = scale;
  const tuft = (tx: number, ty: number, angle: number) => {
    const spikes = [-34, -17, 0, 17, 34];
    return spikes.map(a => {
      const rad = ((angle + a) * Math.PI) / 180;
      const len = 9 * s;
      return <line key={a} x1={n(tx)} y1={n(ty)} x2={n(tx + Math.sin(rad) * len)} y2={n(ty - Math.cos(rad) * len)} />;
    });
  };
  return (
    <g className="jt-glyph" transform={`translate(${x},0)`}>
      <path d={`M0,80 C-1,${n(60 * s)} 2,${n(40 * s)} -1,${n(18 * s)}`} strokeWidth={n(3.4 * s)} />
      <path d={`M-1,${n(45 * s)} C${n(-14 * s)},${n(38 * s)} ${n(-20 * s)},${n(24 * s)} ${n(-19 * s)},${n(8 * s)}`} strokeWidth={n(2.6 * s)} />
      <path d={`M-1,${n(30 * s)} C${n(12 * s)},${n(24 * s)} ${n(18 * s)},${n(12 * s)} ${n(16 * s)},${n(-2 * s)}`} strokeWidth={n(2.6 * s)} />
      {tuft(-1, n(18 * s), 0)}
      {tuft(-19, n(8 * s), -55)}
      {tuft(16, n(-2 * s), 55)}
    </g>
  );
}

const farRidge = `M0,${VP_Y + 30} C150,${VP_Y - 10} 300,${VP_Y + 5} 450,${VP_Y - 22} C${VP_X},${VP_Y - 38} ${VP_X + 50},${VP_Y - 32} 750,${VP_Y - 18} C900,${VP_Y + 6} 1050,${VP_Y - 8} 1200,${VP_Y + 16} L1200,${VIEW_H} L0,${VIEW_H} Z`;
const midRidge = `M0,${VP_Y + 60} C120,${VP_Y + 18} 250,${VP_Y + 32} 380,${VP_Y - 6} C480,${VP_Y - 30} 550,${VP_Y - 16} ${VP_X + 20},${VP_Y - 36} C720,${VP_Y - 60} 800,${VP_Y - 22} 900,${VP_Y + 10} C1020,${VP_Y + 42} 1120,${VP_Y + 26} 1200,${VP_Y + 46} L1200,${VIEW_H} L0,${VIEW_H} Z`;

const jtPositions = [
  { x: 180, scale: 0.75 }, { x: 420, scale: 1.15 }, { x: 720, scale: 0.55 }, { x: 980, scale: 1.35 }, { x: 1280, scale: 0.9 },
];

export function JoshuaTreeScene() {
  return (
    <div className="jt-scene" aria-hidden="true">
      <div className="jt-sky" />
      <svg className="jt-layer jt-horizon" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none">
        <defs>
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,213,0,0.95)" />
            <stop offset="38%" stopColor="rgba(255,213,0,0.35)" />
            <stop offset="100%" stopColor="rgba(255,213,0,0)" />
          </radialGradient>
        </defs>
        <circle className="jt-sun" cx={VP_X} cy={VP_Y} r={70} fill="url(#sunGrad)" />
        <path d={farRidge} className="jt-far" />
        <path d={midRidge} className="jt-mid" />
      </svg>
      <svg className="jt-layer jt-trees jt-trees-a" viewBox="0 0 1600 100" preserveAspectRatio="none">
        <g transform="translate(0,90)">
          {jtPositions.map((p, i) => <JoshuaTreeGlyph key={i} x={p.x} scale={p.scale} />)}
        </g>
      </svg>
      <svg className="jt-layer jt-trees jt-trees-b" viewBox="0 0 1600 100" preserveAspectRatio="none">
        <g transform="translate(0,90)">
          {jtPositions.map((p, i) => <JoshuaTreeGlyph key={`b-${i}`} x={(p.x + 260) % 1600} scale={p.scale} />)}
        </g>
      </svg>
      <div className="wind-lines" style={{ left: `${(VP_X / VIEW_W) * 100}%`, top: `${(VP_Y / VIEW_H) * 100}%` }}>
        {Array.from({ length: 22 }, (_, i) => ({
          angle: (i * 41) % 360,
          distance: 160 + ((i * 53) % 260),
          length: 30 + ((i * 17) % 52),
          duration: 0.55 + ((i * 7) % 14) / 20,
          delay: -((i * 5) % 12) / 4,
          opacity: 0.18 + ((i * 3) % 10) / 100,
        })).map((line, i) => (
          <i
            key={i}
            style={{
              width: `${line.length}px`,
              animationDuration: `${line.duration}s`,
              animationDelay: `${line.delay}s`,
              "--r": `${line.angle}deg`,
              "--dist": `${line.distance}px`,
              "--o": line.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="jt-haze" />
      <div className="jt-pillar jt-pillar-l" />
      <div className="jt-pillar jt-pillar-r" />
    </div>
  );
}
