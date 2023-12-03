import { type User } from '.prisma/client';
import { loremIpsum } from 'react-lorem-ipsum';

import { AdDetail } from '@/components/AdDetail';
import { type Ad } from '@/validators/ads';

type IdPageProps = {
	params: {
		id: string;
	};
};

const IdPage = ({ params }: IdPageProps) => {
	//TODO fetch data
	const ad: Ad = {
		title: 'TEsting Ad',
		description: loremIpsum()[0],
		authorId: 'a',
		categoryId: 'a',
		id: 'Q',
		image_URL: 'https://picsum.photos/seed/picsum/200/300',
		price: 89
	};

	const author: User = {
		id: 'a',
		name: 'testing',
		phone: 'aaaaaa',
		email: 'AAAAAAAA',
		emailVerified: null,
		image: null
	};

	return (
		<div className="w-full pe-10 ps-10">
			<AdDetail ad={ad} author={author} />
		</div>
	);
};

export default IdPage;
