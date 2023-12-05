import { db } from './db';

export const getUserById = async (id: string) =>
	db.user.findFirst({
		where: {
			id
		}
	});
