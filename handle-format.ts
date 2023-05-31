import { Status } from 'std/http/http_status.ts';

export default function (request: Request) {
    const url = new URL(request.url)
    const splitURL = url.hostname.split('.')

    // TODO make work with any type of puplic sufix
    if (splitURL[0] === 'www' && splitURL.length === 3) {
        url.hostname = url.hostname.slice(url.hostname.indexOf('.') + 1)
    }

    if (url.pathname.endsWith('/') && url.pathname.length > 1) {
        url.pathname = url.pathname.slice(0, -1)
    }

    if (url.href !== request.url) {
        return Response.redirect(url, Status.PermanentRedirect)
    }
}

