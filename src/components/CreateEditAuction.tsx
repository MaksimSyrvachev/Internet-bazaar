import React, { Suspense } from 'react';

import { CategoriesField } from '@/components/CategoriesField';
import { CategoriesFetchAd } from '@/components/CategoriesFetchAd';
import { type AuctionWithBid } from '@/types/auctions';
import { CreateAuctionProvider } from '@/components/CreateAuctionProvider';

type Props = {
	auction?: AuctionWithBid;
};

export const CreateEditAuction = (props: Props) => (
	<div>
		<CreateAuctionProvider>
			<Suspense fallback={<CategoriesField />}>
				<CategoriesFetchAd />
			</Suspense>
		</CreateAuctionProvider>
	</div>
);
