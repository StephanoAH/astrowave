export type DataMode = "mock" | "api";

export function getDataMode(): DataMode {
  const mode = process.env.NEXT_PUBLIC_DATA_MODE ?? "mock";
  return mode === "api" ? "api" : "mock";
}

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";
}

export function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME ?? "AstroWave";
}

export function getDataModeLabel(): string {
  return getDataMode() === "mock" ? "Mock" : "Live API";
}
