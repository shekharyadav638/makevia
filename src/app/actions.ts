"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { validateWaitlist } from "@/lib/waitlist";
import { db } from "@/lib/supabase";
import { IDEA_MAX, IDEA_MIN } from "@/lib/roadmap";
import { generateRoadmap, isBusyError, RoadmapError } from "@/lib/generate-roadmap";

const DAILY_ROADMAPS_PER_IP = 10;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function joinWaitlist(input: { email: unknown; idea: unknown }): Promise<void> {
  const entry = {
    email: String(input?.email ?? "").trim().toLowerCase(),
    idea: String(input?.idea ?? "").trim(),
  };
  if (Object.keys(validateWaitlist(entry)).length) throw new Error("Invalid waitlist entry");

  await db("waitlist?on_conflict=email", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ email: entry.email, idea: entry.idea || null, source: "makevia.in" }),
  });
}

export type IdeaFormState = { error?: string; idea?: string };

async function clientHash(): Promise<string> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  return createHmac("sha256", process.env.SUPABASE_SECRET_KEY ?? "").update(ip).digest("hex");
}

export async function createRoadmap(_prev: IdeaFormState, formData: FormData): Promise<IdeaFormState> {
  const idea = String(formData.get("idea") ?? "").trim().replace(/\s+/g, " ");
  if (idea.length < IDEA_MIN) return { idea, error: "Tell us a little about what you want to build." };
  if (idea.length > IDEA_MAX) return { idea, error: `Please keep it under ${IDEA_MAX} characters.` };

  let id: string;
  try {
    const ipHash = await clientHash();
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const recent: unknown[] = await (
      await db(`ideas?select=id&ip_hash=eq.${ipHash}&created_at=gt.${since}&limit=${DAILY_ROADMAPS_PER_IP}`)
    ).json();
    if (recent.length >= DAILY_ROADMAPS_PER_IP) {
      return { idea, error: "You've created a lot of roadmaps today. Please come back tomorrow." };
    }

    const roadmap = await generateRoadmap(idea);
    if (!roadmap.supported) return { idea, error: roadmap.unsupported_reason || "Makevia is built for physical products." };

    const [row]: { id: string }[] = await (
      await db("ideas?select=id", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ idea, category: roadmap.category, roadmap, ip_hash: ipHash }),
      })
    ).json();
    id = row.id;
  } catch (err) {
    if (err instanceof RoadmapError) return { idea, error: err.message };
    if (isBusyError(err)) {
      return { idea, error: "We're busy right now. Please try again in a minute." };
    }
    console.error("createRoadmap failed", err);
    return { idea, error: "Something went wrong. Please try again." };
  }
  redirect(`/roadmap/${id}`);
}

export async function requestMatch(input: { ideaId: unknown; email: unknown }): Promise<void> {
  const ideaId = String(input?.ideaId ?? "");
  const email = String(input?.email ?? "").trim().toLowerCase();
  if (!UUID_RE.test(ideaId) || validateWaitlist({ email, idea: "" }).email) throw new Error("Invalid match request");

  await db("match_requests?on_conflict=idea_id,email", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ idea_id: ideaId, email }),
  });
}
