import { TopNavigation } from '@/components/TopNavigation';
import { PropsWithChildren } from 'react';

const Navigation = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex-row">
			<div className="sticky top-0 flex-1">
				<TopNavigation />
			</div>
			<div className="flex flex-1">{children}</div>
		</div>
	);
};

export default Navigation;
