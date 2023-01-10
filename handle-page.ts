import { readTextFile } from './read-text-file.ts'
import { parse } from './parse.ts'

export default async function (
	_request: Request,
	{ id }: URLPatternComponentResult['groups'],
) {
	try {
		const source = await readTextFile(`./pages/${id}.md`)

		return parse(source)
		// deno-lint-ignore no-empty
	} catch {}
}
