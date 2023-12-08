import { notFound } from 'next/navigation';

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
		return notFound();
	}

	return Response.json(user);
};
