import type { Metadata } from "next";
import { Suspense } from "react";
import { SignupFormFromQuery } from "@/components/auth-forms";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Start a workspace",
  description: "Create a Keel workspace for your team.",
};

export default function SignupPage() {
  return (
    <Frame>
      <section className="mx-auto max-w-[1120px] px-5 py-16 lg:py-24">
        <h1 className="display max-w-[12ch] text-[clamp(2.4rem,4vw,3.6rem)]">
          Start a workspace
        </h1>
        <p className="mt-4 max-w-md text-lg text-mute">
          Name it after the product, not the company. Creating a workspace signs you in.
        </p>
        <Suspense>
          <SignupFormFromQuery />
        </Suspense>
      </section>
    </Frame>
  );
}
