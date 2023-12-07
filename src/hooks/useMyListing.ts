import { useQuery } from '@tanstack/react-query';

import { AdWithAuctionArray } from '@/validators/favorite';

const getMyListing = async (userId?: string) => {
	const response = await fetch(`/api/listings?userId=${userId}`);
	const result = await response.json();
	const validatedResult = AdWithAuctionArray.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};

export const useMyListing = (userId?: string) =>
	useQuery({
		queryKey: ['list', 'myListing'],
		queryFn: () => getMyListing(userId),
		enabled: !!userId
	});
