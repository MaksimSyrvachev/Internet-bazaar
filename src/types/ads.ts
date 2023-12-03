import type z from 'zod';

import { type adFormSchema, type adSchema } from '@/validators/ads';

export type Ad = z.infer<typeof adSchema>;

export type AdForm = z.infer<typeof adFormSchema>;
