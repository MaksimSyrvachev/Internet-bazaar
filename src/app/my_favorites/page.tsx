import { Suspense } from 'react';

import { Favorites } from '@/components/Favorites';
import { CategoriesFetchFilter } from '@/components/CategoriesFetchFilter';
import { LeftFilter } from '@/components/LeftFilter';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';
import { AuthCheck } from '@/components/AuthCheck';

const MyFavoritesPage = () => (
	<AuthCheck>
		<LeftFilterProvider>
			<div className="w-full">
				<div className="md:flex md:space-x-2">
					<div className="md:h-auto md:w-72 md:flex-grow-0">
						<Suspense fallback={<LeftFilter />}>
							<CategoriesFetchFilter />
						</Suspense>
					</div>
					<div className="md:flex-grow">
						<Favorites />
					</div>
				</div>
			</div>
		</LeftFilterProvider>
	</AuthCheck>
);

export default MyFavoritesPage;
