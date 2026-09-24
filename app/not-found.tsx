import Link from "next/link";
import { Frame } from "@/components/frame";

export default function NotFound() {
  return (
    <Frame>
      <section className="mx-auto max-w-[680px] px-5 py-24">
        <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">That page isn’t in Keel.</h1>
        <p className="mt-4 text-mute">The link may be old, or the article was never written.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn btn-amber" href="/">
            Back home
          </Link>
          <Link className="btn btn-quiet" href="/docs">
            Browse docs
          </Link>
        </div>
      </section>
    </Frame>
  );
}
