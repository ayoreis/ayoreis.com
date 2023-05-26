import { frontmatter, markdown, type Properties } from "./syntax.ts";

export default async function ({ url }: Request) {
  const pages: Properties[] = [
    {
      date: "2022 .WIP",
      url: "https://github.com/ayoreis/relax",
      title: "Relax — For making websites",
    },

    {
      date: "May 2023 .WIP",
      url: "https://github.com/ayoreis/generative-agents",
      title: "Generative Agents: Interactive Simulacra of Human Behavior",
    },
  ];

  for await (const { isFile, name } of Deno.readDir("pages")) {
    if (!isFile) continue;

    const source = await Deno.readTextFile(`pages/${name}`);

    const { properties } = frontmatter(source);

    if (!properties || properties.list === false) continue;

    pages.unshift({
      date: properties.date,
      url: `/${name.slice(0, -3)}`,
      title: properties.title,
    });
  }

  const source = `# Hello world!<br/>I'm Ayo,<br/>I make stuff.

<section id="projects">
<ul>
${
    [...pages]
      .reverse()
      .map(
        ({ date, title, url }) =>
          `<li>
<article>
${`<div aria-hidden="true" class="info">
${date ? `<time>${date}</time>` : ""}
${Math.round(Math.random() * 5 * 10) / 10}kb
</div>`}

## [${title}](${url})
</article>
</li>`,
      )
      .join("\n")
  }
</ul>
</section>
`;

  const { properties, content } = frontmatter(source);

  const HTML = markdown(new URL(url), properties, content);

  return new Response(HTML, {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
