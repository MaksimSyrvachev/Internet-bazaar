import { type PostBid } from '@/types/auctions';
import { bidSchema } from '@/validators/auctions';

export const createBid = async (bid: PostBid) => {
	const response = await fetch(`/api/bids`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(bid)
	});

	if (response.status === 200) {
		const result = await response.json();
		const validatedResult = bidSchema.safeParse(result);
		if (!validatedResult.success) {
			throw new Error('Invalid data from back-end');
		} else {
			return validatedResult.data;
		}
	}

	throw new Error();
};
