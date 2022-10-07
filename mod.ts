import fast from 'fast'
import { serveFile } from 'std/http/file_server.ts'
import { serve } from 'std/http/server.ts'

const router = fast()

const isDev = (() => {
	try {
		return !!Deno.env.get('DENO_REGION')
	} catch {
		return false
	}
})()

router.get('/', (context) => {
	return serveFile(context.request, './index.html')
})

router.get('/drawing', (context) => {
	return serveFile(context.request, './drawing.svg')
})

serve(router.handle, isDev ? { onListen: undefined } : {})
