import { listTelemetry } from "@/lib/data/services/catalog";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { TelemetryRow } from "@/components/mission/TelemetryRow";

export default async function TelemetryPage() {
  const { data } = await listTelemetry();
  const frame = data[0];
  return (
    <ModuleStub title="Telemetry" description="Decoded engineering frames from spacecraft.">
      {frame && (
        <GlassPanel title={frame.satellite}>
          <TelemetryRow label="Timestamp" value={frame.timestamp} />
          <TelemetryRow label="Battery" value={`${frame.batteryV} V`} />
          <TelemetryRow label="Temp" value={`${frame.tempC} °C`} />
          <TelemetryRow label="Solar" value={`${frame.solarMA} mA`} />
          <TelemetryRow label="Raw" value={frame.rawHex} />
        </GlassPanel>
      )}
    </ModuleStub>
  );
}
