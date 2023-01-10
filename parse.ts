import { extract } from 'std/encoding/front_matter/any.ts'
import { marked } from 'marked'

import { createDocument } from './create-document.ts'

const DEFAULT_PROPERTIES = {
	scripts: [],
	styles: [],
	title: 'Ayo Reis',
}

export function parse(source: string) {
	let properties: Record<string, unknown> = {}
	let markdown = source

	try {
		// deno-lint-ignore no-extra-semi
		;({ attrs: properties, body: markdown } = extract(source))
		// deno-lint-ignore no-empty
	} catch {}

	markdown = markdown.replaceAll(/{(\w+)}/gi, (_, $1) => `${properties[$1]}`)

	const HTML = marked.parse(markdown)

	const document = createDocument(
		HTML,
		Object.assign({}, DEFAULT_PROPERTIES, properties),
	)

	return new Response(document, { headers: { 'Content-type': 'text/html' } })
}
