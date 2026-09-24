import type { Metadata } from "next";
import { DocsBrowser } from "@/components/docs-browser";
import { Frame } from "@/components/frame";
import { docs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Docs",
  description: "Getting started, keyboard, cycles, and triage rules for Keel.",
};

export default function DocsPage() {
  return (
    <Frame>
      <section className="mx-auto max-w-[1120px] px-5 py-16 lg:py-20">
        <h1 className="display text-[clamp(2.5rem,5vw,4rem)]">Docs</h1>
        <p className="mt-5 max-w-xl text-lg text-mute">
          Short on purpose. If a page starts apologizing, it does not belong here.
        </p>
        <div className="mt-10">
          <DocsBrowser docs={docs} />
        </div>
      </section>
    </Frame>
  );
}
