"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function EarthScene({
  satellites,
  paused,
}: {
  satellites: { id: string; name: string; angleRad: number; altitudeKm: number }[];
  paused: boolean;
}) {
  const earthRef = useRef<THREE.Group>(null);
  const orbitRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    if (paused) return;
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.14;
    orbitRefs.current.forEach((group, i) => {
      if (group) group.rotation.y += delta * (0.22 + i * 0.07);
    });
  });

  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 2.4, 3]} intensity={2.2} color="#b7dcff" />
      <pointLight position={[-3, -1, -2]} intensity={0.6} color="#8b5cf6" />
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#12324c" roughness={0.86} metalness={0.08} emissive="#071422" emissiveIntensity={0.45} />
        </mesh>
        <mesh scale={1.02}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.07} />
        </mesh>
        <mesh position={[0.82, 0.28, 0.48]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
      </group>
      {satellites.map((sat, i) => {
        const radius = 1.28 + sat.altitudeKm / 2400;
        const inclination = 0.28 + i * 0.22;
        return (
          <group
            key={sat.id}
            ref={(el) => {
              orbitRefs.current[i] = el;
            }}
            rotation={[inclination, sat.angleRad, 0.15 * i]}
          >
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.004, 8, 96]} />
              <meshBasicMaterial color="#64dded" transparent opacity={0.28} />
            </mesh>
            <mesh position={[radius, 0, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color="#c4b5fd" />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), {
  ssr: false,
});

export function EarthOrbitView({
  satellites,
}: {
  satellites: { id: string; name: string; angleRad: number; altitudeKm: number }[];
}) {
  const reduced = useReducedMotion();
  const camera = useMemo(
    () => ({ position: [0, 1.8, 4.2] as [number, number, number], fov: 42 }),
    [],
  );

  return (
    <div className="h-[320px] w-full overflow-hidden rounded-lg border border-cyan-400/15 bg-[#02060d]">
      <Canvas camera={camera} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <color attach="background" args={["#02060d"]} />
        <EarthScene satellites={satellites} paused={reduced} />
      </Canvas>
    </div>
  );
}
