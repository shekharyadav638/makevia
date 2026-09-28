"use client";

import { useActionState, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { createRoadmap, type IdeaFormState } from "@/app/actions";
import { IDEA_MAX } from "@/lib/roadmap";

const examples = ["A protein chips brand", "A vitamin C face serum", "Ergonomic study desks", "Reusable steel water bottles"];

export function IdeaForm() {
  const [state, action, pending] = useActionState<IdeaFormState, FormData>(createRoadmap, {});
  const [idea, setIdea] = useState("");

  return (
    <form action={action} className="w-full max-w-2xl" aria-describedby={state.error ? "idea-error" : undefined}>
      <label htmlFor="idea" className="sr-only">
        What do you want to build?
      </label>
      <div className="rounded-3xl border border-line bg-surface p-3 shadow-[0_1px_0_rgba(13,19,33,0.04),0_24px_60px_-28px_rgba(13,19,33,0.25)] transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15">
        <textarea
          id="idea"
          name="idea"
          rows={3}
          required
          maxLength={IDEA_MAX}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          disabled={pending}
          placeholder="Describe your product idea, e.g. a protein chips brand for gym-goers"
          aria-invalid={!!state.error}
          className="block w-full resize-none bg-transparent px-3 py-2 text-lg text-ink placeholder:text-muted/80 focus:outline-none disabled:opacity-60"
        />
        <div className="flex items-center justify-between gap-3 px-2 pt-2">
          <span className="text-xs text-muted">
            {idea.length}/{IDEA_MAX}
          </span>
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-80"
          >
            {pending ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                Mapping&hellip;
              </>
            ) : (
              <>
                Get my roadmap
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>

      <div aria-live="polite" className="mt-4 min-h-6 text-sm">
        {pending ? (
          <p className="text-muted">Mapping your product journey. This usually takes under a minute.</p>
        ) : (
          state.error && (
            <p id="idea-error" role="alert" className="text-red-700">
              {state.error}
            </p>
          )
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="py-1.5 text-sm text-muted">Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            disabled={pending}
            onClick={() => setIdea(ex)}
            className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
          >
            {ex}
          </button>
        ))}
      </div>
    </form>
  );
}
