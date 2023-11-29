import z from 'zod';

export const adSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(50, { message: 'Title must be 50 or fewer characters long' }),
	description: z
		.string()
		.max(500, { message: 'Description must be 500 or fewer characters long' })
		.optional(),
	price: z
		.number()
		.nonnegative('Price must not be a negative number')
		.optional(),
	image_URL: z.string().optional(),
	authorId: z.string(),
	categoryId: z.string()
});

export const postAdSchema = adSchema.omit({ id: true });

export const putAdSchema = adSchema.omit({ authorId: true, categoryId: true });

export const deleteAdSchema = adSchema.pick({ id: true });

export type Ad = z.infer<typeof adSchema>;
