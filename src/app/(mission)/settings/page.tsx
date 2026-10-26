import { cookies } from "next/headers";
import { getProfile } from "@/lib/data/services/auth";
import { MissionPageHeader } from "@/components/mission/MissionPageHeader";
import { GlassPanel } from "@/components/mission/GlassPanel";
import { TelemetryRow } from "@/components/mission/TelemetryRow";

export default async function SettingsPage() {
  const token = (await cookies()).get("astrowave_session")?.value ?? "";
  const { data: user } = await getProfile(token);
  const station = user.groundStation;

  return (
    <>
      <MissionPageHeader
        title="Settings"
        description="Operator identity and the ground station location used to predict passes."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <GlassPanel title="Operator">
          <TelemetryRow label="Name" value={user.name} />
          <TelemetryRow label="Email" value={user.email} />
          {user.phone ? <TelemetryRow label="Phone" value={user.phone} /> : null}
        </GlassPanel>
        <GlassPanel title="Ground station">
          <TelemetryRow label="Station" value={station.name} />
          <TelemetryRow label="Latitude" value={`${station.latitude}°`} />
          <TelemetryRow label="Longitude" value={`${station.longitude}°`} />
          <TelemetryRow label="Altitude" value={`${station.altitudeM} m`} />
        </GlassPanel>
      </div>
    </>
  );
}
