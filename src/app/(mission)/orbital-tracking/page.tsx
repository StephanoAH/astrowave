import { listSatellites } from "@/lib/data/services/satellites";
import { ModuleStub } from "@/components/mission/ModuleStub";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { EarthOrbitView } from "@/components/mission/EarthOrbitView";

export default async function OrbitalTrackingPage() {
  const { data } = await listSatellites();
  const orbitSatellites = data.map((s, i) => ({
    id: s.id,
    name: s.name,
    angleRad: i * 1.2,
    altitudeKm: 400 + i * 200,
  }));

  return (
    <ModuleStub
      title="Orbital Tracking"
      description="Ground tracks and propagation from TLE elements."
    >
      <GlassPanel title="2D ground track projection">
        <EarthOrbitView satellites={orbitSatellites} />
      </GlassPanel>
    </ModuleStub>
  );
}
