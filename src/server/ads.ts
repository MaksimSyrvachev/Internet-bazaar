import { db } from './db';

export const getAdById = async (id: string) =>
	db.ad.findFirst({
		where: {
			id
		}
	});
