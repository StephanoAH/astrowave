import type { ApiResponse } from "../types";
import { getApiBaseUrl } from "../config";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(`API request failed: ${res.status} ${res.statusText}`, res.status);
  }

  const body = (await res.json()) as ApiResponse<T>;
  if (typeof body.success !== "boolean" || body.data === undefined) {
    throw new ApiError("Invalid API response envelope");
  }
  if (!body.success) {
    throw new ApiError(body.message || "API returned success: false");
  }
  return body;
}
