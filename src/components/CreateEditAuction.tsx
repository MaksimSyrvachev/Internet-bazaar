import React, { Suspense } from 'react';

import { CategoriesField } from '@/components/CategoriesField';
import { CategoriesFetchAd } from '@/components/CategoriesFetchAd';
import { CreateAuctionProvider } from '@/components/CreateAuctionProvider';

export const CreateEditAuction = () => (
	<div>
		<CreateAuctionProvider>
			<Suspense fallback={<CategoriesField />}>
				<CategoriesFetchAd />
			</Suspense>
		</CreateAuctionProvider>
	</div>
);
