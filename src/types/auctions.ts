import type z from 'zod';

import {
	type auctionFormSchema,
	type createAuctionSchema,
	type postAuctionSchema,
	type postBidSchema,
	type showAuctionAndBidSchema
} from '@/validators/auctions';

export type AuctionWithBid = z.infer<typeof showAuctionAndBidSchema>;

export type AuctionForm = z.infer<typeof auctionFormSchema>;

export type CreateAuction = z.infer<typeof createAuctionSchema>;

export type PostAuction = z.infer<typeof postAuctionSchema>;

export type PostBid = z.infer<typeof postBidSchema>;
