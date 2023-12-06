import React, { Suspense } from 'react';

import { type Ad } from '@/types/ads';
import { CreateEditAdProvider } from '@/components/CreateEditAdProvider';
import { CategoriesField } from '@/components/CategoriesField';
import { CategoriesFetchAd } from '@/components/CategoriesFetchAd';

type Props = {
	ad?: Ad;
};

export const CreateEditAd = (props: Props) => (
	<div>
		<CreateEditAdProvider ad={props.ad}>
			<Suspense fallback={<CategoriesField />}>
				<CategoriesFetchAd ad={props.ad} />
			</Suspense>
		</CreateEditAdProvider>
	</div>
);
