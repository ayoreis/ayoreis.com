import { Status } from 'std/http/http_status.ts'
import { serveDir } from 'std/http/file_server.ts'
import { parse } from 'npm:marked'

const html = await Deno.readTextFile('index.html')
const markdown = await Deno.readTextFile('index.md')
const result = html.replace('{markdown}', await parse(markdown))

async function handler(request: Request) {
	const { pathname } = new URL(request.url)

	console.log(pathname)

	if (pathname === '/') {
		return new Response(result, {
			headers: { 'Content-Type': 'text/html' },
		})
	}

	if (pathname.startsWith('/static')) {
		return await serveDir(request)
	}

	return new Response(null, { status: Status.NotFound })
}

Deno.serve(handler)
