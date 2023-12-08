import type z from 'zod';

import { type bidding } from '@/validators/bidding';

export type Bidding = z.infer<typeof bidding>;
