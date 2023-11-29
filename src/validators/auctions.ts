import z from 'zod';

const auctionSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(50, { message: 'Title must be 50 or fewer characters long' }),
	description: z
		.string()
		.max(500, { message: 'Description must be 500 or fewer characters long' })
		.optional(),
	image_URL: z.string().optional(),
	deadlineTime: z.number(),
	authorId: z.string(),
	categoryId: z.string()
});

const bidSchema = z.object({
	id: z.string(),
	amount: z.number().nonnegative('Price must not be a negative number'),
	auctionId: z.string(),
	bidderId: z.string()
});

const createBidSchema = bidSchema.omit({ id: true, auctionId: true });

export const postAuctionSchema = auctionSchema
	.extend({ createBidSchema })
	.omit({ id: true });

export const postBidSchema = bidSchema.omit({ id: true });
