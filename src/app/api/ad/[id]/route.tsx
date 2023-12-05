import { notFound } from 'next/navigation';

import { db } from '@/server/db';

export const GET = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	const ad = await db.ad.findFirst({
		where: {
			id: params.id
		}
	});

	if (ad === undefined || ad === null) {
		return notFound();
	}

	return Response.json(ad);
};
