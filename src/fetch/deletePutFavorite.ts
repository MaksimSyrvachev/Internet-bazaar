import { type putAndDeleteFavorite } from '@/types/favorite';
import { userSchema } from '@/validators/user';

type DataType = putAndDeleteFavorite & {
	isFavorite: boolean;
};

export const favoriteFunc = async (data: DataType) => {
	const response = await fetch('/api/favorites', {
		method: data.isFavorite ? 'DELETE' : 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	const validatedResult = userSchema.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};
