import { Router } from 'relax/router/router.ts';
import { serve } from 'std/http/server.ts';
import { Status } from 'std/http/http_status.ts';

import handleIndex from './handle-index.ts';
import handleNotFound from './handle-not-found.ts';
import handlePage from './handle-page.ts';
import handleStaticFile from './handle-static-file.ts';

const router = new Router();

router.get('/', handleIndex);

router.get('*', (request) => {
	const url = new URL(request.url)
	const splitURL = url.hostname.split('.', 1)

	if (splitURL[0] === 'www') {
		url.hostname = splitURL[1]
	}

	if (url.pathname.endsWith('/')) {
		url.pathname = url.pathname.slice(0, -1)
	}
	
	if (url.toString() !== request.url) {
		return Response.redirect(url, Status.PermanentRedirect);
	}
});

router.get('*', handleStaticFile);
router.get('/:id', handlePage);
router.get('*', handleNotFound);

serve(router.fetch);
