import type z from 'zod';

import {
	type sendingEmailSchema,
	type textEmail
} from '@/validators/sendingEmail';

export type TextEmail = z.infer<typeof textEmail>;
export type SendingEmail = z.infer<typeof sendingEmailSchema>;
