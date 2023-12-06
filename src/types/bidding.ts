import type z from 'zod';

import {
	type sendingEmailSchema,
	type textEmail
} from '@/validators/sendingEmail';
import { type bidding } from '@/validators/bidding';

export type Bidding = z.infer<typeof bidding>;
