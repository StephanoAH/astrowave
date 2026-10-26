import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-0 starfield opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_62%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]" />
      <div className="pointer-events-none absolute -right-16 bottom-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-[80px]" />
      <Suspense fallback={<div className="h-96 w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#0b1428]" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
