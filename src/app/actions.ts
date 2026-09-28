"use server";

import { validateWaitlist } from "@/lib/waitlist";

export async function joinWaitlist(input: { email: unknown; idea: unknown }): Promise<void> {
  const entry = {
    email: String(input?.email ?? "").trim().toLowerCase(),
    idea: String(input?.idea ?? "").trim(),
  };
  if (Object.keys(validateWaitlist(entry)).length) throw new Error("Invalid waitlist entry");

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");

  const res = await fetch(`${url}/rest/v1/waitlist?on_conflict=email`, {
    method: "POST",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ email: entry.email, idea: entry.idea || null, source: "makevia.in" }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
}
