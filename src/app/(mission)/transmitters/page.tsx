import { listTransmitters } from "@/lib/data/services/catalog";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { SimpleTable } from "@/components/mission/SimpleTable";
import { GlassPanel } from "@/components/mission/GlassPanel";

export default async function TransmittersPage() {
  const { data } = await listTransmitters();
  return (
    <ModuleStub title="Transmitters" description="Spacecraft transmitter specifications.">
      <GlassPanel>
        <SimpleTable
          headers={["Satellite", "Callsign", "MHz", "Mode", "Power dBm"]}
          rows={data.map((t) => [t.satelliteName, t.callsign, t.frequencyMhz, t.mode, t.powerDbm])}
        />
      </GlassPanel>
    </ModuleStub>
  );
}
