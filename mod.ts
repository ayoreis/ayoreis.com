const html = await Deno.readTextFile("index.html")

Deno.serve(() => {
	return new Response(html, {
		headers: { "Content-Type": "text/html" },
	})
})
