import type z from 'zod';

import {
	type auctionFormSchema,
	type showAuctionAndBidSchema
} from '@/validators/auctions';

export type AuctionWithBid = z.infer<typeof showAuctionAndBidSchema>;

export type AuctionForm = z.infer<typeof auctionFormSchema>;
