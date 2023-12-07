import { Suspense } from 'react';

import { CreateEditAd } from '@/components/CreateEditAd';
import { CreateEditAuction } from '@/components/CreateEditAuction';
import { AuthCheck } from '@/components/AuthCheck';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';
import { CategoriesFetchFilter } from '@/components/CategoriesFetchFilter';
import { LeftFilter } from '@/components/LeftFilter';
import { MyListing } from '@/components/MyListing';

const MyListingPage = () => (
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
						<div className="flex p-5">
							<div className="flex items-center justify-end gap-2">
								<CreateEditAd />
								<CreateEditAuction />
							</div>
						</div>
						<MyListing />
					</div>
				</div>
			</div>
		</LeftFilterProvider>
	</AuthCheck>
);

export default MyListingPage;
