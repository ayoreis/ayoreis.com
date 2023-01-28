import {
	createResponse,
	separateFrontmatter,
} from './pages.ts'

import { readTextFile } from './read-text-file.ts'

export default async function () {
	const pages = new Set<Record<string, unknown>>([
		{
			date: '2022 — WIP',
			url: 'https://github.com/ayoreis/relax',
			title: 'Relax — For making websites',
		},
	])

	for await (
		const { isFile, name } of Deno.readDir(
			'pages',
		)
	) {
		if (!isFile) continue

		const source = await readTextFile(`pages/${name}`)

		const { properties } = separateFrontmatter(
			source,
		)

		if (!properties || (properties.list === false)) continue

		pages.add({
			date: properties.date,
			url: `/${name.slice(0, -3)}`,
			title: properties.title,
		})
	}

	const source =
		`# 👋 Hello 🌍 world! <br/> I'm Ayo, <br/> I make/do stuff/things.

<section class="projects">

## Projects

<ul>
${
			[...pages]
				.reverse()
				.map(
					({ date, title, url }) =>
						`<li>
<article>
${date ? `<time>${date}</time>` : ''}

### [${title}](${url})
</article>
</li>`,
				)
				.join('\n')
		}
</ul>
</section>

---

[Back to top ⬆️](#top)
`

	const { markdown, properties } = separateFrontmatter(
		source,
	)

	const response = createResponse(
		markdown,
		properties ?? {},
	)

	return response
}
