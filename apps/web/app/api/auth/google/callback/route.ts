import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (!accessToken || !refreshToken || !userId || !name || !email) {
      console.error("Missing required parameters:", {
        accessToken: !!accessToken,
        refreshToken: !!refreshToken,
        userId: !!userId,
        name: !!name,
        email: !!email,
      });
      return NextResponse.redirect(
        new URL("/auth/signin?error=missing_parameters", request.url)
      );
    }

    try {
      await createSession({
        user: {
          id: Number(userId),
          name: name,
          email: email,
        },
        accessToken,
        refreshToken,
      });
    } catch (sessionError) {
      console.error("Error creating session:", sessionError);
      return NextResponse.redirect(
        new URL("/auth/signin?error=session_creation_failed", request.url)
      );
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error in frontend callback:", error);
    return NextResponse.redirect(
      new URL("/auth/signin?error=google_auth_failed", request.url)
    );
  }
}
