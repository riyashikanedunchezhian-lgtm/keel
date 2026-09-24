import Link from "next/link";
import { Mark } from "./mark";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#intake", label: "Intake" },
      { href: "/#cycles", label: "Cycles" },
      { href: "/#projects", label: "Projects" },
      { href: "/#reviews", label: "Reviews" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Docs",
    links: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/getting-started", label: "Getting started" },
      { href: "/docs/keyboard", label: "Keyboard" },
      { href: "/docs/cycles", label: "Cycles" },
      { href: "/docs/triage", label: "Triage rules" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#customers", label: "Customers" },
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Start a workspace" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="Keel, home">
            <Mark />
            <span className="font-medium tracking-[-0.04em]">Keel</span>
          </Link>
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-mute">
            A workspace for issues, projects, and cycles. Built to be fast, then quiet.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-paper">{column.title}</p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link className="nav-link text-sm" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1120px] px-5 pb-10 text-sm text-mute">
        <p>© 2026 Keel. This preview keeps nothing on a server.</p>
      </div>
    </footer>
  );
}
