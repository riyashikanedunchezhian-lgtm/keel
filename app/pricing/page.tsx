import type { Metadata } from "next";
import { ClosingCta } from "@/components/closing-cta";
import { Frame } from "@/components/frame";
import { PricingTable } from "@/components/pricing-table";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free, Field, Yard, and Company. Yearly billing includes two months.",
};

const faqs = [
  {
    q: "Can we start on Free and move to Yard later?",
    a: "Yes. Issues, cycles, and projects come with you. You pay the difference for the month you switch, and guests stay on the projects you already shared.",
  },
  {
    q: "What happens to unfinished cycle work?",
    a: "It does not roll by itself. On the last day someone chooses to finish it or move it. Moved issues show up on the next cycle as rolled in.",
  },
  {
    q: "Do you charge for guests?",
    a: "No. Guests are on Yard and Company. They can see the projects you invite them to, and they do not get a seat on the backlog.",
  },
];

export default function PricingPage() {
  return (
    <Frame>
      <section className="mx-auto max-w-[1120px] px-5 py-16 lg:py-20">
        <h1 className="display max-w-[14ch] text-[clamp(2.5rem,5vw,4rem)]">
          Pay for people, not for a rollout.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
          Four plans. Yard is the one most product teams settle on after the first year, which
          is why it carries the amber line. The price is the whole pitch.
        </p>
        <div className="mt-12">
          <PricingTable />
        </div>
      </section>
      <section className="mx-auto max-w-[720px] px-5 pb-8" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl tracking-[-0.03em]">
          Questions we actually get
        </h2>
        <div className="mt-4 border-b border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq">
              <summary>{faq.q}</summary>
              <p className="max-w-xl pb-5 text-mute">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <ClosingCta />
    </Frame>
  );
}
