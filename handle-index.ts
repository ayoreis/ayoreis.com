import { extract } from 'std/encoding/front_matter/any.ts'

import { readTextFile } from './read-text-file.ts'
import { parse } from './parse.ts'

export default async function () {
	const pages = new Map<string, string>()

	for await (const { isFile, name } of Deno.readDir('pages')) {
		if (!isFile) continue

		try {
			pages.set(
				name.slice(0, -3),
				extract<{ title: string }>(await readTextFile(`pages/${name}`))
					.attrs.title,
			)
			// deno-lint-ignore no-empty
		} catch {}
	}

	const source = `---toml
scripts = ['/typewriter.js']
---

# 👋 Hello 🌎 world! <br/> I am Ayo Reis </br> <span class="typewriter"><span class="typewriter__paper"></span><span class="typewriter__cursor">|</span></span>

## 📝 Posts

<ul>
    ${[...pages]
		.map(([id, title]) => `<li><a href="/${id}">${title}</a></li>`)
		.join('')}
</ul>
`

	return parse(source)
}
