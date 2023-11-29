import z from 'zod';

export const userIdSchema = z.string();

export const putUserSchema = z.object({
	userId: z.string(),
	name: z.string().optional(),
	phone: z.string().optional()
});
