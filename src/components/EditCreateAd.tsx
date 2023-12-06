import { type Ad } from '@/types/ads';
import { CreateEditAd } from '@/components/CreateEditAd';

type Props = {
	ad: Ad;
};
export const EditCreateAd = (props: Props) => <CreateEditAd ad={props.ad} />;
