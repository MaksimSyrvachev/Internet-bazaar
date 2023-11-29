import { db } from '@/server/db';
import { postBidSchema } from '@/validators/auctions';

export const POST = async (request: Request) => {
	const newBid = await request.json();
	const result = postBidSchema.safeParse(newBid);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const newBid = await db.bid.create({
			data: {
				amount: result.data.amount,
				auctionId: result.data.auctionId,
				bidderId: result.data.bidderId
			}
		});
		return Response.json(newBid);
	}
};
