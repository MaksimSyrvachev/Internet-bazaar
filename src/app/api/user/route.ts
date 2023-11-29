import { db } from '@/server/db';
import { putUserSchema, userIdSchema } from '@/validators/user';

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const result = userIdSchema.safeParse(searchParams.get('userId'));
	if (!result.success) {
		throw new Error('User not specified');
	} else {
		const user = await db.user.findUnique({
			where: {
				id: result.data
			}
		});
		return Response.json(user);
	}
};

export const PUT = async (request: Request) => {
	const user = await request.json();
	const result = putUserSchema.safeParse(user);
	if (!result.success) {
		throw new Error('Invalid data from front-end');
	} else {
		const updatedUser = await db.user.update({
			where: { id: result.data.userId },
			data: { phone: result.data.phone, name: result.data.name }
		});
		return Response.json(updatedUser);
	}
};
