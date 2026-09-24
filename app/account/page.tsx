import type { Metadata } from "next";
import { AccountPanel } from "@/components/account-panel";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Workspace",
  description: "The workspace you are signed into.",
};

export default function AccountPage() {
  return (
    <Frame>
      <section className="mx-auto max-w-[1120px] px-5 py-16 lg:py-24">
        <h1 className="display max-w-[14ch] text-[clamp(2.4rem,4vw,3.6rem)]">Your workspace</h1>
        <p className="mt-4 max-w-md text-lg text-mute">
          This session is a signed cookie. The password stays hashed on the server.
        </p>
        <AccountPanel />
      </section>
    </Frame>
  );
}
