import { db } from '@/server/db';

export const GET = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	const auction = await db.auction.findFirst({
		where: {
			id: params.id
		}
	});

	if (auction === undefined || auction === null) {
		return new Response('Ad not found', { status: 404 });
	}

	return Response.json(auction);
};

export const DELETE = async (
	_: Request,
	{ params }: { params: { id: string } }
) => {
	let auction = await db.auction.findFirst({
		where: {
			id: params.id
		}
	});

	if (auction === undefined || auction === null) {
		return new Response('Ad not found', { status: 404 });
	}

	if (auction.deadlineTime > new Date().getTime()) {
		return new Response(null, { status: 500 });
	}

	auction = await db.auction.delete({
		where: {
			id: params.id
		}
	});

	if (auction === undefined || auction === null) {
		return new Response('Ad not found', { status: 404 });
	}

	return new Response(null, { status: 200 });
};
