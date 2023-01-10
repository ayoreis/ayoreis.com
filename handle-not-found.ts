const NOT_FOUND_RESPONSE = new Response(
	JSON.stringify({ status: '🤯 404' }, null, 4),

	{
		status: 404,
	},
)

export default function () {
	return NOT_FOUND_RESPONSE
}
