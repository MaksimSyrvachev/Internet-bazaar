import { z } from 'zod';

import { db } from '@/server/db';
import { putFavoriteSchema } from '@/validators/favorite';

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const userIdSchema = z.string();
	const result = userIdSchema.safeParse(searchParams.get('userId'));
	if (!result.success) {
		throw new Error('User not specified');
	} else {
		const user = await db.user.findUnique({
			where: {
				id: result.data
			},
			include: {
				favoriteAds: true,
				favoriteAuctions: {
					include: {
						bids: {
							orderBy: {
								amount: 'desc'
							},
							take: 1
						}
					}
				}
			}
		});
		const ads = user?.favoriteAds ?? [];
		const auctions = user?.favoriteAuctions ?? [];
		const modifiedAuctions = auctions.map(auction => ({
			...auction,
			deadlineTime: String(auction.deadlineTime)
		}));
		return Response.json([...ads, ...modifiedAuctions]);
	}
};

export const DELETE = async (request: Request) => {
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
							connect: [{ id: result.data.adId }]
						}
				  }
				: {
						favoriteAuctions: {
							connect: [{ id: result.data.auctionId }]
						}
				  }
		});

		return Response.json(updatedUser);
	}
};
