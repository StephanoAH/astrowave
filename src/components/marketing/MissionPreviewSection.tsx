import { getMissionPreview } from "@/lib/data/services/mission";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
}

export async function MissionPreviewSection() {
  const { data } = await getMissionPreview();

  return (
    <section id="mission-preview" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-600/8 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400/70">
              Operational environment · preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
              Mission Control
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-slate-400">
            One surface for orbital traffic, radio state, and station hardware. The same
            picture you see after you sign in.
          </p>
        </div>
        <div className="mt-14 overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#050914]/90 shadow-[0_40px_140px_rgba(0,0,0,.55),0_0_80px_rgba(34,211,238,.04)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-white/[.02] px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5">
                <i className="h-2 w-2 rounded-full bg-slate-700" />
                <i className="h-2 w-2 rounded-full bg-slate-700" />
                <i className="h-2 w-2 rounded-full bg-slate-700" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-slate-500">
                AstroWave / GS-ALPHA / OPS
              </span>
            </div>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase text-emerald-300/70">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" />
              All systems nominal
            </span>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-3">
          <Card className="group relative overflow-hidden border-white/8 transition duration-500 hover:-translate-y-1 hover:border-cyan-400/25 lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-400">
                Upcoming passes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.upcomingPasses.map((p, index) => (
                <div
                  key={p.id}
                  className="group/row grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/5 pb-3 text-sm last:border-0"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/[.02] font-mono text-[9px] text-slate-500 transition group-hover/row:border-cyan-400/30 group-hover/row:text-cyan-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-slate-200">{p.satelliteName}</span>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500/60 to-cyan-400/80 transition-all duration-700 group-hover/row:brightness-150"
                        style={{ width: `${Math.max(18, p.maxElevationDeg)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-right font-mono text-[10px] leading-5 text-cyan-300/80">
                    {formatTime(p.aos)} · max {p.maxElevationDeg.toFixed(1)}° · {p.frequencyMhz} MHz
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="group relative overflow-hidden border-white/8 transition duration-500 hover:-translate-y-1 hover:border-violet-400/25">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-cyan-400/10 transition-transform duration-[1600ms] group-hover:rotate-45 group-hover:scale-110">
              <div className="absolute inset-5 rounded-full border border-dashed border-violet-400/15" />
            </div>
            <CardHeader>
              <CardTitle className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-400">
                SDR / Antenna
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-3 font-mono text-[10px] text-slate-300">
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-600">SDR</span><span>{data.sdr.connected ? "ONLINE" : "OFFLINE"}</span></p>
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-600">CENTER</span><span>{data.sdr.centerFreqMhz} MHz</span></p>
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-600">SAMPLE</span><span>{data.sdr.sampleRateHz / 1e6} MSPS</span></p>
              <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-600">AZ / EL</span><span>{data.antenna.azimuthDeg}° / {data.antenna.elevationDeg}°</span></p>
              <div className="pt-2">
                <div className="flex h-10 items-end gap-1">
                  {[22, 48, 34, 72, 48, 82, 58, 36, 68, 42, 76, 28].map((h, i) => (
                    <i
                      key={i}
                      className="spectrum-bar flex-1 rounded-t-sm bg-cyan-400/45"
                      style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/8 transition duration-500 hover:border-cyan-400/20 lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-mono text-[10px] uppercase tracking-[.18em] text-slate-400">
                Above horizon · live acquisition
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {data.aboveHorizon.map((s) => (
                <div key={s.satelliteId} className="group/track grid grid-cols-[72px_1fr] gap-4 rounded-lg border border-white/8 bg-black/20 p-3 transition duration-500 hover:bg-cyan-950/20">
                  <div className="relative h-[72px] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(34,211,238,.08)_1px,transparent_1px)] bg-[size:9px_9px]">
                    <span className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left rotate-[35deg] bg-cyan-300/30" />
                    <span className="absolute left-[72%] top-[33%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_#22d3ee]" />
                  </div>
                  <div className="self-center">
                    <p className="font-medium text-slate-100">{s.name}</p>
                    <p className="mt-2 font-mono text-[10px] text-slate-400">
                      AZ {s.azimuthDeg.toFixed(1)}° · EL {s.elevationDeg.toFixed(1)}° · {s.frequencyMhz} MHz
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-cyan-400/90">
                      SNR {s.snrDb} dB · Doppler {s.dopplerHz} Hz
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          </div>
          <div className="flex flex-wrap justify-between gap-3 border-t border-white/8 px-5 py-3 font-mono text-[8px] uppercase tracking-[.15em] text-slate-600">
            <span>UTC synchronized</span>
            <span>Rotator bus: healthy</span>
            <span>Packet queue: 04</span>
            <span>Recorder armed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
