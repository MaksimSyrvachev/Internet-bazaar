import { db } from '@/server/db';
import { putFavoriteSchema } from '@/validators/favorite';

export const PUT = async (request: Request) => {
	const req = await request.json();
	const result = putFavoriteSchema.safeParse(req);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const updatedUser = await db.user.update({
			where: {
				id: result.data.userId
			},
			data: result.data.adId
				? {
						favoriteAds: {
							disconnect: {
								id: result.data.adId
							}
						}
				  }
				: {
						favoriteAuctions: {
							disconnect: {
								id: result.data.auctionId
							}
						}
				  }
		});
		return Response.json(updatedUser);
	}
};
