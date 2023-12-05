import { STATUS_CODES } from 'http';

import { type SendingEmail } from '@/types/sendingEmail';
import { type AdEdit, AdForm, AdPost } from '@/types/ads';

export const editAd = async (ad: AdEdit) => {
	const response = await fetch(`/api/ad`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(ad)
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
