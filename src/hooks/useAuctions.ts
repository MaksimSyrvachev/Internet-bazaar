import { useQuery } from '@tanstack/react-query';

import { validationGetAuctionsShema } from '@/validators/auctions';

const getAuctions = async () => {
	const response = await fetch('/api/auctions');
	const result = await response.json();
	console.log(result);
	const validatedResult = validationGetAuctionsShema.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};

export const useAuctions = () =>
	useQuery({
		queryKey: ['list', 'auctions'],
		queryFn: getAuctions
	});
