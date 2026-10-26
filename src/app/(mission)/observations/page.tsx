import { listObservations } from "@/lib/data/services/catalog";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { SimpleTable } from "@/components/mission/SimpleTable";
import { GlassPanel } from "@/components/mission/GlassPanel";

export default async function ObservationsPage() {
  const { data } = await listObservations();
  return (
    <ModuleStub title="Observations" description="Pass logs and decode outcomes.">
      <GlassPanel>
        <SimpleTable
          headers={["Satellite", "AOS", "Max El", "Decoded", "Notes"]}
          rows={data.map((o) => [
            o.satellite,
            new Date(o.aos).toLocaleString(),
            `${o.maxElDeg}°`,
            o.decoded ? "YES" : "NO",
            o.notes,
          ])}
        />
      </GlassPanel>
    </ModuleStub>
  );
}
