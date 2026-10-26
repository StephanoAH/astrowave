import { listRecordings } from "@/lib/data/services/catalog";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { SimpleTable } from "@/components/mission/SimpleTable";
import { GlassPanel } from "@/components/mission/GlassPanel";

export default async function RecordingsPage() {
  const { data } = await listRecordings();
  return (
    <ModuleStub title="Recordings" description="IQ and audio archives linked to passes.">
      <GlassPanel>
        <SimpleTable
          headers={["Satellite", "MHz", "Format", "Size MB", "Created"]}
          rows={data.map((r) => [
            r.satellite,
            r.frequencyMhz,
            r.format,
            r.sizeMb,
            new Date(r.createdAt).toLocaleDateString(),
          ])}
        />
      </GlassPanel>
    </ModuleStub>
  );
}
