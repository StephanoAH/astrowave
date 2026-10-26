import { getSdrStatus } from "@/lib/data/services/sdr";
import { MissionPageHeader } from "@/components/mission/MissionPageHeader";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { TelemetryRow } from "@/components/mission/TelemetryRow";

export default async function SdrPage() {
  const { data: sdr } = await getSdrStatus();

  return (
    <>
      <MissionPageHeader
        title="SDR"
        description="Software-defined radio configuration and device health."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <GlassPanel title="Device">
          <TelemetryRow label="Status" value={sdr.connected ? "CONNECTED" : "OFFLINE"} />
          <TelemetryRow label="Device" value={sdr.device} />
          <TelemetryRow label="Sample rate" value={`${sdr.sampleRateHz} Hz`} />
          <TelemetryRow label="Center freq" value={`${sdr.centerFreqMhz} MHz`} />
          <TelemetryRow label="Gain" value={`${sdr.gainDb} dB`} />
          <TelemetryRow label="PPM" value={sdr.ppm} />
          <TelemetryRow label="CPU" value={`${sdr.cpuPercent}%`} />
        </GlassPanel>
        <GlassPanel title="IQ pipeline">
          <p className="text-sm text-slate-400">
            Samples pass through filtering, decimation, and demodulation before they are
            recorded or decoded.
          </p>
          <svg viewBox="0 0 400 80" className="mt-6 w-full">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={20 + i * 75}
                y={30 - Math.sin(i) * 15}
                width="8"
                height={40 + Math.cos(i) * 10}
                fill="#22d3ee"
                opacity={0.5 + i * 0.1}
              />
            ))}
          </svg>
        </GlassPanel>
      </div>
    </>
  );
}
