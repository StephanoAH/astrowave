import { listFrequencies } from "@/lib/data/services/catalog";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { SimpleTable } from "@/components/mission/SimpleTable";
import { GlassPanel } from "@/components/mission/GlassPanel";

export default async function FrequenciesPage() {
  const { data } = await listFrequencies();
  return (
    <ModuleStub title="Frequencies" description="Downlink frequency plan and mode metadata.">
      <GlassPanel>
        <SimpleTable
          headers={["Satellite", "MHz", "Mode", "BW kHz"]}
          rows={data.map((f) => [f.satelliteName, f.downlinkMhz, f.mode, f.bandwidthKhz])}
        />
      </GlassPanel>
    </ModuleStub>
  );
}
