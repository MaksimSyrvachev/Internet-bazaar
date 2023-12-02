import React, { Suspense } from 'react';

import { LeftFilter } from '@/components/LeftFilter';
import { Ads } from '@/components/Ads';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';
import { CategoriesFetch } from '@/components/CategoriesFetch';

const Home = () => (
	<LeftFilterProvider>
		<div className="w-full">
			<div className="md:flex md:space-x-2">
				<div className="md:h-auto md:w-72 md:flex-grow-0">
					<Suspense fallback={<LeftFilter />}>
						<CategoriesFetch />
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
