'use client';

import { useSession } from 'next-auth/react';

import { useFilter } from '@/hooks/useFilter';
import { type AuctionWithBid } from '@/types/auctions';
import { type Ad } from '@/types/ads';
import { useMyListing } from '@/hooks/useMyListing';
import { useFavorites } from '@/hooks/useFavourites';

import { AdOrAuction } from './AdOrAuction';

export const MyListing = () => {
	const { data } = useSession();
	const { data: myListings, isPending, error } = useMyListing(data?.user.id);
	const filteredData = useFilter(myListings) as (AuctionWithBid | Ad)[];
	const { data: favorites } = useFavorites(data?.user.id);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<ul>
			{filteredData.map(adOrAuc =>
				'bids' in adOrAuc ? (
					<AdOrAuction key={adOrAuc.id} auction={adOrAuc} />
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
