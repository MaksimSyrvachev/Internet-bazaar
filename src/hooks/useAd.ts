import { useQuery } from '@tanstack/react-query';

import { adSchema, validationGetAdsShema } from '@/validators/ads';

const getAd = async (id: string) => {
	const response = await fetch(`/api/ad/${id}`);
	const result = await response.json();
	console.log(result);
	const validatedResult = adSchema.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};

export const useAd = (id: string) =>
	useQuery({
		queryKey: ['ad'],
		queryFn: () => getAd(id)
	});
