import { db } from './db';

export const getAuctionById = async (id: string) =>
	db.auction.findFirst({
		where: {
			id
		},
		include: {
			bids: {
				orderBy: {
					amount: 'desc'
				},
				take: 1
			}
		}
	});
