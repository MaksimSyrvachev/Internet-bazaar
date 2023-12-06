import { AdDetail } from '@/components/AdDetail';
import { getAdById } from '@/server/ads';
import { getUserById } from '@/server/user';
import { EditCreateAd } from '@/components/EditCreateAd';
import { AuthCheck } from '@/components/AuthCheck';

type IdPageProps = {
	params: {
		id: string;
	};
};

const IdPage = async ({ params }: IdPageProps) => {
	const ad = await getAdById(params.id);
	if (ad === null) {
		throw new Error();
	}
	const user = await getUserById(ad.authorId);
	if (user === null) {
		throw new Error();
	}

	const feAd = {
		id: ad.id,
		publishedAt: ad.publishedAt.toString(),
		updatedAt: ad.updatedAt.toString(),
		title: ad.title,
		description: ad.description,
		price: ad.price,
		image_URL: ad.image_URL,
		authorId: ad.authorId,
		categoryId: ad.categoryId
	};

	const feUser = {
		id: user.id,
		name: user.name,
		phone: user.phone,
		emailVerified: user.emailVerified?.toString(),
		email: user.email,
		image: user.image
	};

	return (
		<AuthCheck>
			<div className="w-full pe-10 ps-10">
				<AdDetail ad={feAd} author={feUser}>
					<EditCreateAd ad={feAd} />
				</AdDetail>
			</div>
		</AuthCheck>
	);
};

export default IdPage;
