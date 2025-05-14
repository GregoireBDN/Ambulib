import { getSession } from "./session";
import { refreshToken } from "./auth";

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

/**
 * Fetch function that adds the access token to the request headers
 * and refreshes the token if it is expired
 * @param url - The URL to fetch
 * @param options - The options for the fetch request
 * @returns The response from the fetch request
 */
export async function authFetch(url: string | URL, options: FetchOptions = {}) {
  const session = await getSession();
  console.log("Session dans authFetch:", {
    hasSession: !!session,
    hasAccessToken: !!session?.accessToken,
    tokenLength: session?.accessToken?.length,
    tokenStart: session?.accessToken?.substring(0, 10),
  });

  if (!session?.accessToken) {
    throw new Error("No access token found in session");
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  console.log("Headers envoyés:", options.headers);

  let response = await fetch(url, options);
  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("No refresh token found");
    }
    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, options);
    }
  }
  return response;
}
