'use client';

import { type PropsWithChildren, useState } from 'react';

import { ShowCategoriesSearchContext } from '@/components/Providers';

export const LeftFilterProvider = ({ children }: PropsWithChildren) => {
	const methods = useState<boolean>(true);

	return (
		<ShowCategoriesSearchContext.Provider value={methods}>
			{children}
		</ShowCategoriesSearchContext.Provider>
	);
};
