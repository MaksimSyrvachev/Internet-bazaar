import { type Auction } from '.prisma/client';

import { type Ad } from '@/types/ads';
import { CreateEditAd } from '@/components/CreateEditAd';

type Props = {
	ad?: Ad;
	auction?: Auction;
};
export const EditCreateItemDialog = (props: Props) => (
	<div>{props.ad && <CreateEditAd ad={props.ad} />}</div>
);
