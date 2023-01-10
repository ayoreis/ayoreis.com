export function HTML({ raw }: TemplateStringsArray, ...values: unknown[]) {
	let result = raw[0]

	for (let [index, value] of Object.entries(values)) {
		if (Array.isArray(value)) {
			value = value.join('')
		}

		result += (value || '') + raw[Number(index) + 1]
	}

	return result
}
