import type z from 'zod';

import { putUserSchema, type userSchema } from '@/validators/user';

export type User = z.infer<typeof userSchema>;
