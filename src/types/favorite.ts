import type z from 'zod';

import { type putFavoriteSchema } from '@/validators/favorite';

export type putAndDeleteFavorite = z.infer<typeof putFavoriteSchema>;
