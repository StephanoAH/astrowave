import { getAppName } from "@/lib/data/client";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {getAppName()} · Amateur satellite ground station platform
        </p>
      </div>
    </footer>
  );
}
