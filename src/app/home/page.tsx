import React, { Suspense } from 'react';

import { Ads } from '@/components/Ads';
import { CategoriesFetchFilter } from '@/components/CategoriesFetchFilter';
import { LeftFilter } from '@/components/LeftFilter';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';

const Home = () => (
	<LeftFilterProvider>
		<div className="w-full">
			<div className="md:flex md:space-x-2">
				<div className="md:h-auto md:w-72 md:flex-grow-0">
					<Suspense fallback={<LeftFilter />}>
						<CategoriesFetchFilter />
					</Suspense>
				</div>
				<div className="md:flex-grow">
					<Ads />
				</div>
			</div>
		</div>
	</LeftFilterProvider>
);

export default Home;
