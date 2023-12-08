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
		return new Response('Ad not found', { status: 404 });
	}

	return Response.json(ad);
};

export const DELETE = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	const ad = await db.ad.delete({
		where: {
			id: params.id
		}
	});

	if (ad === undefined || ad === null) {
		return new Response('Ad not found', { status: 404 });
	}

	return new Response(null, { status: 200 });
};
