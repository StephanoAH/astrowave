"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function SatelliteMesh() {
  return (
    <group rotation={[-0.4, 0.2, 0.1]}>
      <mesh>
        <boxGeometry args={[0.1, 0.06, 0.08]} />
        <meshStandardMaterial color="#d9e5ee" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[-0.14, 0, 0]}>
        <boxGeometry args={[0.14, 0.008, 0.08]} />
        <meshBasicMaterial color="#27639e" />
      </mesh>
      <mesh position={[0.14, 0, 0]}>
        <boxGeometry args={[0.14, 0.008, 0.08]} />
        <meshBasicMaterial color="#27639e" />
      </mesh>
      <pointLight color="#9befff" intensity={0.55} distance={1.4} />
    </group>
  );
}

function SatelliteOrbit({
  radius,
  speed,
  inclination,
  paused,
  phase = 0,
}: {
  radius: number;
  speed: number;
  inclination: number;
  paused: boolean;
  phase?: number;
}) {
  const orbit = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!paused && orbit.current) orbit.current.rotation.y += delta * speed;
  });

  return (
    <group ref={orbit} rotation={[inclination, phase, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 8, 128]} />
        <meshBasicMaterial color="#64dded" transparent opacity={0.28} />
      </mesh>
      <group position={[radius, 0, 0]}>
        <SatelliteMesh />
      </group>
    </group>
  );
}

function PlanetBody({
  radius,
  color,
  atmosphere,
  rings,
  paused,
}: {
  radius: number;
  color: string;
  atmosphere: string;
  rings?: boolean;
  paused: boolean;
}) {
  const planet = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!paused && planet.current) planet.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={planet}>
      <mesh rotation={[0.12, 0, -0.18]}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color={color} roughness={0.86} metalness={0.08} />
      </mesh>
      <mesh scale={1.04}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color={atmosphere} transparent opacity={0.14} side={THREE.BackSide} />
      </mesh>
      {rings && (
        <mesh rotation={[1.22, 0.12, 0.08]}>
          <ringGeometry args={[radius * 1.28, radius * 2.08, 96]} />
          <meshBasicMaterial
            color="#8aa0c7"
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

const VARIANTS = {
  cyan: {
    radius: 0.72,
    color: "#132b45",
    atmosphere: "#35c9e8",
    rings: false,
    satellites: [
      { radius: 1.22, speed: 0.28, inclination: 0.42, phase: 0.4 },
      { radius: 1.62, speed: -0.16, inclination: 1.12, phase: 1.8 },
    ],
  },
  rings: {
    radius: 0.58,
    color: "#473d58",
    atmosphere: "#a98dde",
    rings: true,
    satellites: [{ radius: 1.48, speed: 0.22, inclination: 0.55, phase: 0.9 }],
  },
} as const;

export function PlanetOrbitScene({
  variant,
  className,
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const config = VARIANTS[variant];

  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.35, 3.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.4]}
      >
        <ambientLight intensity={0.22} />
        <directionalLight position={[-3, 2.4, 4]} color="#a6d9ff" intensity={2.2} />
        <directionalLight position={[3, -1, 2]} color="#8b5cf6" intensity={0.55} />
        <Float speed={reduced ? 0 : 0.45} rotationIntensity={0.05} floatIntensity={0.14}>
          <group>
            <PlanetBody
              radius={config.radius}
              color={config.color}
              atmosphere={config.atmosphere}
              rings={config.rings}
              paused={reduced}
            />
            {config.satellites.map((sat) => (
              <SatelliteOrbit key={`${sat.radius}-${sat.phase}`} {...sat} paused={reduced} />
            ))}
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
