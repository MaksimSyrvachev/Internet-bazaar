'use client';

import { useSession } from 'next-auth/react';

import { type Ad } from '@/types/ads';
import { useFilter } from '@/hooks/useFilter';
import { useFavorites } from '@/hooks/useFavourites';
import { type AuctionWithBid } from '@/types/auctions';

import { AdOrAuction } from './AdOrAuction';
import Spinner from './Spinner';

export const Favorites = () => {
	const { data } = useSession();
	const { data: favorites, isPending, error } = useFavorites(data?.user.id);
	const filteredData = useFilter(favorites) as (AuctionWithBid | Ad)[];

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
			{filteredData.map(adOrAuc =>
				'bids' in adOrAuc ? (
					<AdOrAuction
						key={adOrAuc.id}
						auction={adOrAuc}
						favorites={favorites}
						userId={data?.user.id}
					/>
				) : (
					<AdOrAuction
						key={adOrAuc.id}
						ad={adOrAuc}
						favorites={favorites}
						userId={data?.user.id}
					/>
				)
			)}
		</ul>
	);
};
