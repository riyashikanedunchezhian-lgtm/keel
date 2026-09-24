"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { plans } from "@/lib/plans";
import { useSession } from "./use-session";

export function AccountPanel() {
  const router = useRouter();
  const account = useSession();
  const [pending, setPending] = useState(false);
  const plan = plans.find((item) => item.id === account?.plan);

  async function logout() {
    setPending(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  if (account === undefined) {
    return <p className="mt-8 text-mute">Checking the workspace…</p>;
  }

  if (!account) {
    return (
      <div className="mt-8">
        <p className="text-mute">You are not signed in.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-amber" href="/login">
            Log in
          </Link>
          <Link className="btn btn-quiet" href="/signup">
            Start a workspace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-md border-t border-line pt-6">
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-mute">Workspace</dt>
          <dd className="mt-1 text-lg text-paper">{account.workspace}</dd>
        </div>
        <div>
          <dt className="text-sm text-mute">Email</dt>
          <dd className="mt-1 text-paper">{account.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-mute">Plan</dt>
          <dd className="mt-1 text-paper">{plan?.name ?? account.plan}</dd>
        </div>
      </dl>
      <button type="button" className="btn btn-quiet mt-8" onClick={logout} disabled={pending}>
        {pending ? "Signing out" : "Log out"}
      </button>
    </div>
  );
}
