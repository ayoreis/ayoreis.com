import { Router } from 'relax/router/router.ts'
import { serve } from 'std/http/server.ts'

import handleIndex from './handle-index.ts'
import handleNotFound from './handle-not-found.ts'
import handlePage from './handle-page.ts'
import handleStaticFile from './handle-static-file.ts'

const router = new Router()

router.get('/', handleIndex)

router.get('*', (request) => {
	if (!(request.url.endsWith('/'))) return

	return Response.redirect(request.url.slice(0, -1), 308)
})

router.get('*', handleStaticFile)
router.get('/:id', handlePage)
router.get('*', handleNotFound)

serve(router.fetch)
