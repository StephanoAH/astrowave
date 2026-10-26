import { listPasses } from "@/lib/data/services/passes";
import { MissionPageHeader } from "@/components/mission/MissionPageHeader";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { SimpleTable } from "@/components/mission/SimpleTable";

export default async function PassesPage() {
  const { data: passes } = await listPasses();

  return (
    <>
      <MissionPageHeader
        title="Passes"
        description="Predicted AOS/LOS windows for your ground station coordinates."
      />
      <GlassPanel title="Pass schedule">
        <SimpleTable
          headers={["Satellite", "AOS (UTC)", "Max El", "Duration", "MHz"]}
          rows={passes.map((p) => [
            p.satelliteName,
            new Date(p.aos).toISOString().slice(0, 16).replace("T", " "),
            `${p.maxElevationDeg.toFixed(1)}°`,
            `${Math.round(p.durationSec / 60)} min`,
            p.frequencyMhz,
          ])}
        />
      </GlassPanel>
      <div className="mt-6 glass-panel p-6">
        <h3 className="mb-4 font-mono text-xs uppercase text-slate-500">Elevation profile</h3>
        <svg viewBox="0 0 600 120" className="w-full">
          <path
            d="M0 100 Q150 20 300 30 T600 100"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <line x1="0" y1="100" x2="600" y2="100" stroke="#334155" />
        </svg>
      </div>
    </>
  );
}
