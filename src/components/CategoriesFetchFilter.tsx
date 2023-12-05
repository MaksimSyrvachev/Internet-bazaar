import { getCategoriesForFilter } from '@/server/testData';
import { LeftFilter } from '@/components/LeftFilter';

export const CategoriesFetchFilter = async () => {
	const categories = await getCategoriesForFilter();

	return <LeftFilter categories={categories} />;
};
