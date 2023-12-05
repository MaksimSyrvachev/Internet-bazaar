import { type NextApiResponse } from 'next';

import { sendingEmailSchema } from '@/validators/sendingEmail';

export const POST = async (request: Request, res: NextApiResponse) => {
	const email = await request.json();
	console.log(email);
	const result = sendingEmailSchema.safeParse(email);
	console.log(result);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		//TODO send email
		return new Response(null, { status: 200 });
	}
};
