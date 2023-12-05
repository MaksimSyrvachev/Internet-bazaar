import z from 'zod';

export const userIdSchema = z.string();

export const putUserSchema = z.object({
	id: z.string(),
	name: z.string().nullish(),
	phone: z.string().nullish()
});

export const userSchema = putUserSchema.extend({
	emailVerified: z.boolean().nullish(),
	email: z.string().nullish(),
	image: z.string().nullish()
});
