import { getDataMode } from "../config";
import { fetchApi } from "../api/http";
import type { ApiResponse, AuthLoginData } from "../types";
import { mockApiOk, mockUser } from "../mock/fixtures";

const MOCK_TOKEN = "mock-session-astrowave";

export async function login(
  email: string,
  password: string,
): Promise<ApiResponse<AuthLoginData>> {
  if (getDataMode() === "mock") {
    await delay(400);
    if (!email) {
      return {
        success: false,
        message: "Email required",
        data: { token: "", user: mockUser },
      };
    }
    return mockApiOk(
      { token: MOCK_TOKEN, user: { ...mockUser, email } },
      "Login successful (mock)",
    );
  }
  return fetchApi<AuthLoginData>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getProfile(token: string): Promise<ApiResponse<typeof mockUser>> {
  if (getDataMode() === "mock") {
    await delay(200);
    return mockApiOk(mockUser);
  }
  return fetchApi<typeof mockUser>("/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
