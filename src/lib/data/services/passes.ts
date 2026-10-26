import { getDataMode } from "../config";
import { fetchApi } from "../api/http";
import type { ApiResponse, Pass } from "../types";
import { getMockDashboard, mockApiOk } from "../mock/fixtures";

export async function listPasses(): Promise<ApiResponse<Pass[]>> {
  if (getDataMode() === "mock") {
    return mockApiOk(getMockDashboard().passes);
  }
  return fetchApi<Pass[]>("/passes");
}
