import { getDashboard } from "@/lib/data/services/mission";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { TelemetryRow } from "@/components/mission/TelemetryRow";

export default async function AntennasPage() {
  const { data } = await getDashboard();
  const a = data.antenna;
  return (
    <ModuleStub title="Antennas" description="Pointing, gain, and rotator status.">
      <GlassPanel>
        <TelemetryRow label="Antenna" value={a.name} />
        <TelemetryRow label="Type" value={a.type} />
        <TelemetryRow label="Azimuth" value={`${a.azimuthDeg}°`} />
        <TelemetryRow label="Elevation" value={`${a.elevationDeg}°`} />
        <TelemetryRow label="Tracking" value={a.tracking ? "ON" : "OFF"} />
        <TelemetryRow label="Rotator" value={a.rotatorOnline ? "ONLINE" : "OFFLINE"} />
      </GlassPanel>
    </ModuleStub>
  );
}
