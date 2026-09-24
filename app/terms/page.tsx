import type { Metadata } from "next";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for the Keel preview.",
};

export default function TermsPage() {
  return (
    <Frame>
      <article className="mx-auto max-w-[680px] px-5 py-16 leading-relaxed">
        <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Terms</h1>
        <p className="mt-6 text-mute">
          Keel, as shown here, is a design preview. Halcyon, Parcel & Rye, Lowroom, and the
          other names on the page are fictional. Nothing on the site is an offer to sell
          software, and the prices are part of the prototype.
        </p>
        <p className="mt-4 text-mute">
          Don’t rely on this preview for a security review or a procurement conversation. The
          product it describes is not running.
        </p>
      </article>
    </Frame>
  );
}
