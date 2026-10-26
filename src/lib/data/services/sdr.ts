import { getDataMode } from "../config";
import { fetchApi } from "../api/http";
import type { ApiResponse, SdrStatus } from "../types";
import { mockApiOk, mockSdr } from "../mock/fixtures";

export async function getSdrStatus(): Promise<ApiResponse<SdrStatus>> {
  if (getDataMode() === "mock") {
    return mockApiOk(mockSdr);
  }
  return fetchApi<SdrStatus>("/sdr/status");
}
