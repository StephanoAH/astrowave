import { getDashboard } from "@/lib/data/services/mission";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { SpectrumCanvas } from "@/components/mission/SpectrumCanvas";

export default async function SignalsPage() {
  const { data } = await getDashboard();
  return (
    <ModuleStub title="Signals" description="RF signal activity and strength metrics.">
      <GlassPanel title="Live spectrum snapshot">
        <SpectrumCanvas bins={data.spectrumBins} />
      </GlassPanel>
      {data.visible.map((v) => (
        <GlassPanel key={v.satelliteId} className="mt-4" title={v.name}>
          <p className="font-mono text-xs text-slate-300">
            SNR {v.snrDb} dB · {v.frequencyMhz} MHz · Doppler {v.dopplerHz} Hz
          </p>
        </GlassPanel>
      ))}
    </ModuleStub>
  );
}
