import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/frame";
import { docs, findDoc } from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) return { title: "Docs" };
  return { title: doc.title, description: doc.summary };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) notFound();

  return (
    <Frame>
      <article className="mx-auto max-w-[680px] px-5 py-16">
        <p>
          <Link className="nav-link text-sm" href="/docs">
            All docs
          </Link>
        </p>
        <h1 className="display mt-6 text-[clamp(2.2rem,4vw,3.4rem)]">{doc.title}</h1>
        <p className="mt-4 text-lg text-mute">{doc.summary}</p>
        <div className="mt-10 space-y-5 leading-relaxed">
          {doc.blocks.map((block, index) => {
            if (block.kind === "h2") {
              return (
                <h2 key={index} className="pt-4 text-2xl tracking-[-0.03em]">
                  {block.text}
                </h2>
              );
            }
            if (block.kind === "p") {
              return (
                <p key={index} className="text-mute">
                  {block.text}
                </p>
              );
            }
            if (block.kind === "list") {
              return (
                <ul key={index} className="list-disc space-y-2 pl-5 text-mute">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <ul key={index} className="border-t border-line">
                {block.rows.map((row) => (
                  <li
                    key={row.keys}
                    className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <kbd>{row.keys}</kbd>
                    <span className="text-mute">{row.does}</span>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </article>
    </Frame>
  );
}
