"use client";

import Link from "next/link";
import { useState } from "react";
import { plans } from "@/lib/plans";

export function PricingTable() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div role="group" aria-label="Billing period" className="inline-flex rounded-[10px] border border-line p-1">
          <button
            type="button"
            className={`min-h-10 rounded-md px-3 ${yearly ? "bg-[#1c1b19] text-paper" : "text-mute"}`}
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly
          </button>
          <button
            type="button"
            className={`min-h-10 rounded-md px-3 ${yearly ? "text-mute" : "bg-[#1c1b19] text-paper"}`}
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
        </div>
        <p className="text-sm text-mute">Yearly prices include two months.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const amount = yearly ? plan.yearly : plan.monthly;
          return (
            <article
              key={plan.id}
              className={`plan flex flex-col p-5 ${plan.recommended ? "plan-on" : ""}`}
            >
              <h3 className="text-lg tracking-[-0.03em]">{plan.name}</h3>
              {plan.recommended ? (
                <p className="mt-2 text-sm leading-snug text-amber">{plan.note}</p>
              ) : (
                <p className="mt-2 text-sm leading-snug text-mute">{plan.blurb}</p>
              )}
              <p className="mt-6">
                {amount === null ? (
                  <span className="display text-4xl">Custom</span>
                ) : (
                  <>
                    <span className="display text-4xl">${amount}</span>
                    <span className="ml-1 text-sm text-mute">per person</span>
                  </>
                )}
              </p>
              <p className="mt-5 text-sm text-paper">{plan.includes}</p>
              <ul className="mt-3 flex-1 space-y-2 text-sm text-mute">
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link
                className={`btn mt-6 ${plan.recommended ? "btn-amber" : "btn-quiet"}`}
                href={`/signup?plan=${plan.id}`}
              >
                {plan.cta}
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
