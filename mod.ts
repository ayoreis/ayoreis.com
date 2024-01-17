import { Status } from 'std/http/http_status.ts'
import { parse } from 'npm:marked'

const html = await Deno.readTextFile('index.html')
const markdown = await Deno.readTextFile('index.md')
const result = html.replace('{markdown}', await parse(markdown))

function handler({ url }: Request) {
	const { pathname } = new URL(url)

	if (pathname === '/') {
		return new Response(result, {
			headers: { 'Content-Type': 'text/html' },
		})
	}

	return new Response(null, { status: Status.NotFound })
}

Deno.serve(handler)
