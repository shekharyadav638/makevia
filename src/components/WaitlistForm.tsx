"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { joinWaitlist } from "@/app/actions";
import { IDEA_MAX, validateWaitlist, type WaitlistErrors } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "block h-13 w-full rounded-xl border bg-surface px-4 text-base text-ink placeholder:text-muted/80 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<WaitlistErrors>({});
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const entry = {
      email: String(data.get("email") ?? "").trim(),
      idea: String(data.get("idea") ?? "").trim(),
    };
    const found = validateWaitlist(entry);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLInputElement | null)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await joinWaitlist(entry);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const clear = (key: keyof WaitlistErrors) => () => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex items-start gap-4 rounded-2xl border border-accent/25 bg-accent-soft p-6 focus:outline-none"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white">
          <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div>
          <p className="text-lg font-semibold tracking-tight text-ink">You&rsquo;re on the list.</p>
          <p className="mt-1 text-ink-soft">We&rsquo;ll keep you posted.</p>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={status === "error" ? "form-error" : undefined}>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
          maxLength={254}
          onChange={clear("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${field} ${errors.email ? "border-red-600" : "border-line"}`}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="idea" className="mb-2 block text-sm font-medium text-ink">
          What do you want to build? <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="idea"
          name="idea"
          type="text"
          autoComplete="off"
          placeholder="e.g. A protein chips brand"
          maxLength={IDEA_MAX}
          onChange={clear("idea")}
          aria-invalid={!!errors.idea}
          aria-describedby={errors.idea ? "idea-error" : undefined}
          className={`${field} ${errors.idea ? "border-red-600" : "border-line"}`}
        />
        {errors.idea && (
          <p id="idea-error" className="mt-2 text-sm text-red-700">
            {errors.idea}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
      >
        {submitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            Joining&hellip;
          </>
        ) : (
          <>
            Join the Waitlist
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </button>

      {status === "error" && (
        <p id="form-error" role="alert" className="text-sm text-red-700">
          Something went wrong. Please try again in a moment.
        </p>
      )}

      <p className="text-xs text-muted">No spam. We&rsquo;ll only email you about Makevia&rsquo;s launch.</p>
    </form>
  );
}
