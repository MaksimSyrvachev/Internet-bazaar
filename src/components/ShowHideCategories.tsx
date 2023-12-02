'use client';

import { useContext } from 'react';

import { ShowCategoriesSearchContext } from '@/components/Providers';

export const ShowHIdeCategories = () => {
	const [showLeftFilter, setShowLeftFilter] = useContext(
		ShowCategoriesSearchContext
	);

	return (
		<button
			className="ms-5 underline"
			onClick={() => setShowLeftFilter(!showLeftFilter)}
		>
			{showLeftFilter ? 'Hide categories' : 'Show categories'}
		</button>
	);
};
