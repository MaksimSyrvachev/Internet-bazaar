'use client';
import { useAuctions } from '@/hooks/useAuctions';
import { type AuctionWithBid } from '@/types/auctions';
import { useFilter } from '@/hooks/useFilter';

import { AdOrAuction } from './AdOrAuction';

export const Auctions = () => {
	const { data: auctions, isPending, error } = useAuctions();
	const filteredData = useFilter(auctions) as AuctionWithBid[];

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<ul>
			{filteredData
				.filter(auc => Number(auc.deadlineTime) - new Date().getTime() >= 0)
				.map(auction => (
					<li key={auction.id}>
						<AdOrAuction auction={auction} />
					</li>
				))}
		</ul>
	);
};
