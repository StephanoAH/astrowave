import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Antenna,
  AudioWaveform,
  Compass,
  Gauge,
  LayoutDashboard,
  Orbit,
  Radio,
  Satellite,
  Settings,
  Signal,
  Telescope,
  Waves,
  FileAudio,
  ClipboardList,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group: "Operations" | "RF" | "Data" | "System";
};

export const missionNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Operations" },
  { href: "/satellites", label: "Satellites", icon: Satellite, group: "Operations" },
  { href: "/orbital-tracking", label: "Orbital Tracking", icon: Orbit, group: "Operations" },
  { href: "/passes", label: "Passes", icon: Compass, group: "Operations" },
  { href: "/frequencies", label: "Frequencies", icon: Radio, group: "RF" },
  { href: "/transmitters", label: "Transmitters", icon: Signal, group: "RF" },
  { href: "/antennas", label: "Antennas", icon: Antenna, group: "RF" },
  { href: "/sdr", label: "SDR", icon: AudioWaveform, group: "RF" },
  { href: "/spectrum", label: "Spectrum", icon: Waves, group: "RF" },
  { href: "/signals", label: "Signals", icon: Activity, group: "RF" },
  { href: "/doppler", label: "Doppler", icon: Gauge, group: "RF" },
  { href: "/telemetry", label: "Telemetry", icon: Telescope, group: "Data" },
  { href: "/recordings", label: "Recordings", icon: FileAudio, group: "Data" },
  { href: "/observations", label: "Observations", icon: ClipboardList, group: "Data" },
  { href: "/settings", label: "Settings", icon: Settings, group: "System" },
];
