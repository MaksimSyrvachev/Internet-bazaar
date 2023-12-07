import z from 'zod';

import { adSchema } from './ads';
import { showAuctionAndBidSchema } from './auctions';

export const putFavoriteSchema = z.object({
	userId: z.string(),
	adId: z.string().optional(),
	auctionId: z.string().optional()
});

export const AdWithAuctionArray = z.array(adSchema.or(showAuctionAndBidSchema));
