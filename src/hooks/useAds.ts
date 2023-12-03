import { useQuery } from '@tanstack/react-query';

import { validationGetAdsShema } from '@/validators/ads';

const getAds = async () => {
	const response = await fetch('/api/ads');
	const result = await response.json();
	const validatedResult = validationGetAdsShema.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};

export const useAds = () =>
	useQuery({
		queryKey: ['list', 'ads'],
		queryFn: getAds
	});
