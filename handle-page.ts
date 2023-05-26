import { frontmatter, markdown } from "./syntax.ts";

export default async function (
  { url }: Request,
  { id }: URLPatternComponentResult["groups"],
) {
  try {
    const source = await Deno.readTextFile(`./pages/${id}.md`);

    const { properties, content } = frontmatter(source);

    const HTML = markdown(
      new URL(url),
      properties,
      `<article>

${content}
</article>`,
    );

    return new Response(HTML, {
      headers: { "content-type": "text/html; charset=UTF-8" },
    });
    // deno-lint-ignore no-empty
  } catch {}
}
