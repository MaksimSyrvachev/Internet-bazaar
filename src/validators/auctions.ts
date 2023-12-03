import z from 'zod';

const auctionSchema = z.object({
	id: z.string(),
	publishedAt: z.string(),
	updatedAt: z.string(),
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(50, { message: 'Title must be 50 or fewer characters long' }),
	description: z
		.string()
		.max(500, { message: 'Description must be 500 or fewer characters long' })
		.nullable(),
	image_URL: z.string().nullable(),
	deadlineTime: z.string(),
	authorId: z.string(),
	categoryId: z.string()
});

const bidSchema = z.object({
	id: z.string(),
	amount: z
		.number()
		.nonnegative({ message: 'Price must not be a negative number' }),
	createdAt: z.string(),
	auctionId: z.string(),
	bidderId: z.string()
});

const createBidSchema = bidSchema.omit({
	id: true,
	auctionId: true,
	createdAt: true
});

export const postAuctionSchema = auctionSchema
	.extend({ createBidSchema })
	.omit({ id: true, updatedAt: true, publishedAt: true });

export const postBidSchema = bidSchema.omit({ id: true, createdAt: true });

const bids = z.array(bidSchema);
export const showAuctionAndBidSchema = auctionSchema.extend({ bids });
export const validationGetAuctionsShema = z.array(showAuctionAndBidSchema);

export const bidFormSchema = bidSchema.pick({ amount: true });

export const auctionFormSchema = auctionSchema.extend({ bidFormSchema }).omit({
	id: true,
	updatedAt: true,
	publishedAt: true,
	authorId: true,
	categoryId: true
});
