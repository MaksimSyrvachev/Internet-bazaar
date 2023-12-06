import z from 'zod';

export const bidding = z.object({
	amount: z
		.number()
		.nonnegative({ message: 'Price must not be a negative number' })
});
