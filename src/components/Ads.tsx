'use client';
import { useSession } from 'next-auth/react';

import { useAds } from '@/hooks/useAds';
import { type Ad } from '@/types/ads';
import { useFilter } from '@/hooks/useFilter';
import { useFavorites } from '@/hooks/useFavourites';

import { AdOrAuction } from './AdOrAuction';

export const Ads = () => {
	const { data: ads, isPending, error } = useAds();
	const filteredData = useFilter(ads) as Ad[];
	const { data } = useSession();
	const { data: favorites } = useFavorites(data?.user.id);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<ul>
			{filteredData.map(ad => (
				<AdOrAuction
					key={ad.id}
					ad={ad}
					favorites={favorites}
					userId={data?.user.id}
				/>
			))}
		</ul>
	);
};
