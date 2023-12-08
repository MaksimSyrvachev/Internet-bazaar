import { type AdPost } from '@/types/ads';

export const createAd = async (ad: AdPost) => {
	const response = await fetch(`/api/ads`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ad)
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
