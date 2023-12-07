import { useQuery } from '@tanstack/react-query';

import { AdWithAuctionArray } from '@/validators/favorite';

const getFavorites = async (userId?: string) => {
	const response = await fetch(`/api/favorites?userId=${userId}`);
	const result = await response.json();
	const validatedResult = AdWithAuctionArray.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};

export const useFavorites = (userId?: string) =>
	useQuery({
		queryKey: ['list', 'favorites'],
		queryFn: () => getFavorites(userId),
		enabled: !!userId
	});
