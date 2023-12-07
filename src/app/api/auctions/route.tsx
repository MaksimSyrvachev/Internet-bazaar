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
		},
		orderBy: {
			deadlineTime: 'asc'
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
	console.log(newAuction);

	const result = postAuctionSchema.safeParse(newAuction);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		console.log(result.data.deadlineTime);

		const newAuction = await db.auction.create({
			data: {
				title: result.data.title,
				description: result.data.description,
				image_URL: result.data.image_URL,
				deadlineTime: BigInt(result.data.deadlineTime),
				authorId: result.data.authorId,
				categoryId: result.data.categoryId,
				bids: {
					create: [
						{
							amount: result.data.createBidSchema.amount,
							bidderId: result.data.createBidSchema.bidderId
						}
					]
				}
			}
		});

		const resultAuction = {
			...newAuction,
			deadlineTime: String(newAuction.deadlineTime)
		};
		return Response.json(resultAuction);
	}
};
