import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "./type";
export type Session = {
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Create a session
 * @param payload - The payload to create the session with
 */
export async function createSession(payload: Session) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Get the session
 * @returns The session
 */
export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.error("Failed to verify session", error);
    redirect("/auth/signin");
    return null;
  }
}

/**
 * Delete the session
 */
export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function updateSession({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey);

    if (!payload || !("user" in payload)) {
      throw new Error("Invalid session");
    }
    const newPayload: Session = {
      user: payload.user as Session["user"],
      accessToken,
      refreshToken,
    };
    await createSession(newPayload);
  } catch (error) {
    console.error("Failed to update session", error);
  }
}

/**
 * Update the tokens
 * @param accessToken - The new access token
 * @param refreshToken - The new refresh token
 */
export async function updateTokens(accessToken: string, refreshToken: string) {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  await updateSession({ accessToken, refreshToken });
}
