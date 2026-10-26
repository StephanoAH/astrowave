import type {
  AntennaStatus,
  DashboardData,
  FrequencyEntry,
  MissionPreview,
  Observation,
  Pass,
  Recording,
  Satellite,
  SdrStatus,
  SystemHealth,
  TelemetryFrame,
  Transmitter,
  User,
  VisibleSatellite,
} from "../types";

export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "081234567890",
  groundStation: {
    name: "GS-ALPHA",
    latitude: 40.4168,
    longitude: -3.7038,
    altitudeM: 667,
  },
};

export const mockSatellites: Satellite[] = [
  {
    id: "iss",
    name: "ISS (ZARYA)",
    noradId: 25544,
    category: "crew",
    status: "active",
    inclinationDeg: 51.64,
    periodMin: 92.68,
    tleLine1: "1 25544U 98067A   25100.51782528  .00016717  00000+0  10270-3 0  9993",
    tleLine2: "2 25544  51.6416 247.4627 0006703  130.5360 325.0288 15.49519379412345",
  },
  {
    id: "noaa19",
    name: "NOAA 19",
    noradId: 33591,
    category: "weather",
    status: "active",
    inclinationDeg: 99.19,
    periodMin: 102.12,
    tleLine1: "1 33591U 09005A   25100.12345678  .00000085  00000+0  41234-4 0  9991",
    tleLine2: "2 33591  99.1920 180.0000 0012345  90.0000 270.0000 14.12345678901234",
  },
  {
    id: "funcube",
    name: "FUNcube-1 (AO-73)",
    noradId: 39444,
    category: "amateur",
    status: "active",
    inclinationDeg: 97.56,
    periodMin: 97.45,
    tleLine1: "1 39444U 13066AE  25100.98765432  .00001234  00000+0  23456-4 0  9998",
    tleLine2: "2 39444  97.5600 120.0000 0007890  45.0000 315.0000 14.78901234567890",
  },
];

const basePasses: Pass[] = [
  {
    id: "p1",
    satelliteId: "iss",
    satelliteName: "ISS (ZARYA)",
    aos: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    los: new Date(Date.now() + 58 * 60 * 1000).toISOString(),
    maxElevationDeg: 62.4,
    durationSec: 780,
    frequencyMhz: 145.825,
  },
  {
    id: "p2",
    satelliteId: "noaa19",
    satelliteName: "NOAA 19",
    aos: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    los: new Date(Date.now() + 2.25 * 60 * 60 * 1000).toISOString(),
    maxElevationDeg: 38.1,
    durationSec: 900,
    frequencyMhz: 137.1,
  },
  {
    id: "p3",
    satelliteId: "funcube",
    satelliteName: "FUNcube-1 (AO-73)",
    aos: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    los: new Date(Date.now() + 5.2 * 60 * 60 * 1000).toISOString(),
    maxElevationDeg: 71.2,
    durationSec: 720,
    frequencyMhz: 145.935,
  },
];

export const mockVisible: VisibleSatellite[] = [
  {
    satelliteId: "iss",
    name: "ISS (ZARYA)",
    azimuthDeg: 142.3,
    elevationDeg: 28.6,
    rangeKm: 1240,
    frequencyMhz: 145.825,
    snrDb: 18.4,
    dopplerHz: -2840,
  },
  {
    satelliteId: "funcube",
    name: "FUNcube-1",
    azimuthDeg: 310.8,
    elevationDeg: 12.1,
    rangeKm: 2100,
    frequencyMhz: 145.935,
    snrDb: 11.2,
    dopplerHz: 1200,
  },
];

export const mockSdr: SdrStatus = {
  connected: true,
  device: "RTL-SDR Blog V4",
  sampleRateHz: 2400000,
  centerFreqMhz: 137.1,
  gainDb: 36.4,
  ppm: 1,
  cpuPercent: 22,
};

export const mockAntenna: AntennaStatus = {
  name: "VHF/UHF Yagi 7-el",
  type: "directional",
  azimuthDeg: 142,
  elevationDeg: 29,
  tracking: true,
  rotatorOnline: true,
};

export const mockHealth: SystemHealth = {
  sdrCpuPercent: 22,
  diskFreeGb: 412,
  recordingsCount: 184,
  lastObservation: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  uptimeHours: 168.5,
};

export function generateSpectrumBins(count = 128): number[] {
  const bins: number[] = [];
  const t = Date.now() / 1000;
  for (let i = 0; i < count; i++) {
    const x = i / count;
    const carrier =
      Math.exp(-((x - 0.52) ** 2) / 0.002) * 0.9 +
      Math.exp(-((x - 0.38) ** 2) / 0.0008) * 0.4;
    const noise = (Math.random() - 0.5) * 0.08;
    const wobble = Math.sin(t * 2 + i * 0.15) * 0.02;
    bins.push(Math.max(0, Math.min(1, carrier + noise + wobble)));
  }
  return bins;
}

export function getMockMissionPreview(): MissionPreview {
  return {
    upcomingPasses: basePasses,
    aboveHorizon: mockVisible,
    antenna: mockAntenna,
    sdr: mockSdr,
    recentObservations: [
      { id: "o1", satellite: "NOAA 19", time: new Date(Date.now() - 6 * 3600000).toISOString(), snrDb: 14.2 },
      { id: "o2", satellite: "ISS", time: new Date(Date.now() - 14 * 3600000).toISOString(), snrDb: 19.1 },
    ],
  };
}

export function getMockDashboard(): DashboardData {
  return {
    passes: basePasses,
    visible: mockVisible,
    health: mockHealth,
    antenna: mockAntenna,
    sdr: mockSdr,
    spectrumBins: generateSpectrumBins(),
    recordings: [
      { id: "r1", satellite: "NOAA 19", durationSec: 540, createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: "r2", satellite: "ISS", durationSec: 720, createdAt: new Date(Date.now() - 172800000).toISOString() },
    ],
    orbitSatellites: [
      { id: "iss", name: "ISS", angleRad: 0.8, altitudeKm: 420 },
      { id: "noaa19", name: "NOAA 19", angleRad: 2.1, altitudeKm: 870 },
      { id: "funcube", name: "AO-73", angleRad: 4.5, altitudeKm: 720 },
    ],
  };
}

export const mockFrequencies: FrequencyEntry[] = [
  { id: "f1", satelliteId: "iss", satelliteName: "ISS", downlinkMhz: 145.825, mode: "FM", bandwidthKhz: 12.5 },
  { id: "f2", satelliteId: "noaa19", satelliteName: "NOAA 19", downlinkMhz: 137.1, mode: "APT", bandwidthKhz: 36 },
  { id: "f3", satelliteId: "funcube", satelliteName: "FUNcube-1", downlinkMhz: 145.935, mode: "BPSK", bandwidthKhz: 3 },
];

export const mockTransmitters: Transmitter[] = [
  { id: "t1", satelliteName: "ISS", callsign: "RS0ISS", frequencyMhz: 145.825, mode: "FM", powerDbm: 37 },
  { id: "t2", satelliteName: "NOAA 19", callsign: "NOAA-19", frequencyMhz: 137.1, mode: "APT", powerDbm: 43 },
];

export const mockTelemetry: TelemetryFrame[] = [
  {
    id: "tf1",
    satellite: "FUNcube-1",
    timestamp: new Date().toISOString(),
    batteryV: 7.82,
    tempC: 12.4,
    solarMA: 840,
    rawHex: "A3F2019C4B2E",
  },
];

export const mockRecordings: Recording[] = [
  { id: "rec1", satellite: "NOAA 19", frequencyMhz: 137.1, format: "WAV/IQ", sizeMb: 128, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "rec2", satellite: "ISS", frequencyMhz: 145.825, format: "WAV", sizeMb: 64, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export const mockObservations: Observation[] = [
  { id: "obs1", satellite: "NOAA 19", aos: new Date(Date.now() - 86400000).toISOString(), maxElDeg: 45, decoded: true, notes: "APT image partial" },
  { id: "obs2", satellite: "ISS", aos: new Date(Date.now() - 172800000).toISOString(), maxElDeg: 72, decoded: false, notes: "Voice relay heard" },
];

export function mockApiOk<T>(data: T, message = "Data berhasil diambil"): { success: true; message: string; data: T } {
  return { success: true, message, data };
}
