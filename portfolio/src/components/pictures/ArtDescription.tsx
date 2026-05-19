import type { ReactNode } from "react";

const URL_PATTERN = /https?:\/\/[^\s<>"']+/g;

function linkLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "link";
  }
}

/** Turns URLs in plain text into external links (new tab). */
export function parseDescriptionWithLinks(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    const raw = match[0];
    const trailingMatch = raw.match(/[.,;:!?)]+$/);
    const trailing = trailingMatch?.[0] ?? "";
    const url = trailing ? raw.slice(0, -trailing.length) : raw;

    nodes.push(
      <a
        key={`${index}-${url}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer font-semibold text-kat-purple underline decoration-kat-purple/50 underline-offset-2 transition hover:text-white hover:decoration-kat-purple"
      >
        {linkLabel(url)}
      </a>,
    );

    if (trailing) nodes.push(trailing);
    lastIndex = index + raw.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}


type ArtDescriptionProps = {
  text: string;
  className?: string;
};

export default function ArtDescription({ text, className = "" }: ArtDescriptionProps) {
  return (
    <p className={className}>{parseDescriptionWithLinks(text)}</p>
  );
}
