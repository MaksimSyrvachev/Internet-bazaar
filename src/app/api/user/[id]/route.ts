import { db } from '@/server/db';

export const GET = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	const user = await db.user.findUnique({
		where: {
			id: params.id
		}
	});

	if (user === null) {
		return new Response('Ad not found', { status: 404 });
	}

	return Response.json(user);
};
