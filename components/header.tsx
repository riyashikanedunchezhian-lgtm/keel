"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Mark } from "./mark";

const productLinks = [
  { href: "/#intake", title: "Intake", detail: "A thread becomes an issue" },
  { href: "/#cycles", title: "Cycles", detail: "A scope with an end date" },
  { href: "/#projects", title: "Projects", detail: "The roadmap is the work" },
  { href: "/#reviews", title: "Reviews", detail: "The change sits on the issue" },
];

function currentOf(path: string) {
  if (path.startsWith("/pricing")) return "pricing";
  if (path.startsWith("/docs")) return "docs";
  if (path.startsWith("/login")) return "login";
  return "";
}

export function Header() {
  const path = usePathname();
  const current = currentOf(path);
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const productBtn = useRef<HTMLButtonElement>(null);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!productOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductOpen(false);
        productBtn.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      const node = productBtn.current?.parentElement;
      if (node && !node.contains(event.target as Node)) setProductOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [productOpen]);

  function openSheet() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }

  function closeSheet() {
    dialogRef.current?.close();
  }

  return (
    <header
      className={`sticky top-0 z-30 border-b ${
        scrolled ? "border-line bg-ink/90 backdrop-blur-md" : "border-transparent bg-ink/80"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2 text-paper" aria-label="Keel, home">
          <Mark />
          <span className="text-[1.05rem] font-medium tracking-[-0.04em]">Keel</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <div className="relative">
            <button
              ref={productBtn}
              type="button"
              className="nav-link"
              aria-expanded={productOpen}
              aria-controls={menuId}
              onClick={() => setProductOpen((open) => !open)}
            >
              Product
            </button>
            {productOpen ? (
              <div
                id={menuId}
                className="absolute left-0 top-[calc(100%+0.7rem)] w-72 rounded-xl border border-line bg-panel p-1.5"
              >
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 hover:bg-[#1c1b19]"
                    onClick={() => setProductOpen(false)}
                  >
                    <span className="block text-paper">{link.title}</span>
                    <span className="block text-sm text-mute">{link.detail}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            className="nav-link"
            href="/pricing"
            aria-current={current === "pricing" ? "page" : undefined}
          >
            Pricing
          </Link>
          <Link className="nav-link" href="/docs" aria-current={current === "docs" ? "page" : undefined}>
            Docs
          </Link>
          <Link className="nav-link" href="/#customers">
            Customers
          </Link>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link className="nav-link" href="/login" aria-current={current === "login" ? "page" : undefined}>
            Log in
          </Link>
          <Link className="btn btn-amber" href="/signup">
            Start a workspace
          </Link>
        </div>

        <button type="button" className="btn btn-quiet lg:hidden" onClick={openSheet}>
          Menu
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="nav-sheet"
        aria-label="Menu"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;
          if (!inside) event.currentTarget.close();
        }}
      >
        <div className="flex h-full flex-col px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="font-medium tracking-[-0.04em]">Keel</span>
            <button type="button" className="btn btn-quiet" onClick={closeSheet}>
              Close
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
            <p className="mb-1 text-mute">Product</p>
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-2 text-lg text-paper" onClick={closeSheet}>
                {link.title}
              </Link>
            ))}
            <Link className="mt-4 py-2 text-lg" href="/pricing" onClick={closeSheet}>
              Pricing
            </Link>
            <Link className="py-2 text-lg" href="/docs" onClick={closeSheet}>
              Docs
            </Link>
            <Link className="py-2 text-lg" href="/#customers" onClick={closeSheet}>
              Customers
            </Link>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link className="btn btn-quiet" href="/login" onClick={closeSheet}>
              Log in
            </Link>
            <Link className="btn btn-amber" href="/signup" onClick={closeSheet}>
              Start a workspace
            </Link>
          </div>
        </div>
      </dialog>
    </header>
  );
}
