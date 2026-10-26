"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Antenna,
  Binary,
  Braces,
  CircleDotDashed,
  Cpu,
  Database,
  Orbit,
  Radio,
  Satellite,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PlanetOrbitScene = dynamic(
  () => import("./PlanetOrbitScene").then((m) => m.PlanetOrbitScene),
  { ssr: false },
);

const STEPS = [
  { label: "Satellite", detail: "145.825 MHz", icon: Satellite },
  { label: "Orbit", detail: "SGP4 / TLE", icon: Orbit },
  { label: "Antenna", detail: "AZ / EL", icon: Antenna },
  { label: "RF", detail: "VHF / UHF", icon: Radio },
  { label: "SDR", detail: "2.4 MSPS", icon: CircleDotDashed },
  { label: "IQ", detail: "I + jQ", icon: Binary },
  { label: "DSP", detail: "FIR / FFT", icon: Cpu },
  { label: "Decoder", detail: "CRC / FEC", icon: Braces },
  { label: "Data", detail: "Telemetry", icon: Database },
];

export function HowItWorksFlow() {
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!path || !dot || !glow) return;

    const len = path.getTotalLength();
    const proxy = { t: 0 };

    const setGlow = (values: number[]) => {
      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        node.style.setProperty("--glow", String(values[index] ?? 0));
      });
    };

    const updateSignal = () => {
      const pos = proxy.t * STEPS.length;
      const values = STEPS.map((_, i) => {
        const dist = pos - i;
        if (dist < -0.2) return 0;
        if (dist < 0.55) return Math.min(1, (dist + 0.2) / 0.75);
        return Math.max(0, 1 - (dist - 0.55) / 2.4);
      });
      setGlow(values);
      const pt = path.getPointAtLength(Math.min(0.999, proxy.t) * len);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      glow.setAttribute("cx", String(pt.x));
      glow.setAttribute("cy", String(pt.y));
    };

    const timeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    timeline.set(dot, { opacity: 1, scale: 1 });
    timeline.set(glow, { opacity: 0.9, scale: 1 });
    timeline.to(proxy, {
      t: 1,
      duration: 8.4,
      onUpdate: updateSignal,
    });
    const fade = { k: 0 };
    let peak: number[] = [];
    timeline.call(() => {
      peak = nodeRefs.current.map((node) => Number(node?.style.getPropertyValue("--glow") || 0));
      fade.k = 0;
    });
    timeline.to(fade, {
      k: 1,
      duration: 1.5,
      ease: "power1.out",
      onUpdate: () => {
        nodeRefs.current.forEach((node, i) => {
          node?.style.setProperty("--glow", String((peak[i] ?? 0) * (1 - fade.k)));
        });
      },
    });
    timeline.to([dot, glow], { opacity: 0, scale: 0.25, duration: 0.4 }, "<0.2");
    timeline.set(proxy, { t: 0 });
    timeline.call(() => setGlow(Array(STEPS.length).fill(0)));
    timeline.to({}, { duration: 0.6 });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative overflow-hidden px-6 py-32">
      <PlanetOrbitScene
        variant="rings"
        className="pointer-events-none absolute -right-24 top-6 h-[26rem] w-[26rem] opacity-85 sm:-right-10 sm:h-[32rem] sm:w-[32rem]"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-136 w-240 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-500/5" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-violet-300/70">
              Signal path · end-to-end
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">How it works</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400 md:justify-self-end">
            Follow a downlink from a moving spacecraft through the atmosphere, into your
            antenna and SDR, then through the digital processing chain.
          </p>
        </div>
        <div className="relative mt-16 overflow-x-auto rounded-xl border border-white/10 bg-[#050914]/80 p-5 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.025)_1px,transparent_1px)] bg-size-[24px_24px]" />
          <svg viewBox="0 0 1000 170" className="relative min-w-225 w-full">
            <path
              ref={pathRef}
              d="M52 82 C180 35 250 130 390 82 S620 35 724 82 S870 125 948 82"
              fill="none"
              stroke="rgba(34,211,238,0.25)"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />
            <circle ref={glowRef} r="16" fill="#22d3ee" opacity="0.16" />
            <circle ref={dotRef} r="5" fill="#d8fbff" className="drop-shadow-[0_0_9px_#22d3ee]" />
          </svg>
          <div className="relative -mt-37.5 grid min-w-225 grid-cols-9 gap-3 px-2 pb-5 pt-9">
            {STEPS.map(({ label, detail, icon: Icon }, i) => (
              <FlowNode
                key={label}
                icon={Icon}
                label={label}
                detail={detail}
                index={i}
                nodeRef={(node) => {
                  nodeRefs.current[i] = node;
                }}
              />
            ))}
          </div>
          <div className="relative mt-1 flex items-center justify-between border-t border-white/5 px-2 pt-3 font-mono text-[8px] uppercase tracking-[.22em] text-slate-600">
            <span>Source: LEO spacecraft</span>
            <span className="flex items-center gap-2 text-cyan-400/60">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              Packet in transit
            </span>
            <span>Destination: station data</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({
  icon: Icon,
  label,
  detail,
  index,
  nodeRef,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  index: number;
  nodeRef: (node: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={nodeRef}
      className="flow-node group flex flex-col items-center text-center"
      style={{ "--glow": 0 } as React.CSSProperties}
    >
      <div className="flow-node-core relative flex h-12 w-12 items-center justify-center rounded-full border bg-[#0b1221]">
        <span className="flow-node-halo pointer-events-none absolute -inset-2.5 rounded-full border" />
        <Icon className="flow-node-icon h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-[#080d18] font-mono text-[7px] text-slate-600">
          {index + 1}
        </span>
      </div>
      <p className="flow-node-label mt-3 text-[11px] font-medium">{label}</p>
      <p className="flow-node-detail mt-1 font-mono text-[8px]">{detail}</p>
    </div>
  );
}
