"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ClosingCta() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!looksLikeEmail(email)) {
      setError("Enter an email like you@company.com.");
      return;
    }
    setError("");
    router.push(`/signup?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <section className="border-t border-line" aria-labelledby="close-title">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-5 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <div className="max-w-xl">
          <h2 id="close-title" className="display text-[clamp(2rem,4vw,3.1rem)]">
            Start with the real backlog.
          </h2>
          <p className="mt-4 text-lg text-mute">
            Free for three people. No sample project, and no card.
          </p>
        </div>

        <form className="w-full max-w-md" onSubmit={onSubmit} noValidate>
          <label htmlFor="workspace-email" className="text-sm text-mute">
            Work email
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="workspace-email"
              className="field"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "workspace-email-error" : undefined}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="btn btn-amber shrink-0" type="submit">
              Create workspace
            </button>
          </div>
          {error ? (
            <p id="workspace-email-error" className="mt-2 text-sm text-amber" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
