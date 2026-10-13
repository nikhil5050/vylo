import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { headingId, type BlogImage } from "@/content/blog";

// Renders the lightweight markdown used in src/content/blog/posts — see the
// `body` field in content/blog/types.ts for the supported syntax. Kept as a
// server component so every word of the article ships in the initial HTML.

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol" | "check"; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "image" };

function parse(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    paragraph = [];
  };

  const pushItem = (type: "ul" | "ol" | "check", item: string) => {
    const last = blocks[blocks.length - 1];
    if (last && last.type === type) last.items.push(item);
    else blocks.push({ type, items: [item] });
  };

  for (const raw of source.trim().split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }

    if (line.startsWith("## ") || line.startsWith("### ") || line === "{{image}}" || line.startsWith("|")) flush();

    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line === "{{image}}") blocks.push({ type: "image" });
    else if (line.startsWith("|")) {
      const cells = line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
      const last = blocks[blocks.length - 1];
      if (last && last.type === "table") last.rows.push(cells);
      else blocks.push({ type: "table", rows: [cells] });
    } else if (line.startsWith("- [ ] ")) {
      flush();
      pushItem("check", line.slice(6));
    } else if (line.startsWith("- ")) {
      flush();
      pushItem("ul", line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      flush();
      pushItem("ol", line.replace(/^\d+\.\s/, ""));
    } else paragraph.push(line);
  }
  flush();
  return blocks;
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-charcoal">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className =
        "font-medium text-burgundy underline decoration-burgundy/30 underline-offset-4 transition-colors hover:decoration-burgundy";
      return href.startsWith("/") ? (
        <Link key={index} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      );
    }
    return part;
  });
}

export function BlogBody({ body, inlineImage }: { body: string; inlineImage?: BlogImage }) {
  const blocks = parse(body);
  const leadIndex = blocks.findIndex((block) => block.type === "p");

  return (
    <div className="text-[1.0625rem] leading-[1.85] text-charcoal/80">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                id={headingId(block.text)}
                className="mt-14 mb-5 scroll-mt-28 font-serif text-2xl leading-tight text-charcoal sm:text-[1.75rem]"
              >
                <span aria-hidden="true" className="mb-4 block h-px w-10 bg-burgundy" />
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-9 mb-3 font-serif text-xl text-charcoal">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className={index === leadIndex ? "mb-6 text-lg leading-[1.8] text-charcoal sm:text-xl" : "mb-6"}>
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="mb-7 flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-burgundy" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="mb-7 flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[0.2em] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-burgundy/30 text-xs font-semibold text-burgundy"
                    >
                      {i + 1}
                    </span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "check":
            return (
              <ul key={index} className="mb-7 grid gap-2.5 rounded-2xl bg-moonlight/60 p-5 sm:grid-cols-2 sm:p-6">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[0.975rem] leading-relaxed">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="mt-[0.2em] h-5 w-5 shrink-0 text-burgundy"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2.5" y="2.5" width="15" height="15" rx="4" />
                      <path d="m6.5 10.2 2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "table": {
            const [head, ...rows] = block.rows;
            return (
              <div key={index} className="mb-8 overflow-x-auto rounded-2xl border border-silver/40">
                <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem] leading-relaxed">
                  <thead className="bg-burgundy-dark text-ivory">
                    <tr>
                      {head.map((cell, i) => (
                        <th key={i} scope="col" className="px-4 py-3 font-semibold">
                          {renderInline(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, r) => (
                      <tr key={r} className="border-t border-silver/30 even:bg-moonlight/40">
                        {row.map((cell, c) => (
                          <td key={c} className={c === 0 ? "px-4 py-3 font-medium text-charcoal" : "px-4 py-3"}>
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case "image":
            if (!inlineImage) return null;
            return (
              <figure key={index} className="my-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-moonlight">
                  <Image
                    src={inlineImage.src}
                    alt={inlineImage.alt}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
                {inlineImage.caption && (
                  <figcaption className="mt-3 text-center text-sm italic text-muted">{inlineImage.caption}</figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
