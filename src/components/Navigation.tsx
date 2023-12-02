import { type PropsWithChildren } from 'react';

import { TopNavigation } from '@/components/TopNavigation';

const Navigation = ({ children }: PropsWithChildren) => (
	<div className="flex-row">
		<div className="sticky top-0 flex-1">
			<TopNavigation />
		</div>
		<div className="flex flex-1">{children}</div>
	</div>
);

export default Navigation;
