import { Router } from 'relax/router/router.ts'
import { serveFile } from 'std/http/file_server.ts'
import { serve } from 'std/http/server.ts'

const router = new Router()
const isDev = Deno.args[0] === 'dev'

if (isDev) {
	router.requestMiddleware((request) => {
		console.log(`Request to ${new URL(request.url).pathname}`)
	})
}

router.responseMiddleware((request, response) => {
	if (typeof response === 'string') {
		try {
			return serveFile(request, response)
		} catch {
			return response
		}
	}
})

router.get('/', () => {
	return './index.html'
})

router.get('/drawing', () => {
	return './drawing.svg'
})

router.get('*', () => {
	return new Response(JSON.stringify({ status: '🤯 404' }, null, 4), {
		status: 404,
	})
})

serve(router.fetch, isDev ? {} : { onListen: null })
