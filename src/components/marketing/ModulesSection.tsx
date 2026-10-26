"use client";

import dynamic from "next/dynamic";
import { type MouseEvent, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Antenna,
  AudioWaveform,
  Bot,
  CloudSun,
  Cpu,
  Gauge,
  Orbit,
  RadioTower,
  Satellite,
  ScanLine,
  Telescope,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { platformModules } from "./modules-data";
import { ModuleVisual } from "./ModuleVisual";

gsap.registerPlugin(ScrollTrigger);

const PlanetOrbitScene = dynamic(
  () => import("./PlanetOrbitScene").then((m) => m.PlanetOrbitScene),
  { ssr: false },
);

const moduleIcons: Record<string, LucideIcon> = {
  tracking: Satellite,
  orbits: Orbit,
  passes: Telescope,
  freq: RadioTower,
  antennas: Antenna,
  sdr: ScanLine,
  dsp: Cpu,
  doppler: Gauge,
  telemetry: AudioWaveform,
  weather: CloudSun,
  recording: Waves,
  automation: Bot,
};

export function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".module-lane", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        y: 55,
        opacity: 0,
        stagger: 0.16,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const tiltCard = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 7,
      rotateX: y * -7,
      x: x * 3,
      y: y * 3,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
    });
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const resetCard = (event: MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, .55)",
    });
  };

  return (
    <section ref={sectionRef} id="modules" className="relative overflow-hidden py-32">
      <PlanetOrbitScene
        variant="cyan"
        className="pointer-events-none absolute -left-28 top-4 h-[28rem] w-[28rem] opacity-90 sm:-left-16 sm:h-[34rem] sm:w-[34rem]"
      />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 translate-x-1/3 rounded-full bg-violet-600/8 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/70">
              System architecture · 12 integrated modules
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">
              From space to signal
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-slate-400">
            A complete engineering chain for amateur satellite operations, from propagated
            orbital elements to RF capture and decoded spacecraft telemetry.
          </p>
        </div>
      </div>
      <div className="module-marquee-mask relative mt-16 space-y-5">
        <ModuleLane modules={platformModules.slice(0, 6)} direction="left" offset={0} onMove={tiltCard} onLeave={resetCard} />
        <ModuleLane modules={platformModules.slice(6)} direction="right" offset={6} onMove={tiltCard} onLeave={resetCard} />
      </div>
    </section>
  );
}

type ModuleItem = (typeof platformModules)[number];

function ModuleLane({
  modules,
  direction,
  offset,
  onMove,
  onLeave,
}: {
  modules: ModuleItem[];
  direction: "left" | "right";
  offset: number;
  onMove: (event: MouseEvent<HTMLElement>) => void;
  onLeave: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div className="module-lane overflow-hidden">
      <div className={`module-marquee-track module-marquee-${direction} flex w-max gap-5 px-2`}>
        {[0, 1].map((copy) =>
          modules.map((mod, index) => (
            <ModuleCard
              key={`${copy}-${mod.id}`}
              mod={mod}
              index={offset + index}
              duplicate={copy === 1}
              onMove={onMove}
              onLeave={onLeave}
            />
          )),
        )}
      </div>
    </div>
  );
}

function ModuleCard({
  mod,
  index,
  duplicate,
  onMove,
  onLeave,
}: {
  mod: ModuleItem;
  index: number;
  duplicate: boolean;
  onMove: (event: MouseEvent<HTMLElement>) => void;
  onLeave: (event: MouseEvent<HTMLElement>) => void;
}) {
  const Icon = moduleIcons[mod.id] ?? Satellite;

  return (
    <article
      aria-hidden={duplicate || undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="module-card module-card-interactive glass-panel group relative w-77.5 shrink-0 overflow-hidden rounded-xl p-5 will-change-transform sm:w-87.5"
    >
      <div className="module-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative mb-4 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/15 bg-cyan-400/5 text-cyan-300 transition duration-500 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_24px_rgba(34,211,238,.12)]">
          <Icon className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-slate-600">
          SYS-{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative mb-5 h-28 overflow-hidden rounded-md border border-white/5 bg-[#030711]/80">
        <ModuleVisual id={mod.id} />
        <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-wider text-cyan-400/40">
          live simulation
        </span>
      </div>
      <div className="relative">
        <h3 className="text-lg font-medium text-slate-100 transition-colors group-hover:text-white">{mod.title}</h3>
        <p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-400">{mod.description}</p>
        <div className="mt-5 h-px w-full overflow-hidden bg-white/5">
          <div className="h-full w-0 bg-linear-to-r from-cyan-400 to-violet-500 transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </article>
  );
}
