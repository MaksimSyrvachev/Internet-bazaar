import z from 'zod';

export const textEmail = z.object({
	text: z.string().min(1).max(500)
});
export const sendingEmailSchema = textEmail.extend({
	to: z.string(),
	from: z.string(),
	title: z.string()
});
