import { db } from '@/server/db';

export const GET = async () => {
	const ads = await db.category.findMany();
	return Response.json(ads);
};
