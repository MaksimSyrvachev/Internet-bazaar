'use client';

import React, { useContext, useEffect, useState } from 'react';

import {
	CategorySelectedContext,
	FilterSearchContext
} from '@/components/Providers';
import { useAds } from '@/hooks/useAds';
import { type Ad } from '@/types/ads';

import { AdOrAuction } from './AdOrAuction';

export const Ads = () => {
	const { data: ads, isPending, error } = useAds();
	const [categorySelect, setCategorySelected] = useContext(
		CategorySelectedContext
	);
	const [searchFilter, setSearchFilter] = useContext(FilterSearchContext);
	const [filteredData, setFilteredData] = useState<Ad[] | undefined>([]);

	useEffect(() => {
		setSearchFilter('');
		setCategorySelected('');
	}, []);

	useEffect(() => {
		if (ads) {
			if (searchFilter !== undefined && searchFilter !== '') {
				const resultAds: Ad[] = ads.filter(ad =>
					ad.title.toLowerCase().includes(searchFilter.toLowerCase())
				);
				setFilteredData(resultAds);
			} else if (
				categorySelect !== null &&
				categorySelect !== '' &&
				categorySelect !== 'all'
			) {
				const resultAds: Ad[] = ads.filter(
					ad => ad.categoryId === categorySelect
				);
				setFilteredData(resultAds);
			} else {
				setFilteredData(ads);
			}
		}
	}, [ads, searchFilter, categorySelect]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<ul>
			{filteredData?.map(ad => (
				<AdOrAuction key={ad.id} ad={ad} />
			))}
		</ul>
	);
};
