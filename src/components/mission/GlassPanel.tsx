import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  title,
  children,
}: {
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("glass-panel rounded-lg p-4", className)}>
      {title && (
        <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-slate-400">{title}</h3>
      )}
      {children}
    </div>
  );
}
