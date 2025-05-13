import { updateTokens } from "@/lib/session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { accessToken, refreshToken } = body;
  if (!accessToken || !refreshToken) {
    return new Response("Provide Token", { status: 401 });
  }
  await updateTokens(accessToken, refreshToken);

  return new Response("OK", { status: 200 });
}
