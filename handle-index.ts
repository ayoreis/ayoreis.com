import { extract } from 'std/encoding/front_matter/any.ts'

import { readTextFile } from './read-text-file.ts'
import {
	separateFrontmatter,
	createResponse,
} from './pages.ts'

export default async function () {
	const pages = new Map<string, string>()

	for await (const { isFile, name } of Deno.readDir(
		'pages',
	)) {
		if (!isFile) continue

		try {
			const { attrs: pageProperties } = extract<{
				list: boolean
				title: string
			}>(await readTextFile(`pages/${name}`))

			if (pageProperties.list === false) continue

			if (pageProperties.title)
				pages.set(
					name.slice(0, -3),
					pageProperties.title,
				)
			// deno-lint-ignore no-empty
		} catch {}
	}

	const source = `# Hello world! <br/> I'm Ayo, <br/> I make/do stuff/things.

<section class="projects">

## Projects

${[...pages]
	.map(([id, title]) => `- ### [${title}](/${id})`)
	.join('\n')}
- ### [Relax — For making websites](https://github.com/ayoreis/relax)
	
</section>

---

[Back to top ^](#)
`

	const { markdown, properties } =
		separateFrontmatter(source)

	const response = createResponse(markdown, properties)

	return response
}
