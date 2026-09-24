import type { Metadata } from "next";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this Keel preview does with what you type.",
};

export default function PrivacyPage() {
  return (
    <Frame>
      <article className="mx-auto max-w-[680px] px-5 py-16 leading-relaxed">
        <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Privacy</h1>
        <p className="mt-6 text-mute">
          This is a preview of the Keel marketing site. Forms run in your browser. We do not
          send the email, the workspace name, or the password anywhere, and we do not set a
          tracking cookie.
        </p>
        <p className="mt-4 text-mute">
          If you refresh, the confirmation disappears. That is the whole policy, because there
          is no account behind the page.
        </p>
      </article>
    </Frame>
  );
}
