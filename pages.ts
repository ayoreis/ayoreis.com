import { marked } from 'marked'

import {
	extract,
	test,
} from 'std/encoding/front_matter/yaml.ts'

type EmptyObject = Record<string | number | symbol, never>

interface Properties {
	[key: string]: unknown
	date: string
	list: boolean
	scripts: string[]
	styles: string[]
	title: string
}

export function separateFrontmatter(
	source: string,
) {
	if (!test(source)) {
		return {
			properties: null,
			markdown: source,
		}
	}

	const { attrs: properties, body: markdown } = extract<
		Properties
	>(
		source,
	)

	return {
		properties,
		markdown,
	}
}

export function createResponse(
	markdown: string,
	properties: Partial<Properties> = {},
) {
	markdown = markdown.replaceAll(
		/{(\w+)}/gi,
		(_: string, $1: string) => `${properties[$1]}`,
	)

	const { scripts = [], styles = [], title } = properties

	const HTML = marked.parse(markdown)

	const HTMLDocument = `<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
		<meta name="author" content="Ayo Reis" />
		<meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${
		title ? `${title} — ` : ''
	}👋 Ayo 🌍 Reis</title>
        <link rel="stylesheet" href="/styles.css">
        <link href="https://unpkg.com/prism-themes@1.9.0/themes/prism-one-dark.min.css" rel="stylesheet" />
        ${
		styles
			.map(
				(styleHref) =>
					`<link rel="stylesheet" href="${styleHref}" />`,
			)
			.join('')
	}
		<script async data-no-cookie data-respect-dnt src="https://cdn.splitbee.io/sb.js"></script>
        <script type="module" src="https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js"></script>
	    <script type="module" src="https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    	<script type="module" src="/scripts/hue.js"></script>
		<script type="module" src="/scripts/flamethrower.js"></script>
		${
		scripts
			.map(
				(scriptSrc) =>
					`<script type="module" src="${scriptSrc}"></script>`,
			)
			.join('\n')
	}
    </head>

    <body id="top">
        <nav>
            <ul>
                <li><a href="/"><b>Ayo Reis</b></a></li>
                <li><a href="/about">About</a></li>
                <li><a href="https://instagram.com/ayo.reis">Instagram</a></li>
                <li><a href="https://github.com/ayoreis">GitHub</a></li>
            </ul> 
        </nav>

        <main>
            ${HTML}
        </main>

		<footer>
			<p>
				Made by <a href="/" rel="author">Ayo</a> with <a href="https://deno.land">Deno</a>, <a href="https://deno.com/deploy">Deno Deploy</a>, <a href="https://www.typescriptlang.org">TypeScript</a>, <a href="https://github.com/ayoreis/relax">Relax</a>, HTML, CSS and JavaScript.
			</p>
		</footer>
    </body>
</html>`

	return new Response(HTMLDocument, {
		headers: { 'Content-Type': 'text/html; charset=UTF-8' },
	})
}
