import React from 'react';

import { type Ad } from '@/types/ads';
import { getCategories } from '@/server/testData';
import { CategoriesField } from '@/components/CategoriesField';

type Props = {
	ad?: Ad;
};
export const CategoriesFetchAd = async (props: Props) => {
	const categories = await getCategories();
	return (
		<div>
			<CategoriesField categories={categories} ad={props.ad} />
		</div>
	);
};
