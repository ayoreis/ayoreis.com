import {
	createResponse,
	separateFrontmatter,
} from './pages.ts'

import { readTextFile } from './read-text-file.ts'

export default async function (
	_request: Request,
	{ id }: URLPatternComponentResult['groups'],
) {
	try {
		const source = await readTextFile(
			`./pages/${id}.md`,
		)

		const { markdown, properties } =
			separateFrontmatter(source)

		markdown

		const response = createResponse(
			`<article>

${markdown}

</article>

---

[< Home](/)`,
			properties,
		)

		return response
		// deno-lint-ignore no-empty
	} catch {}
}
