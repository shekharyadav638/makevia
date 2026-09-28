"use client";

import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { requestMatch } from "@/app/actions";
import { validateWaitlist } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

export function MatchRequestForm({ ideaId }: { ideaId: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    const invalid = validateWaitlist({ email, idea: "" }).email;
    setError(invalid ?? "");
    if (invalid) return;
    setStatus("submitting");
    try {
      await requestMatch({ ideaId, email });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 font-medium">
        <Check className="h-5 w-5 text-[#f0a47f]" aria-hidden="true" />
        Thanks! We&rsquo;ll be in touch as we find providers for you.
      </p>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-lg flex-col gap-3 sm:flex-row">
      <label htmlFor="match-email" className="sr-only">
        Email
      </label>
      <div className="flex-1">
        <input
          id="match-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          onChange={() => error && setError("")}
          aria-invalid={!!error}
          aria-describedby={error ? "match-error" : undefined}
          className="h-12 w-full rounded-full border border-paper/20 bg-paper/10 px-5 text-paper placeholder:text-paper/50 focus:border-paper/60 focus:outline-none"
        />
        {error && (
          <p id="match-error" className="mt-2 pl-5 text-sm text-[#f0a47f]">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper disabled:cursor-wait disabled:opacity-80"
      >
        {submitting && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Connect me
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-[#f0a47f] sm:basis-full">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
