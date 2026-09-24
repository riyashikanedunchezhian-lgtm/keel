"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="content" className="mx-auto max-w-[680px] px-5 py-24">
      <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">This page didn’t load.</h1>
      <p className="mt-4 text-mute">Something failed while rendering. You can try the page again.</p>
      <button type="button" className="btn btn-amber mt-8" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
