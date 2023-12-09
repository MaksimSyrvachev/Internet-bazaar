import { db } from '@/server/db';
import { type SendingEmail } from '@/types/sendingEmail';
import {
	sendEmailNoWinner,
	sendEmailToSeller,
	sendEmailWinner
} from '@/server/sendEmail';

export const GET = async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const lowerBound = today.getTime();

	today.setHours(23, 59, 59, 0);
	const upperBound = today.getTime();

	const auctions = await db.auction.findMany({
		include: {
			bids: {
				include: {
					bidder: {}
				},
				orderBy: {
					amount: 'desc'
				},
				take: 1
			},
			author: {}
		},
		where: {
			deadlineTime: {
				gte: lowerBound,
				lte: upperBound
			}
		}
	});

	auctions.map(async auction => {
		if (auction.bids[0].bidderId === auction.author.id) {
			if (auction.author.email !== null) {
				const email: SendingEmail = {
					text: 'Your auction was not sold',
					to: auction.author.email,
					from: '',
					title: auction.title
				};

				try {
					await sendEmailNoWinner(email);
				} catch (error) {
					console.log(error);
				}
			}
		} else {
			if (
				auction.author.email !== null &&
				auction.bids[0].bidder.email !== null
			) {
				const emailToWinner: SendingEmail = {
					text: '',
					to: auction.bids[0].bidder.email,
					from: auction.author.email,
					title: auction.title
				};

				const emailToSeller: SendingEmail = {
					text: '',
					to: auction.author.email,
					from: auction.bids[0].bidder.email,
					title: auction.title
				};

				try {
					await sendEmailWinner(emailToWinner);
					await sendEmailToSeller(emailToSeller);
				} catch (error) {
					console.log(error);
				}
			}
		}
	});

	return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
