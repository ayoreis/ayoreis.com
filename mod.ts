import { Status } from "std/http/http_status.ts"

const html = await Deno.readTextFile("index.html")

function handler({ url }: Request) {
	const { pathname } = new URL(url)

	if (pathname === "/") {
		return new Response(html, {
			headers: { "Content-Type": "text/html" },
		})
	}

	return new Response(null, { status: Status.NotFound })
}

Deno.serve(handler)
