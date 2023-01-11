import { marked } from 'marked'
import { extract } from 'std/encoding/front_matter/any.ts'

export interface Properties {
	[key: string]: unknown
	scripts: string[]
	styles: string[]
	title: string
}

export function separateFrontmatter(source: string) {
	let markdown = source
	let properties: Partial<Properties> = {}

	try {
		// deno-lint-ignore no-extra-semi
		;({ attrs: properties, body: markdown } =
			extract<Partial<Properties>>(source))
		// deno-lint-ignore no-empty
	} catch {}

	return { markdown, properties }
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
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title && `${title} — `}Ayo Reis</title>
        <link rel="stylesheet" href="/styles.css">
        <link href="//unpkg.com/prism-themes@1.9.0/themes/prism-one-dark.min.css" rel="stylesheet" />
        ${styles
			.map(
				(styleHref) =>
					`<link rel="stylesheet" href="${styleHref}" />`,
			)
			.join('')}
        <script defer src="//unpkg.com/prismjs@1.29.0/components/prism-core.min.js"></script>
	    <script defer src="//unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
        ${scripts
			.map(
				(scriptSrc) =>
					`<script type="module" src="${scriptSrc}"></script>`,
			)
			.join('')}
    </head>

    <body>
        <nav>
            <ul>
                <li><a href="/"><b>Home</b></a></li>
                <li><a href="/about">About</a></li>
                <li><a href="//instagram.com/ayo.reis">Instagram</a></li>
                <li><a href="//github.com/ayoreis">GitHub</a></li>
            </ul> 
        </nav>

        <hr>

        <main>
            ${HTML}
        </main>
    </body>
</html>`

	return new Response(HTMLDocument, {
		headers: { 'Content-type': 'text/html' },
	})
}
