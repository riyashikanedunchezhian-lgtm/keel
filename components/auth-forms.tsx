"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { findPlan, plans, type Plan } from "@/lib/plans";

export function SignupFormFromQuery() {
  const searchParams = useSearchParams();
  return (
    <SignupForm
      plan={findPlan(searchParams.get("plan") ?? undefined)}
      initialEmail={searchParams.get("email") ?? ""}
    />
  );
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readError(response: Response) {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  return body?.error ?? "Something failed. Try again.";
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!looksLikeEmail(email) || password.length < 8) {
      setError(
        !looksLikeEmail(email)
          ? "Enter the email on the workspace."
          : "Passwords in Keel are at least 8 characters.",
      );
      return;
    }
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("The server did not answer. Start the app with npm run dev.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-8 max-w-sm" onSubmit={onSubmit} noValidate>
      <label className="text-sm text-mute" htmlFor="login-email">
        Email
      </label>
      <input
        id="login-email"
        className="field mt-2"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "login-error" : undefined}
        required
      />
      <label className="mt-4 block text-sm text-mute" htmlFor="login-password">
        Password
      </label>
      <input
        id="login-password"
        className="field mt-2"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        minLength={8}
      />
      {error ? (
        <p id="login-error" role="alert" className="mt-3 text-sm text-amber">
          {error}
        </p>
      ) : null}
      <button className="btn btn-amber mt-6" type="submit" disabled={pending}>
        {pending ? "Logging in" : "Log in"}
      </button>
      <p className="mt-6 text-sm text-mute">
        No workspace yet?{" "}
        <Link className="nav-link" href="/signup">
          Start one
        </Link>
      </p>
    </form>
  );
}

export function SignupForm({ plan, initialEmail = "" }: { plan: Plan; initialEmail?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [chosen, setChosen] = useState(plan.id);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Give the workspace a name the team will recognize.");
      return;
    }
    if (!looksLikeEmail(email)) {
      setError("Enter a work email like you@company.com.");
      return;
    }
    if (password.length < 8) {
      setError("Passwords in Keel are at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Type the same password twice.");
      return;
    }
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspace: name, email, password, plan: chosen }),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("The server did not answer. Start the app with npm run dev.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-8 max-w-sm" onSubmit={onSubmit} noValidate>
      <label className="text-sm text-mute" htmlFor="workspace-name">
        Workspace name
      </label>
      <input
        id="workspace-name"
        className="field mt-2"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoComplete="organization"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "signup-error" : undefined}
        required
      />
      <label className="mt-4 block text-sm text-mute" htmlFor="signup-email">
        Work email
      </label>
      <input
        id="signup-email"
        className="field mt-2"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label className="mt-4 block text-sm text-mute" htmlFor="signup-password">
        Password
      </label>
      <input
        id="signup-password"
        className="field mt-2"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        minLength={8}
      />
      <label className="mt-4 block text-sm text-mute" htmlFor="signup-confirm">
        Confirm password
      </label>
      <input
        id="signup-confirm"
        className="field mt-2"
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(event) => setConfirm(event.target.value)}
        required
        minLength={8}
      />
      <label className="mt-4 block text-sm text-mute" htmlFor="signup-plan">
        Plan
      </label>
      <select
        id="signup-plan"
        className="field mt-2"
        value={chosen}
        onChange={(event) => setChosen(event.target.value)}
      >
        {plans.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {error ? (
        <p id="signup-error" role="alert" className="mt-3 text-sm text-amber">
          {error}
        </p>
      ) : null}
      <button className="btn btn-amber mt-6" type="submit" disabled={pending}>
        {pending ? "Creating" : chosen === "company" ? "Request a walkthrough" : "Create workspace"}
      </button>
      <p className="mt-6 text-sm text-mute">
        Already have a workspace?{" "}
        <Link className="nav-link" href="/login">
          Log in
        </Link>
      </p>
    </form>
  );
}
