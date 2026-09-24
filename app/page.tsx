import { ClosingCta } from "@/components/closing-cta";
import { Features } from "@/components/features";
import { Frame } from "@/components/frame";
import { Hero } from "@/components/hero";
import { PricingTable } from "@/components/pricing-table";
import { Proof } from "@/components/proof";

export default function HomePage() {
  return (
    <Frame>
      <Hero />
      <Features />
      <Proof />
      <section id="pricing" className="scroll-mt-24 border-t border-line py-20 lg:py-28" aria-labelledby="pricing-title">
        <div className="mx-auto max-w-[1120px] px-5">
          <h2 id="pricing-title" className="display max-w-[14ch] text-[clamp(2.1rem,4vw,3.35rem)]">
            Pay for people, not for a rollout.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-mute">
            Same product on every plan. The difference is how many teams, and how much review
            your security group needs.
          </p>
          <div className="mt-10">
            <PricingTable />
          </div>
        </div>
      </section>
      <ClosingCta />
    </Frame>
  );
}
