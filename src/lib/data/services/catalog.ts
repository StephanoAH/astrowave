import { getDataMode } from "../config";
import { fetchApi } from "../api/http";
import type {
  ApiResponse,
  FrequencyEntry,
  Observation,
  Recording,
  TelemetryFrame,
  Transmitter,
} from "../types";
import {
  mockApiOk,
  mockFrequencies,
  mockObservations,
  mockRecordings,
  mockTelemetry,
  mockTransmitters,
} from "../mock/fixtures";

export async function listFrequencies(): Promise<ApiResponse<FrequencyEntry[]>> {
  if (getDataMode() === "mock") return mockApiOk(mockFrequencies);
  return fetchApi<FrequencyEntry[]>("/frequencies");
}

export async function listTransmitters(): Promise<ApiResponse<Transmitter[]>> {
  if (getDataMode() === "mock") return mockApiOk(mockTransmitters);
  return fetchApi<Transmitter[]>("/transmitters");
}

export async function listTelemetry(): Promise<ApiResponse<TelemetryFrame[]>> {
  if (getDataMode() === "mock") return mockApiOk(mockTelemetry);
  return fetchApi<TelemetryFrame[]>("/telemetry");
}

export async function listRecordings(): Promise<ApiResponse<Recording[]>> {
  if (getDataMode() === "mock") return mockApiOk(mockRecordings);
  return fetchApi<Recording[]>("/recordings");
}

export async function listObservations(): Promise<ApiResponse<Observation[]>> {
  if (getDataMode() === "mock") return mockApiOk(mockObservations);
  return fetchApi<Observation[]>("/observations");
}
