import { createSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userId = searchParams.get("userId");
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const email = searchParams.get("email");
    const role = searchParams.get("role");

    if (
      !accessToken ||
      !refreshToken ||
      !userId ||
      !firstName ||
      !lastName ||
      !email ||
      !role
    ) {
      console.error("Missing required parameters:", {
        accessToken: !!accessToken,
        refreshToken: !!refreshToken,
        userId: !!userId,
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        role: !!role,
      });
      return NextResponse.redirect(
        new URL("/auth/signin?error=missing_parameters", request.url)
      );
    }

    try {
      await createSession({
        user: {
          id: Number(userId),
          firstName,
          lastName,
          email: email,
          role: role as Role,
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
