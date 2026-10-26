import { getDashboard } from "@/lib/data/services/mission";
import { MissionPageHeader } from "@/components/mission/MissionPageHeader";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { SpectrumCanvas } from "@/components/mission/SpectrumCanvas";
import { WaterfallCanvas } from "@/components/mission/WaterfallCanvas";

export default async function SpectrumPage() {
  const { data } = await getDashboard();

  return (
    <>
      <MissionPageHeader
        title="Spectrum"
        description="FFT magnitude and waterfall display for the current SDR center frequency."
      />
      <div className="grid gap-6">
        <GlassPanel title={`Center ${data.sdr.centerFreqMhz} MHz · ${data.sdr.sampleRateHz / 1e6} Msps`}>
          <SpectrumCanvas bins={data.spectrumBins} />
        </GlassPanel>
        <GlassPanel title="Waterfall">
          <WaterfallCanvas rows={64} />
        </GlassPanel>
      </div>
    </>
  );
}
