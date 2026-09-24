"use client";

import { useEffect, useState } from "react";

export type SessionAccount = {
  email: string;
  workspace: string;
  plan: string;
  createdAt: string;
};

export function useSession() {
  const [account, setAccount] = useState<SessionAccount | null | undefined>(undefined);

  useEffect(() => {
    let ignore = false;
    fetch("/api/auth/me")
      .then(async (response) => {
        if (ignore) return;
        setAccount(response.ok ? ((await response.json()) as SessionAccount) : null);
      })
      .catch(() => {
        if (!ignore) setAccount(null);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return account;
}
