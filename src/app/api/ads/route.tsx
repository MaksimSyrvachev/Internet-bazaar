import { db } from '@/server/db';
import { deleteAdSchema, postAdSchema, putAdSchema } from '@/validators/ads';

export const GET = async () => {
	const ads = await db.ad.findMany();
	return Response.json(ads);
};

export const POST = async (request: Request) => {
	const newAd = await request.json();
	const result = postAdSchema.safeParse(newAd);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const newAd = await db.ad.create({
			data: {
				title: result.data.title,
				description: result.data.description,
				price: result.data.price,
				image_URL: result.data.image_URL,
				authorId: result.data.authorId,
				categoryId: result.data.categoryId
			}
		});
		return Response.json(newAd);
	}
};

export const PUT = async (request: Request) => {
	const ad = await request.json();
	const result = putAdSchema.safeParse(ad);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const updatedAd = await db.ad.update({
			where: {
				id: result.data.id
			},
			data: {
				title: result.data.title,
				description: result.data.description,
				price: result.data.price,
				image_URL: result.data.image_URL,
				categoryId: result.data.categoryId
			}
		});
		return Response.json(updatedAd);
	}
};

export const DELETE = async (request: Request) => {
	const ad = await request.json();
	const result = deleteAdSchema.safeParse(ad);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const ad = await db.ad.delete({
			where: {
				id: result.data.id
			}
		});
		return Response.json(ad);
	}
};
