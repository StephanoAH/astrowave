"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sparkles } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function noise(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function LookAtOrigin() {
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

function SpiralGalaxy({ paused }: { paused: boolean }) {
  const disk = useRef<THREE.Group>(null);
  const arms = useRef<THREE.Points>(null);
  const core = useRef<THREE.Points>(null);
  const count = 14000;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const cyan = new THREE.Color("#72e9ff");
    const violet = new THREE.Color("#8b5cf6");
    const white = new THREE.Color("#f4f7ff");
    for (let i = 0; i < count; i++) {
      const arm = i % 4;
      const radius = Math.pow(noise(i, 1), 0.72) * 3.15;
      const spin = radius * 1.75;
      const angle = (arm / 4) * Math.PI * 2 + spin + (noise(i, 2) - 0.5) * 0.5;
      const spread = 0.08 + radius * 0.05;
      pos[i * 3] = Math.cos(angle) * radius + (noise(i, 3) - 0.5) * spread;
      pos[i * 3 + 1] = (noise(i, 4) - 0.5) * spread * 0.55;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (noise(i, 5) - 0.5) * spread;

      const color = radius < 0.65 ? white : cyan.clone().lerp(violet, radius / 3.15);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: cols };
  }, [count]);

  useFrame((_, delta) => {
    if (paused || !disk.current) return;
    disk.current.rotation.y += delta * 0.055;
    if (arms.current) arms.current.rotation.y += delta * 0.008;
    if (core.current) core.current.rotation.y -= delta * 0.012;
  });

  return (
    <group ref={disk} scale={1.62}>
      <Points ref={arms} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={0.94}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points ref={core} positions={positions.slice(0, 2000 * 3)} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fff4dc"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.78}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshBasicMaterial color="#dce8ff" transparent opacity={0.14} />
      </mesh>
      <pointLight color="#8abfff" intensity={12} distance={6} />
    </group>
  );
}

export function GalaxyScene({ staticGalaxy = false }: { staticGalaxy?: boolean }) {
  const reduced = useReducedMotion();
  const pause = staticGalaxy || reduced;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2.35, 5.35], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#030508"]} />
        <fog attach="fog" args={["#030508", 6, 14]} />
        <ambientLight intensity={0.12} />
        <LookAtOrigin />
        <SpiralGalaxy paused={pause} />
        <Sparkles count={90} scale={[12, 4, 12]} size={1.05} speed={pause ? 0 : 0.12} opacity={0.38} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 nebula-glow opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,#030508_94%)]" />
    </div>
  );
}
