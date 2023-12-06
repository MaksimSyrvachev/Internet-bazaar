'use client';

import React, { useContext, useEffect, useState } from 'react';

import {
	CategorySelectedContext,
	FilterSearchContext
} from '@/components/Providers';
import { useAuctions } from '@/hooks/useAuctions';
import { type AuctionWithBid } from '@/types/auctions';

import { AdOrAuction } from './AdOrAuction';

export const Auctions = () => {
	const { data: auctions, isPending, error } = useAuctions();
	const [categorySelect, setCategorySelected] = useContext(
		CategorySelectedContext
	);
	const [searchFilter, setSearchFilter] = useContext(FilterSearchContext);
	const [filteredData, setFilteredData] = useState<
		AuctionWithBid[] | undefined
	>([]);

	useEffect(() => {
		setSearchFilter('');
		setCategorySelected('');
	}, []);

	useEffect(() => {
		if (auctions) {
			if (searchFilter !== undefined && searchFilter !== '') {
				const resultAuctions: AuctionWithBid[] = auctions.filter(auction =>
					auction.title.toLowerCase().includes(searchFilter.toLowerCase())
				);
				setFilteredData(resultAuctions);
			} else if (
				categorySelect !== null &&
				categorySelect !== '' &&
				categorySelect !== 'all'
			) {
				const resultAuctions: AuctionWithBid[] = auctions.filter(
					auction => auction.categoryId === categorySelect
				);
				setFilteredData(resultAuctions);
			} else {
				setFilteredData(auctions);
			}
		}
	}, [auctions, searchFilter, categorySelect]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<ul>
			{filteredData
				?.filter(
					auc => new Date(auc.deadlineTime).getTime() > new Date().getTime()
				)
				.map(auction => (
					<li key={auction.id}>
						<AdOrAuction auction={auction} />
					</li>
				))}
		</ul>
	);
};
