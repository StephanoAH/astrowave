import { listSatellites } from "@/lib/data/services/satellites";
import { MissionPageHeader } from "@/components/mission/MissionPageHeader";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { SimpleTable } from "@/components/mission/SimpleTable";

export default async function SatellitesPage() {
  const { data: satellites } = await listSatellites();

  return (
    <>
      <MissionPageHeader
        title="Satellites"
        description="NORAD catalog entries with TLE lines and orbital parameters."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel title="Catalog">
          <SimpleTable
            headers={["Name", "NORAD", "Inc°", "Period", "Status"]}
            rows={satellites.map((s) => [
              s.name,
              s.noradId,
              s.inclinationDeg.toFixed(2),
              `${s.periodMin.toFixed(1)} min`,
              s.status,
            ])}
          />
        </GlassPanel>
        <GlassPanel title="TLE — primary selection">
          {satellites[0] && (
            <pre className="overflow-x-auto rounded bg-black/40 p-4 font-mono text-xs leading-relaxed text-cyan-100/80">
              {satellites[0].tleLine1}
              {"\n"}
              {satellites[0].tleLine2}
            </pre>
          )}
          <svg viewBox="0 0 300 200" className="mt-4 w-full opacity-80">
            <ellipse cx="150" cy="100" rx="120" ry="45" fill="none" stroke="#334155" />
            <ellipse cx="150" cy="100" rx="80" ry="28" fill="none" stroke="#22d3ee" strokeDasharray="4 4" />
            <circle cx="220" cy="85" r="5" fill="#8b5cf6" />
          </svg>
        </GlassPanel>
      </div>
    </>
  );
}
