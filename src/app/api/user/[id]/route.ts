import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { putUserSchema, userIdSchema } from '@/validators/user';

export const GET = async (
	request: Request,
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
