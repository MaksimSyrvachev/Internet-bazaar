import z from 'zod';

export const putFavoriteSchema = z.object({
	userId: z.string(),
	adId: z.string().optional(),
	auctionId: z.string().optional()
});
