export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(text: string, used: Set<string>): string {
  let base = text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/[\s　]+/g, "-")
    .replace(/[^a-z0-9\-_぀-ヿ一-龯]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!base) base = "section";

  let id = base;
  let i = 2;
  while (used.has(id)) {
    id = `${base}-${i}`;
    i++;
  }
  used.add(id);
  return id;
}

/**
 * Parses an HTML body and returns:
 *  - the body with stable `id` attributes injected on h2/h3 (idempotent: existing
 *    ids are preserved)
 *  - a flat TOC list to render as a sidebar
 */
export function buildToc(html: string): { html: string; toc: TocItem[] } {
  const used = new Set<string>();
  const toc: TocItem[] = [];

  const transformed = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      const existingId = /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs);
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = existingId ? existingId[1] : slugify(text, used);
      if (existingId) used.add(id);
      toc.push({ id, text, level: level as 2 | 3 });

      const newAttrs = existingId
        ? attrs
        : `${attrs} id="${id}"`;
      return `<${tag}${newAttrs}>${inner}</${tag}>`;
    },
  );

  return { html: transformed, toc };
}
