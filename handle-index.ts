import { extract } from 'std/encoding/front_matter/any.ts'

import {
	createResponse,
	separateFrontmatter,
} from './pages.ts'

import { readTextFile } from './read-text-file.ts'

export default async function () {
	const pages = new Set<Record<string, string>>([
		{
			date: '2022 — WIP',
			url: 'https://github.com/ayoreis/relax',
			title: 'Relax — For making websites',
		},
	])

	for await (const { isFile, name } of Deno.readDir(
		'pages',
	)) {
		if (!isFile) continue

		try {
			const { attrs: pageProperties } = extract<{
				date: string
				list: boolean
				title: string
			}>(await readTextFile(`pages/${name}`))

			if (pageProperties.list === false) continue

			if (pageProperties.title)
				pages.add({
					date: pageProperties.date,
					url: `/${name.slice(0, -3)}`,
					title: pageProperties.title,
				})
			// deno-lint-ignore no-empty
		} catch {}
	}

	const source = `# 👋 Hello 🌍 world! <br/> I'm Ayo, <br/> I make/do stuff/things.

<section class="projects">

## Projects

<ul>
${[...pages]
	.reverse()
	.map(
		({ date, title, url }) => `<li>
<article  class="project">
<time>${date}</time>

### [${title}](${url})
</article>
</li>`,
	)
	.join('\n')}
</ul>
</section>

---

[Back to top ⬆️](#)
`

	const { markdown, properties } =
		separateFrontmatter(source)

	const response = createResponse(markdown, properties)

	return response
}
