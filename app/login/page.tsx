import type { Metadata } from "next";
import { LoginForm } from "@/components/auth-forms";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Keel workspace.",
};

export default function LoginPage() {
  return (
    <Frame>
      <section className="mx-auto max-w-[1120px] px-5 py-16 lg:py-24">
        <h1 className="display text-[clamp(2.4rem,4vw,3.6rem)]">Log in</h1>
        <p className="mt-4 max-w-md text-lg text-mute">
          Use the email on the workspace. This preview checks the form and then stops.
        </p>
        <LoginForm />
      </section>
    </Frame>
  );
}
