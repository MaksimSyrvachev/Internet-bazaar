import { Suspense, type PropsWithChildren } from 'react';

import { CategoriesFetch } from '@/components/CategoriesFetch';
import { LeftFilter } from '@/components/LeftFilter';
import { LeftFilterProvider } from '@/components/LeftFilterProvider';

const Layout = ({ children }: PropsWithChildren) => (
	<LeftFilterProvider>
		<div className="w-full">
			<div className="md:flex md:space-x-2">
				<div className="md:h-auto md:w-72 md:flex-grow-0">
					<Suspense fallback={<LeftFilter />}>
						<CategoriesFetch />
					</Suspense>
				</div>
				<div className="md:flex-grow">{children}</div>
			</div>
		</div>
	</LeftFilterProvider>
);

export default Layout;
