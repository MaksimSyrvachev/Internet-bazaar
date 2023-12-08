'use client';
import { useSession } from 'next-auth/react';

import { useAuctions } from '@/hooks/useAuctions';
import { type AuctionWithBid } from '@/types/auctions';
import { useFilter } from '@/hooks/useFilter';
import { useFavorites } from '@/hooks/useFavourites';

import { AdOrAuction } from './AdOrAuction';
import Spinner from './Spinner';

export const Auctions = () => {
	const { data: auctions, isPending, error } = useAuctions();
	const filteredData = useFilter(auctions) as AuctionWithBid[];
	const { data } = useSession();
	const { data: favorites } = useFavorites(data?.user.id);

	if (isPending) {
		return (
			<div className="mt-2 flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<ul>
			{filteredData
				.filter(auc => Number(auc.deadlineTime) - new Date().getTime() >= 0)
				.map(auction => (
					<li key={auction.id}>
						<AdOrAuction
							auction={auction}
							favorites={favorites}
							userId={data?.user.id}
						/>
					</li>
				))}
		</ul>
	);
};
