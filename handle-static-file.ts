import { serveFile } from 'std/http/file_server.ts'

export default async function (
	request: Request,
	{ staticFilepath }: URLPatternComponentResult['groups'],
) {
	try {
		const path = `static/${staticFilepath}`

		await Deno.stat(path)

		return await serveFile(request, path)
		// deno-lint-ignore no-empty
	} catch {}
}
