import { serveFile } from 'std/http/file_server.ts';

export default async function (request: Request) {
	try {
		const url = new URL(request.url);
		const path = `static/${url.pathname}`;

		await Deno.stat(path);

		return await serveFile(request, path);
		// deno-lint-ignore no-empty
	} catch {}
}
