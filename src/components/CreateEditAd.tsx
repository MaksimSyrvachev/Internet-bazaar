import React, { Suspense } from 'react';

import { type Ad } from '@/types/ads';
import { CreateEditProvider } from '@/components/CreateEditAdProvider';
import { CategoriesField } from '@/components/CategoriesField';
import { CategoriesFetchAd } from '@/components/CategoriesFetchAd';

type Props = {
	ad?: Ad;
};

export const CreateEditAd = (props: Props) => (
	<div>
		<CreateEditProvider ad={props.ad}>
			<Suspense fallback={<CategoriesField />}>
				<CategoriesFetchAd ad={props.ad} />
			</Suspense>
		</CreateEditProvider>
	</div>
);
