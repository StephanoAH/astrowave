"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Radio, Satellite, Signal } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { RfWaveOverlay } from "./RfWaveOverlay";

gsap.registerPlugin(ScrollTrigger);

const GalaxyScene = dynamic(() => import("./GalaxyScene").then((m) => m.GalaxyScene), {
  ssr: false,
});

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const pingRef = useRef<HTMLDivElement>(null);
  const [konami, setKonami] = useState(false);
  const sequence = useRef<string[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.to(".hero-parallax-stars", {
        backgroundPosition: "100% 50%",
        duration: 30,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".hero-depth-far", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(".hero-depth-near", {
        yPercent: 44,
        rotate: 4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(".hero-copy", {
        yPercent: 22,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "35% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      sequence.current.push(e.key);
      if (sequence.current.length > KONAMI.length) sequence.current.shift();
      if (KONAMI.every((k, i) => sequence.current[i] === k)) {
        setKonami(true);
        sequence.current = [];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onConstellationDblClick = () => {
    if (!pingRef.current) return;
    gsap.fromTo(
      pingRef.current,
      { scale: 0.2, opacity: 0.9 },
      { scale: 3, opacity: 0, duration: 1.2, ease: "power2.out" },
    );
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-28"
    >
      <GalaxyScene />
      <div className="hero-depth-far hero-parallax-stars absolute -inset-[8%] starfield opacity-40" />
      <div className="hero-depth-near pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-[120px]" />
      <RfWaveOverlay />
      <div
        className="absolute left-1/2 top-[22%] h-16 w-16 -translate-x-1/2 cursor-crosshair rounded-full border border-cyan-500/0"
        onDoubleClick={onConstellationDblClick}
        title="Deep space reference"
        aria-hidden
      >
        <div
          ref={pingRef}
          className="absolute inset-0 rounded-full border border-cyan-400/60 opacity-0"
        />
      </div>

      <div className="hero-copy relative z-10 mx-auto max-w-4xl text-center">
        <p className="hero-reveal mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan-400/80">
          AstroWave Mission Systems
        </p>
        <h1 className="hero-reveal text-4xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          Your Personal Ground Station
        </h1>
        <p className="hero-reveal mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Track satellites, predict passes, monitor frequencies, analyze signals, and connect
          directly to SDR hardware — from orbital mechanics to decoded telemetry.
        </p>
        <div className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <AnimatedButton variant="primary" size="lg" asChild>
            <a href="#modules">Explore the Station</a>
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg" asChild>
            <Link href="/login">Start Tracking</Link>
          </AnimatedButton>
        </div>
        <div className="hero-reveal mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 text-left sm:grid-cols-4">
          {[
            { icon: Satellite, label: "Tracked objects", value: "12,418" },
            { icon: Radio, label: "RF bands", value: "VHF · UHF" },
            { icon: Signal, label: "Link state", value: "STANDBY" },
            { icon: Activity, label: "Orbit engine", value: "SGP4" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="group bg-[#050912]/80 px-4 py-3 backdrop-blur-md transition-colors duration-500 hover:bg-cyan-950/40"
            >
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-slate-500">
                <Icon className="h-3 w-3 text-cyan-400/70 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                {label}
              </div>
              <p className="mt-2 font-mono text-xs text-slate-200">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-reveal absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a href="#modules" className="group flex flex-col items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">
          Scroll to acquire
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scan-down_1.8s_ease-in-out_infinite] bg-gradient-to-b from-transparent to-cyan-300" />
          </span>
        </a>
      </div>

      {konami && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-panel max-w-md p-8 text-center">
            <p className="font-mono text-xs text-cyan-400">LINK STATUS</p>
            <h2 className="mt-2 text-xl text-white">Deep Space Link Established</h2>
            <p className="mt-3 text-sm text-slate-400">
              Carrier lock simulated · SNR +24.1 dB · Doppler compensated
            </p>
            <Button className="mt-6" onClick={() => setKonami(false)}>Acknowledge</Button>
          </div>
        </div>
      )}
    </section>
  );
}
