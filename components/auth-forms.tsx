"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { plans, type Plan } from "@/lib/plans";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!looksLikeEmail(email) || password.length < 8) {
      setNotice("");
      setError(
        !looksLikeEmail(email)
          ? "Enter the email on the workspace."
          : "Passwords in Keel are at least 8 characters.",
      );
      return;
    }
    setError("");
    setNotice(email);
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
      />
      {error ? (
        <p id="login-error" role="alert" className="mt-3 text-sm text-amber">
          {error}
        </p>
      ) : null}
      <button className="btn btn-amber mt-6" type="submit">
        Log in
      </button>
      {notice ? (
        <p role="status" className="mt-4 text-sm text-mute">
          This preview has no accounts. If it did, {notice} would land in the last workspace
          they opened.
        </p>
      ) : null}
      <p className="mt-6 text-sm text-mute">
        No workspace yet? <Link className="nav-link" href="/signup">Start one</Link>
      </p>
    </form>
  );
}

export function SignupForm({ plan }: { plan: Plan }) {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState(plan.id);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || !looksLikeEmail(email)) {
      setError(
        name.trim().length < 2
          ? "Give the workspace a name the team will recognize."
          : "Enter a real email so we know where this would go.",
      );
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    const selected = plans.find((item) => item.id === chosen) ?? plan;
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.35 }}
        className="mt-8 max-w-md border-t border-amber pt-5"
      >
        <p className="text-xl tracking-[-0.03em] text-paper">{name.trim()} is ready.</p>
        <p className="mt-3 text-mute">
          Plan: {selected.name}. We would have written to {email}. This preview stores the
          confirmation in the page only.
        </p>
        <button type="button" className="btn btn-quiet mt-6" onClick={() => setDone(false)}>
          Edit details
        </button>
      </motion.div>
    );
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
      <button className="btn btn-amber mt-6" type="submit">
        {chosen === "company" ? "Request a walkthrough" : "Create workspace"}
      </button>
    </form>
  );
}
