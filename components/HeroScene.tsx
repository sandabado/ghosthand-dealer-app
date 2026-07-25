"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const lime = "#cfff04";
const purple = "#6d4aff";

function TetrahedronWireframe({ reduced = false }: { reduced?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const vertices = [
    [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1],
  ].map(([x, y, z]) => {
    const scale = 1.42 / Math.sqrt(3);
    return [x * scale, y * scale, z * scale] as [number, number, number];
  });
  useFrame((_, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.32;
    mesh.current.rotation.z += delta * 0.12;
  });
  return <group>
    <mesh ref={mesh}>
      <tetrahedronGeometry args={[1.55, 0]} />
      <meshStandardMaterial color={lime} wireframe emissive={lime} emissiveIntensity={1.8} transparent opacity={0.82} />
    </mesh>
    {vertices.map((position, index) => <GlowNode key={index} position={position} delay={index * .45} reduced={reduced} />)}
  </group>;
}

function DodecahedronWireframe({ reduced = false }: { reduced?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y -= delta * 0.12;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * .22) * .16;
    const opacity = .23 + Math.sin(state.clock.elapsedTime * 1.55) * .08;
    (mesh.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });
  return <mesh ref={mesh} rotation={[.2, 0, .25]}>
    <dodecahedronGeometry args={[2.45, 0]} />
    <meshBasicMaterial color={purple} wireframe transparent opacity={.28} />
  </mesh>;
}

function GlowNode({ position, delay, reduced }: { position: [number, number, number]; delay: number; reduced: boolean }) {
  const node = useRef<THREE.Mesh>(null);
  useFrame(state => {
    if (!node.current || reduced) return;
    const pulse = .72 + Math.sin(state.clock.elapsedTime * 2.1 + delay) * .28;
    node.current.scale.setScalar(pulse);
  });
  return <mesh ref={node} position={position}>
    <sphereGeometry args={[.095, 14, 14]} />
    <meshStandardMaterial color="#ffffff" emissive={lime} emissiveIntensity={4} />
  </mesh>;
}

function EdgeParticles({ count = 30, reduced = false }: { count?: number; reduced?: boolean }) {
  const particles = useRef<THREE.Points>(null);
  const positionArray = useMemo(() => new Float32Array(count * 3), [count]);
  const paths = useMemo(() => Array.from({ length: count }, (_, index) => {
    const startAngle = index * 2.399;
    const endAngle = startAngle + 1.45 + (index % 5) * .23;
    const start = new THREE.Vector3(Math.cos(startAngle) * 1.4, Math.sin(startAngle * 1.31) * 1.35, Math.sin(startAngle) * 1.2);
    const end = new THREE.Vector3(Math.cos(endAngle) * 2.35, Math.sin(endAngle * .83) * 2.05, Math.sin(endAngle) * 2.15);
    const control = start.clone().lerp(end, .5).add(new THREE.Vector3(Math.sin(index) * .7, Math.cos(index * 1.7) * .65, Math.sin(index * .4) * .5));
    return { start, end, control, speed: .13 + (index % 7) * .018, offset: (index * .173) % 1 };
  }), [count]);
  useFrame(state => {
    if (!particles.current || reduced) return;
    const positions = particles.current.geometry.attributes.position as THREE.BufferAttribute;
    paths.forEach((path, index) => {
      const t = (state.clock.elapsedTime * path.speed + path.offset) % 1;
      const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const point = new THREE.QuadraticBezierCurve3(path.start, path.control, path.end).getPoint(eased);
      positions.setXYZ(index, point.x, point.y, point.z);
    });
    positions.needsUpdate = true;
  });
  return <points ref={particles}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[positionArray, 3]} />
    </bufferGeometry>
    <pointsMaterial color={lime} size={.075} sizeAttenuation transparent opacity={.95} blending={THREE.AdditiveBlending} />
  </points>;
}

function GridFloor({ reduced = false }: { reduced?: boolean }) {
  const grid = useRef<THREE.GridHelper>(null);
  useFrame(state => {
    if (!grid.current || reduced) return;
    grid.current.position.z = (state.clock.elapsedTime * .55) % 1;
    const material = grid.current.material as THREE.Material;
    material.opacity = .15 + Math.sin(state.clock.elapsedTime * .8) * .035;
  });
  return <gridHelper ref={grid} args={[20, 30, lime, "#273020"]} position={[0, -2.65, 0]} material-transparent material-opacity={.16} />;
}

function AmbientSparkles({ count }: { count: number }) {
  const cloud = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      const angle = index * 2.399;
      const radius = 1.7 + (index % 9) * .22;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(angle * 1.37) * (1.4 + index % 3);
      values[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return values;
  }, [count]);
  useFrame((state, delta) => {
    if (!cloud.current) return;
    cloud.current.rotation.y += delta * .035;
    (cloud.current.material as THREE.PointsMaterial).opacity = .28 + Math.sin(state.clock.elapsedTime * .7) * .1;
  });
  return <points ref={cloud}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color={lime} size={.025} sizeAttenuation transparent opacity={.35} blending={THREE.AdditiveBlending} />
  </points>;
}

function FloatingCore({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(state => {
    if (!group.current || reduced) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * .75) * .12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * .32) * .035;
  });
  return <group ref={group}>{children}</group>;
}

function TelemetryCore({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return <group position={[mobile ? 0 : 2.8, mobile ? -.7 : 0, 0]} scale={mobile ? .72 : 1}>
    <ambientLight intensity={.38} />
    <pointLight position={[3, 4, 4]} color={lime} intensity={10} distance={12} />
    <pointLight position={[-3, -2, 2]} color={purple} intensity={8} distance={10} />
    <FloatingCore reduced={reduced}>
      <DodecahedronWireframe reduced={reduced} />
      <TetrahedronWireframe reduced={reduced} />
      <EdgeParticles count={mobile ? 12 : 30} reduced={reduced} />
      <AmbientSparkles count={mobile ? 18 : 46} />
    </FloatingCore>
    <GridFloor reduced={reduced} />
  </group>;
}

function StaticTelemetry() {
  return <div className="telemetry-static" aria-hidden="true"><i /><i /><i /><span /><span /><span /><span /></div>;
}

export function HeroScene() {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = window.matchMedia("(max-width: 767px)");
    const sync = () => { setReduced(motion.matches); setMobile(size.matches); };
    try {
      const canvas = document.createElement("canvas");
      setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch { setWebgl(false); }
    sync(); motion.addEventListener("change", sync); size.addEventListener("change", sync); setReady(true);
    return () => { motion.removeEventListener("change", sync); size.removeEventListener("change", sync); };
  }, []);
  return <div className="telemetry-scene">
    <p className="sr-only">Engineered telemetry visualization with nested geometric systems, flowing data particles, live connection nodes, and a perspective data grid.</p>
    {!ready || !webgl || reduced ? <StaticTelemetry /> : <Canvas dpr={[1, 1.6]} camera={{ position: [0, .25, 8.2], fov: 48 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <TelemetryCore mobile={mobile} reduced={false} />
    </Canvas>}
    <div className="telemetry-hud" aria-hidden="true">
      <div className="hud-top"><span>COHERENCE <b>0.94</b> ✓</span><span>LATENCY <b>23ms</b></span><span>EXPORTS <b>12/12</b></span></div>
      <div className="hud-reticle"><i /><i /><span>GH-INTEL<br/><b>CONNECTED</b></span></div>
      <div className="hud-speed"><div><b>284</b><span>KM/H</span></div></div>
      <div className="hud-rpm">{Array.from({ length: 22 }, (_, i) => <i key={i} className={i < 17 ? "hot" : ""} />)}<span>DATA VELOCITY · 8,400 RPM</span></div>
      <div className="hud-sync">● SYNC LIVE <b>14,802</b> SIGNALS</div>
    </div>
  </div>;
}
