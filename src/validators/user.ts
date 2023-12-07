import z from 'zod';

export const userIdSchema = z.string();

export const putUserSchema = z.object({
	id: z.string(),
	name: z.string().nullish(),
	phone: z.string().nullish()
});

export const userSchema = putUserSchema.extend({
	emailVerified: z.string().nullish(),
	email: z.string().nullish(),
	image: z.string().nullish()
});

// export const userSchema = z.object({
// 	id: z.string(),
// 	name: z.string().nullable(),
// 	phone: z.string().nullable(),
// 	email: z.string().nullable(),
// 	emailVerified: z.string().nullable(),
// 	image: z.string().nullable()
// });
