import React from 'react';

import { getUserById } from '@/server/user';
import { AuctionDetail } from '@/components/AuctionDetail';
import { getAuctionById } from '@/server/auctions';
import { AuthCheck } from '@/components/AuthCheck';

type IdPageProps = {
	params: {
		id: string;
	};
};

const IdPage = async ({ params }: IdPageProps) => {
	const auction = await getAuctionById(params.id);
	if (auction === null) {
		throw new Error();
	}
	const user = await getUserById(auction.authorId);
	if (user === null) {
		throw new Error();
	}

	const feAuction = {
		id: auction.id,
		publishedAt: auction.publishedAt.toString(),
		updatedAt: auction.updatedAt.toString(),
		title: auction.title,
		description: auction.description,
		image_URL: auction.image_URL,
		deadlineTime: auction.deadlineTime.toString(),
		authorId: auction.authorId,
		categoryId: auction.categoryId,
		bids: auction.bids.map(bid => ({
			id: bid.id,
			amount: bid.amount,
			createdAt: bid.createdAt.toString(),
			auctionId: bid.auctionId,
			bidderId: bid.bidderId
		}))
	};

	const feUser = {
		id: user.id,
		name: user.name,
		phone: user.phone,
		emailVerified: user.emailVerified?.toString(),
		email: user.email,
		image: user.image
	};

	return (
		<AuthCheck>
			<div className="w-full pe-10 ps-10">
				<AuctionDetail author={feUser} auction={feAuction} />
			</div>
		</AuthCheck>
	);
};

export default IdPage;
