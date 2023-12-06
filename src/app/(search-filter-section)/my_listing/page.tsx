import { CreateEditAd } from '@/components/CreateEditAd';
import { CreateEditAuction } from '@/components/CreateEditAuction';

const MyListingPage = () => (
	<div className="flex-col p-5">
		<div className="flex items-center justify-end gap-2">
			<CreateEditAd />
			<CreateEditAuction />
		</div>
	</div>
);

export default MyListingPage;
