import { getDataMode } from "../config";
import { fetchApi } from "../api/http";
import type { ApiResponse, DashboardData, MissionPreview } from "../types";
import { getMockDashboard, getMockMissionPreview, mockApiOk } from "../mock/fixtures";

export async function getMissionPreview(): Promise<ApiResponse<MissionPreview>> {
  if (getDataMode() === "mock") {
    return mockApiOk(getMockMissionPreview());
  }
  return fetchApi<MissionPreview>("/mission/preview");
}

export async function getDashboard(): Promise<ApiResponse<DashboardData>> {
  if (getDataMode() === "mock") {
    return mockApiOk(getMockDashboard());
  }
  return fetchApi<DashboardData>("/dashboard");
}
