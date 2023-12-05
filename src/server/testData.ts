import { type Category } from '@/types/categories';

import { db } from './db';

export const getCategoriesForFilter = async () => {
	const categories = await db.category.findMany();
	const all = { id: 'all', name: 'All Categories' };
	categories.unshift(all);
	return categories as Category[];
};

export const getCategories = async () => {
	const categories = await db.category.findMany();
	return categories as Category[];
};
