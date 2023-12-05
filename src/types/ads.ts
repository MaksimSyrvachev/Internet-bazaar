import type z from 'zod';

import {
	type adFormSchema,
	type adSchema,
	type editAdSchema,
	type postAdSchema
} from '@/validators/ads';

export type Ad = z.infer<typeof adSchema>;

export type AdForm = z.infer<typeof adFormSchema>;

export type AdPost = z.infer<typeof postAdSchema>;

export type AdEdit = z.infer<typeof editAdSchema>;
