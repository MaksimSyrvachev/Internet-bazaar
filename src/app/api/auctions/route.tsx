import { db } from '@/server/db';
import { postAuctionSchema } from '@/validators/auctions';

export const GET = async () => {
	const auctions = await db.auction.findMany({
		include: {
			bids: {
				orderBy: {
					amount: 'desc'
				},
				take: 1
			}
		}
	});
	const resultAuctions = auctions.map(auction => ({
		...auction,
		deadlineTime: String(auction.deadlineTime)
	}));
	return Response.json(resultAuctions);
};

export const POST = async (request: Request) => {
	const newAuction = await request.json();
	const result = postAuctionSchema.safeParse(newAuction);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const resAuction = {
			...result.data,
			deadlineTime: Number(result.data.deadlineTime)
		};
		const newAuction = await db.auction.create({
			data: {
				title: resAuction.title,
				description: resAuction.description,
				image_URL: resAuction.image_URL,
				deadlineTime: resAuction.deadlineTime,
				authorId: resAuction.authorId,
				categoryId: resAuction.categoryId,
				bids: {
					create: [
						{
							amount: resAuction.createBidSchema.amount,
							bidderId: resAuction.createBidSchema.bidderId
						}
					]
				}
			}
		});
		return Response.json(newAuction);
	}
};
