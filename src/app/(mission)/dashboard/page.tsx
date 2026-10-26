import { getDashboard } from "@/lib/data/services/mission";
import { MissionPageHeader } from "@/components/mission/MissionPageHeader";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { TelemetryRow } from "@/components/mission/TelemetryRow";
import { EarthOrbitView } from "@/components/mission/EarthOrbitView";
import { SpectrumCanvas } from "@/components/mission/SpectrumCanvas";
import { WaterfallCanvas } from "@/components/mission/WaterfallCanvas";
import { MissionReveal } from "@/components/mission/MissionReveal";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
}

export default async function DashboardPage() {
  const { data } = await getDashboard();

  return (
    <MissionReveal>
      <div className="mission-reveal">
        <MissionPageHeader
          title="Dashboard"
          description="Live overview of orbital traffic, RF activity, and station health."
          updatedAt={new Date().toLocaleTimeString()}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="mission-reveal lg:col-span-2">
          <GlassPanel title="Earth / orbit">
            <EarthOrbitView satellites={data.orbitSatellites} />
          </GlassPanel>
        </div>
        <GlassPanel title="System health" className="mission-reveal">
          <TelemetryRow label="SDR CPU" value={`${data.health.sdrCpuPercent}%`} />
          <TelemetryRow label="Disk free" value={`${data.health.diskFreeGb} GB`} />
          <TelemetryRow label="Recordings" value={data.health.recordingsCount} />
          <TelemetryRow label="Uptime" value={`${data.health.uptimeHours} h`} />
        </GlassPanel>
        <GlassPanel title="Upcoming passes" className="mission-reveal">
          <ul className="space-y-2 text-sm">
            {data.passes.map((p) => (
              <li key={p.id} className="border-b border-white/5 pb-2 text-slate-300">
                {p.satelliteName}
                <span className="mt-1 block font-mono text-xs text-cyan-400/80">
                  {fmt(p.aos)} · {p.maxElevationDeg.toFixed(1)}°
                </span>
              </li>
            ))}
          </ul>
        </GlassPanel>
        <GlassPanel title="Above horizon" className="mission-reveal">
          {data.visible.map((v) => (
            <TelemetryRow
              key={v.satelliteId}
              label={v.name}
              value={`EL ${v.elevationDeg}° SNR ${v.snrDb}dB`}
            />
          ))}
        </GlassPanel>
        <GlassPanel title="Spectrum" className="mission-reveal lg:col-span-2">
          <SpectrumCanvas bins={data.spectrumBins} live />
          <div className="mt-4">
            <WaterfallCanvas />
          </div>
        </GlassPanel>
        <GlassPanel title="Recent recordings" className="mission-reveal">
          {data.recordings.map((r) => (
            <TelemetryRow
              key={r.id}
              label={r.satellite}
              value={`${r.durationSec}s · ${fmt(r.createdAt)}`}
            />
          ))}
        </GlassPanel>
      </div>
    </MissionReveal>
  );
}
