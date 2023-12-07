'use client';

import { useContext, useState, useEffect } from 'react';

import { type Ad } from '@/types/ads';
import { type AuctionWithBid } from '@/types/auctions';
import {
	CategorySelectedContext,
	FilterSearchContext
} from '@/components/Providers';

export const useFilter = (
	auctionsOrAds: AuctionWithBid[] | Ad[] | (AuctionWithBid | Ad)[] | undefined
) => {
	const [categorySelect, setCategorySelected] = useContext(
		CategorySelectedContext
	);
	const [searchFilter, setSearchFilter] = useContext(FilterSearchContext);
	const [filteredData, setFilteredData] = useState<
		AuctionWithBid[] | Ad[] | (AuctionWithBid | Ad)[]
	>([]);

	useEffect(() => {
		setSearchFilter('');
		setCategorySelected('');
	}, []);

	useEffect(() => {
		if (auctionsOrAds) {
			if (searchFilter !== undefined && searchFilter !== '') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const resultAuctionsOrAds: AuctionWithBid[] | Ad[] =
					auctionsOrAds.filter(auctionsOrAd =>
						auctionsOrAd.title
							.toLowerCase()
							.includes(searchFilter.toLowerCase())
					);
				setFilteredData(resultAuctionsOrAds);
			} else if (
				categorySelect !== null &&
				categorySelect !== '' &&
				categorySelect !== 'all'
			) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const resultAuctionsOrAds: AuctionWithBid[] | Ad[] =
					auctionsOrAds.filter(
						auctionsOrAd => auctionsOrAd.categoryId === categorySelect
					);
				setFilteredData(resultAuctionsOrAds);
			} else {
				setFilteredData(auctionsOrAds);
			}
		}
	}, [auctionsOrAds, searchFilter, categorySelect]);

	return filteredData;
};
