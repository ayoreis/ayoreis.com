import { Status } from 'std/http/http_status.ts';

export default function () {
	return new Response(
		JSON.stringify({ status: '🤯 404' }, null, 4),

		{
			status: Status.NotFound,
		}
	);
}
