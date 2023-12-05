import { STATUS_CODES } from 'http';

import { type SendingEmail } from '@/types/sendingEmail';

export const sendEmail = async (email: SendingEmail) => {
	const response = await fetch(`/api/email`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(email)
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
