type Props = {
  title: string;
  description?: string;
  updatedAt?: string;
};

export function MissionPageHeader({ title, description, updatedAt }: Props) {
  return (
    <header className="mb-8 border-b border-white/10 pb-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
        Ground Station / {title}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-white">{title}</h1>
      {description && <p className="mt-2 max-w-3xl text-sm text-slate-400">{description}</p>}
      {updatedAt && (
        <p className="mt-3 font-mono text-xs text-cyan-500/70">Last sync {updatedAt}</p>
      )}
    </header>
  );
}
