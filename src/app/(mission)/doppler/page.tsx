import { getDashboard } from "@/lib/data/services/mission";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { DopplerChart } from "@/components/mission/DopplerChart";

export default async function DopplerPage() {
  const { data } = await getDashboard();
  const series = data.visible.map((v, i) => ({
    name: v.name,
    points: Array.from({ length: 20 }, (_, t) => ({
      t,
      hz: v.dopplerHz + Math.sin(t / 3 + i) * 400,
    })),
  }));

  return (
    <ModuleStub title="Doppler" description="Frequency shift compensation during LEO passes.">
      <GlassPanel title="Shift vs time">
        <DopplerChart series={series} />
      </GlassPanel>
    </ModuleStub>
  );
}
