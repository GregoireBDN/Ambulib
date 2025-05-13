import { getSession } from "@/lib/session";
import React from "react";

export default async function Dashboard() {
  const session = await getSession();
  console.log({ session });
  return <div>Dashboard</div>;
}
