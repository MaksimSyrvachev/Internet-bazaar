import { z } from 'zod';

import { db } from '@/server/db';

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
				ads: true,
				auctions: {
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
		const ads = user?.ads ?? [];
		const auctions = user?.auctions ?? [];
		const modifiedAuctions = auctions.map(auction => ({
			...auction,
			deadlineTime: String(auction.deadlineTime)
		}));
		return Response.json([...ads, ...modifiedAuctions]);
	}
};
