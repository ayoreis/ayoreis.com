export default function () {
	return new Response(
		JSON.stringify({ status: '🤯 404' }, null, 4),
		{
			status: 404,
		},
	)
}
