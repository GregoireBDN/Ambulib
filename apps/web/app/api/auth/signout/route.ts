import { authFetch } from "@/lib/authFetch";
import { BACKEND_URL } from "@/lib/constants";
import { deleteSession } from "@/lib/session";
import { redirect, RedirectType } from "next/navigation";

export async function GET() {
  await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: "POST",
  });
  await deleteSession();
  redirect("/", RedirectType.push);
}
