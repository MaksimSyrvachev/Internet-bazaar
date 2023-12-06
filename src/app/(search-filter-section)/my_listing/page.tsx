import { CreateEditAd } from '@/components/CreateEditAd';
import { CreateEditAuction } from '@/components/CreateEditAuction';
import { AuthCheck } from '@/components/AuthCheck';

const MyListingPage = () => (
	<AuthCheck>
		<div className="flex-col p-5">
			<div className="flex items-center justify-end gap-2">
				<CreateEditAd />
				<CreateEditAuction />
			</div>
		</div>
	</AuthCheck>
);

export default MyListingPage;
