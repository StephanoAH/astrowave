import { getDataMode } from "../config";
import { fetchApi } from "../api/http";
import type { ApiResponse, Satellite } from "../types";
import { mockApiOk, mockSatellites } from "../mock/fixtures";

export async function listSatellites(): Promise<ApiResponse<Satellite[]>> {
  if (getDataMode() === "mock") {
    return mockApiOk(mockSatellites);
  }
  return fetchApi<Satellite[]>("/satellites");
}

export async function getSatellite(id: string): Promise<ApiResponse<Satellite>> {
  if (getDataMode() === "mock") {
    const sat = mockSatellites.find((s) => s.id === id) ?? mockSatellites[0];
    return mockApiOk(sat);
  }
  return fetchApi<Satellite>(`/satellites/${id}`);
}
