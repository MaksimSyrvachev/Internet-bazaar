import { type AdPost } from '@/types/ads';

export const deleteAd = async (id: string) => {
	const response = await fetch(`/api/ad/${id}`, {
		method: 'DELETE'
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
