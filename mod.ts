import { Router } from 'relax/router/router.ts'
import { serve } from 'std/http/server.ts'

import handleStaticFile from './handle-static-file.ts'
import handleHome from './handle-index.ts'
import handleNotFound from './handle-not-found.ts'
import handlePage from './handle-page.ts'

const router = new Router()

router.get('/:staticFilepath', handleStaticFile)
router.get('/', handleHome)
router.get('/:id', handlePage)
router.get('*', handleNotFound)

serve(router.fetch)
