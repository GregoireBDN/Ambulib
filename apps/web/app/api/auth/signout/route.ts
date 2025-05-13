import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await deleteSession();
  return NextResponse.redirect(new URL("/", req.url));
}
