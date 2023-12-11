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
		.nullable(),
	price: z
		.number()
		.int()
		.nonnegative({ message: 'Price must not be a negative number' })
		.nullable(),
	updatedAt: z.string(),
	publishedAt: z.string(),
	image_URL: z.union([z.literal(''), z.string().trim().url()]).nullish(),
	authorId: z.string(),
	categoryId: z.string()
});

export const validationGetAdsShema = z.array(adSchema);

export const adFormSchema = adSchema.omit({
	id: true,
	authorId: true,
	updatedAt: true,
	publishedAt: true
});

export const postAdSchema = adSchema.omit({
	id: true,
	updatedAt: true,
	publishedAt: true
});

export const putAdSchema = adSchema.omit({
	authorId: true,
	updatedAt: true,
	publishedAt: true
});

export const deleteAdSchema = adSchema.pick({ id: true });

export const editAdSchema = adSchema.omit({
	updatedAt: true,
	publishedAt: true
});
