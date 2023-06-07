import { extract, test } from "std/encoding/front_matter/yaml.ts";
import { marked } from "marked";

export interface Properties extends Record<string, unknown> {
  date?: string;
  list?: boolean;
  scripts?: string[];
  styles?: string[];
  title?: string;
} 

const LINKS = [
  { url: "/", text: "Ayo Reis" },
  { url: "/about", text: "About" },
  { url: "https://github.com/ayoreis", text: "GitHub" },
  { url: "https://instagram.com/ayo.reis", text: "Instagram" },
];

export function frontmatter(source: string) {
  let properties: Properties = {};
  let content = source;

  if (test(source)) {
    ({ attrs: properties, body: content } = extract<Properties>(source));

    content = content.replaceAll(
      /{(\w+)}/gi,
      (_: string, $1: string) => `${properties![$1]}`,
    );
  }

  return { properties, content };
}

export function markdown(
  pageURL: URL,
  properties: Properties,
  content: string,
) {
  const main = marked.parse(content);
  const { scripts = [], styles = [], title } = properties;

  return `<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
		<meta name="author" content="Ayo Reis" />
		<meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>C:/AyoReis${title ? `/${title}` : ""}</title>

        <link rel="stylesheet" href="/styles.css">
        ${
    styles
      .map((href) => `<link rel="stylesheet" href="${href}" />`)
      .join("\n")
  }
					
		<script async data-no-cookie data-respect-dnt src="https://cdn.splitbee.io/sb.js"></script>
		${
    scripts
      .map((source) => `<script type="module" src="${source}"></script>`)
      .join("\n")
  }
    </head>

    <body>
        <nav>
            <ul>
                ${
    LINKS.map(
      ({ url, text }) =>
        `<li><a ${
          url === pageURL.pathname ? 'aria-current="page"' : ""
        } href="${url}">${text}</a></li>`,
    ).join("\n")
  }
            </ul> 
        </nav>

        <main>
            ${main}
        </main>

		<footer>
			<p>
				<a href="/" rel="author">AyoOS.exe</a> made with
				<a href="https://deno.com/runtime">Deno</a>,
				<a href="https://deno.com/deploy">Deno Deploy</a>,
				<a href="https://www.typescriptlang.org">TypeScript</a>,
				<a href="https://github.com/ayoreis/relax">Relax</a>,
				<a href="https://github.com/ayoreis/relax">Markdown</a>,
				HTML, CSS and JavaScript.
			</p>
		</footer>
    </body>
</html>`;
}
