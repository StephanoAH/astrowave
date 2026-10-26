"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Radio, Shield } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard";
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
      );
    }, formRef);
    return () => ctx.revert();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      setLoading(false);
      setError(json.message || "Login failed");
      return;
    }

    gsap.killTweensOf(document.body);
    gsap.set(document.body, { clearProps: "opacity,filter,transform" });
    document.body.style.opacity = "1";

    if (formRef.current) {
      await gsap.to(formRef.current, {
        y: -12,
        opacity: 0.35,
        duration: 0.28,
        ease: "power2.in",
      });
    }
    router.push(from);
    router.refresh();
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="login-console relative w-full max-w-md space-y-5 overflow-hidden rounded-2xl border border-cyan-400/35 bg-[#0b1428]/95 p-8 shadow-[0_0_80px_rgba(34,211,238,0.18),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300">
          Access terminal
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase text-emerald-300/80">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
          Uplink ready
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
          <Shield className="h-4 w-4" />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-white">Enter Mission Control</h1>
          <p className="mt-1 text-sm text-slate-300">Authenticate to open the ground station.</p>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-300">Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          className="border-cyan-400/20 bg-[#06101f] text-slate-100"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-300">Password</label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          className="border-cyan-400/20 bg-[#06101f] text-slate-100"
        />
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        <Radio className="h-4 w-4" />
        {loading ? "Authenticating…" : "Launch session"}
      </Button>
    </form>
  );
}
