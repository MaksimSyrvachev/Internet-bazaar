import { type AdEdit } from '@/types/ads';

export const editAd = async (ad: AdEdit) => {
	const response = await fetch(`/api/ads`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ad)
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
