"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Doc } from "@/lib/docs";

export function DocsBrowser({ docs }: { docs: Doc[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return docs;
    return docs.filter((doc) => {
      const haystack = `${doc.title} ${doc.summary}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [docs, query]);

  return (
    <div>
      <label className="text-sm text-mute" htmlFor="doc-search">
        Search docs
      </label>
      <input
        id="doc-search"
        className="field mt-2 max-w-md"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Cycle, keyboard, triage"
      />
      {filtered.length === 0 ? (
        <p role="status" className="mt-8 max-w-md text-mute">
          No articles match “{query.trim()}”. Try “cycle” or “keyboard”.
        </p>
      ) : (
        <ul className="mt-8 border-t border-line">
          {filtered.map((doc) => (
            <li key={doc.slug} className="border-b border-line">
              <Link href={`/docs/${doc.slug}`} className="group block py-5">
                <span className="nav-link text-xl tracking-[-0.03em] text-paper">{doc.title}</span>
                <span className="mt-1 block max-w-xl text-mute">{doc.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
