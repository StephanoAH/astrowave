export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type GroundStation = {
  name: string;
  latitude: number;
  longitude: number;
  altitudeM: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  groundStation: GroundStation;
};

export type AuthLoginData = {
  token: string;
  user: User;
};

export type Satellite = {
  id: string;
  name: string;
  noradId: number;
  category: string;
  status: "active" | "decayed" | "standby";
  inclinationDeg: number;
  periodMin: number;
  tleLine1: string;
  tleLine2: string;
};

export type Pass = {
  id: string;
  satelliteId: string;
  satelliteName: string;
  aos: string;
  los: string;
  maxElevationDeg: number;
  durationSec: number;
  frequencyMhz: number;
};

export type VisibleSatellite = {
  satelliteId: string;
  name: string;
  azimuthDeg: number;
  elevationDeg: number;
  rangeKm: number;
  frequencyMhz: number;
  snrDb: number;
  dopplerHz: number;
};

export type SdrStatus = {
  connected: boolean;
  device: string;
  sampleRateHz: number;
  centerFreqMhz: number;
  gainDb: number;
  ppm: number;
  cpuPercent: number;
};

export type AntennaStatus = {
  name: string;
  type: string;
  azimuthDeg: number;
  elevationDeg: number;
  tracking: boolean;
  rotatorOnline: boolean;
};

export type SystemHealth = {
  sdrCpuPercent: number;
  diskFreeGb: number;
  recordingsCount: number;
  lastObservation: string;
  uptimeHours: number;
};

export type MissionPreview = {
  upcomingPasses: Pass[];
  aboveHorizon: VisibleSatellite[];
  antenna: AntennaStatus;
  sdr: SdrStatus;
  recentObservations: { id: string; satellite: string; time: string; snrDb: number }[];
};

export type DashboardData = {
  passes: Pass[];
  visible: VisibleSatellite[];
  health: SystemHealth;
  antenna: AntennaStatus;
  sdr: SdrStatus;
  spectrumBins: number[];
  recordings: { id: string; satellite: string; durationSec: number; createdAt: string }[];
  orbitSatellites: { id: string; name: string; angleRad: number; altitudeKm: number }[];
};

export type FrequencyEntry = {
  id: string;
  satelliteId: string;
  satelliteName: string;
  downlinkMhz: number;
  mode: string;
  bandwidthKhz: number;
};

export type Transmitter = {
  id: string;
  satelliteName: string;
  callsign: string;
  frequencyMhz: number;
  mode: string;
  powerDbm: number;
};

export type TelemetryFrame = {
  id: string;
  satellite: string;
  timestamp: string;
  batteryV: number;
  tempC: number;
  solarMA: number;
  rawHex: string;
};

export type Recording = {
  id: string;
  satellite: string;
  frequencyMhz: number;
  format: string;
  sizeMb: number;
  createdAt: string;
};

export type Observation = {
  id: string;
  satellite: string;
  aos: string;
  maxElDeg: number;
  decoded: boolean;
  notes: string;
};
