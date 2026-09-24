import { Footer } from "./footer";
import { Header } from "./header";

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </>
  );
}
