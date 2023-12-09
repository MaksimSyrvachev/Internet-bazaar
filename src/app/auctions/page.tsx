import { Suspense } from 'react';
import { type Metadata } from 'next';

import { Auctions } from '@/components/Auctions';
import { CategoriesFetchFilter } from '@/components/CategoriesFetchFilter';
import { LeftFilter } from '@/components/LeftFilter';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';

export const metadata: Metadata = {
	title: 'Auctions'
};

const AuctionsPage = () => (
	<LeftFilterProvider>
		<div className="w-full">
			<div className="md:flex md:space-x-2">
				<div className="md:h-auto md:w-72 md:flex-grow-0">
					<Suspense fallback={<LeftFilter />}>
						<CategoriesFetchFilter />
					</Suspense>
				</div>
				<div className="md:flex-grow">
					<Auctions />
				</div>
			</div>
		</div>
	</LeftFilterProvider>
);

export default AuctionsPage;
