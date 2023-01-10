import { HTML } from './HTML.ts'

export interface DocumentProperties {
	scripts: string[]
	styles: string[]
	title: string
}

export function createDocument(
	content: string,
	{ scripts, styles, title }: DocumentProperties,
) {
	return HTML`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="/styles.css">
        <link href="//unpkg.com/prism-themes@1.9.0/themes/prism-one-dark.min.css" rel="stylesheet" />
        ${styles.map(
			(styleHref) => HTML`<link rel="stylesheet" href="${styleHref}" />`,
		)}
        <script defer src="//unpkg.com/prismjs@1.29.0/components/prism-core.min.js"></script>
	    <script defer src="//unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
        ${scripts.map(
			(scriptSrc) =>
				HTML`<script type="module" src="${scriptSrc}"></script>`,
		)}
    </head>

    <body>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="//github.com/ayoreis">GitHub</a></li>
                <li><a href="//instagram.com/ayo.reis">Instagram</a></li>
            </ul> 
        </nav>

        <hr>

        <main>
            ${content}
        </main>

        <hr>

        <footer>
            <p>Made by <a href="/">Ayo</a>.</p>
        <footer>
    </body>
</html>`
}
