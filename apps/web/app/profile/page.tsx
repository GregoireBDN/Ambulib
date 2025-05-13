import React from "react";
import { getProfile } from "@/lib/action";

export default async function ProfilePage() {
  const res = await getProfile();

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
