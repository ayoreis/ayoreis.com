import ErrorStackParser from 'error-stack-parser'

export async function readTextFile(
	url: string | URL,
	base: URL = ErrorStackParser.parse(new Error())[0].fileName,
) {
	return await (await fetch(new URL(url, base))).text()
}
