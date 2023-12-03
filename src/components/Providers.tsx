'use client';

import { SessionProvider } from 'next-auth/react';
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type CategorySelectedContextState = [
	string | null,
	(categorySelected: string) => void
];
type FilterSearchContextState = [
	string | undefined,
	(filterSearch: string) => void
];
type ShowCategoriesContextState = [boolean, (filterSearch: boolean) => void];

const queryClient = new QueryClient();

export const CategorySelectedContext =
	createContext<CategorySelectedContextState>(undefined as never);

export const FilterSearchContext = createContext<FilterSearchContextState>(
	undefined as never
);

export const ShowCategoriesSearchContext =
	createContext<ShowCategoriesContextState>(undefined as never);

export const useCategorySelectedContext = () =>
	useContext(CategorySelectedContext);
export const useFilterSearchContext = () => useContext(FilterSearchContext);

export const Providers = ({ children }: PropsWithChildren) => {
	const categorySelectedState = useState<string | null>(null);
	const filterSearchState = useState<string | undefined>(undefined);

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<CategorySelectedContext.Provider value={categorySelectedState}>
					<FilterSearchContext.Provider value={filterSearchState}>
						{children}
					</FilterSearchContext.Provider>
				</CategorySelectedContext.Provider>
			</QueryClientProvider>
		</SessionProvider>
	);
};
