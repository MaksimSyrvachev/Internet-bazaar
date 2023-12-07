import { type PostAuction } from '@/types/auctions';

export const createAuction = async (auction: PostAuction) => {
	const response = await fetch(`/api/auctions`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(auction)
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
