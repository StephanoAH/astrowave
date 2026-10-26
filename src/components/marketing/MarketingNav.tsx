import Link from "next/link";
import { getAppName } from "@/lib/data/client";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-[rgba(3,5,8,0.75)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-widest text-white">
          {getAppName()}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <a href="#modules" className="hover:text-cyan-300">Modules</a>
          <a href="#how-it-works" className="hover:text-cyan-300">How it works</a>
          <a href="#mission-preview" className="hover:text-cyan-300">Preview</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
