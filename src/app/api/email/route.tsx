import { type NextApiResponse } from 'next';

import { sendingEmailSchema } from '@/validators/sendingEmail';
import { sendEmail } from '@/server/sendEmail';

export const POST = async (request: Request, res: NextApiResponse) => {
	const email = await request.json();
	const result = sendingEmailSchema.safeParse(email);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		try {
			await sendEmail(result.data);
		} catch (error) {
			return new Response(null, { status: 500 });
		}
		return new Response(null, { status: 200 });
	}
};
