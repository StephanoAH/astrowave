import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "cyan" | "violet" }) {
  const variants = {
    default: "border-white/15 bg-white/5 text-slate-300",
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
