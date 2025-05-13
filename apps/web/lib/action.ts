"use server";
import { BACKEND_URL } from "./constants";
import { authFetch } from "./authFetch";

export async function getProfile() {
  // const session = await getSession();
  // if (!session) {
  //   return null;
  // }
  // const response = await fetch(`${BACKEND_URL}/auth/protected`, {
  //   headers: {
  //     Authorization: `Bearer ${session?.accessToken}`,
  //   },
  // });
  const response = await authFetch(`${BACKEND_URL}/auth/protected`);
  const result = await response.json();
  return result;
}
