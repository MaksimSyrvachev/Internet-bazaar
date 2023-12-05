import { useQuery } from '@tanstack/react-query';

import { putUserSchema, userSchema } from '@/validators/user';

const getUser = async (id?: string) => {
	const response = await fetch(`/api/user/${id}`);
	const result = await response.json();
	const validatedResult = userSchema.safeParse(result);
	if (!validatedResult.success) {
		throw new Error('Invalid data from back-end');
	} else {
		return validatedResult.data;
	}
};

export const useUser = (id?: string) =>
	useQuery({
		queryKey: ['user', id],
		queryFn: () => getUser(id),
		enabled: !!id
	});
