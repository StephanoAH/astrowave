export function TelemetryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-2 text-sm last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-mono text-cyan-100/90">{value}</span>
    </div>
  );
}
