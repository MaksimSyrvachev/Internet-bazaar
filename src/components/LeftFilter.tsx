'use client';

import { useContext, useEffect } from 'react';

import SearchInput from '@/components/SearchInput';
import { ShowCategoriesSearchContext } from '@/components/Providers';
import Spinner from '@/components/Spinner';
import { ShowHIdeCategories } from '@/components/ShowHideCategories';
import ClickableCategory from '@/components/ClickableCategory';
import useScreenSize from '@/hooks/useScreenSize';
import { type Category } from '@/types/categories';

type Props = {
	categories?: Category[];
};

//TODO use Suspense and fallback for loading
export const LeftFilter = ({ categories }: Props) => {
	const [showLeftFilter, setShowFilter] = useContext(
		ShowCategoriesSearchContext
	);
	const screenSize = useScreenSize();

	useEffect(() => {
		if (screenSize.width >= 768) {
			setShowFilter(true);
		} else {
			setShowFilter(false);
		}
	}, [screenSize]);

	if (categories === undefined) {
		return (
			<div>
				<div className="block md:hidden">
					<ShowHIdeCategories />
				</div>
				{showLeftFilter && (
					<div className="m-5 flex-col bg-primaryBackground p-3">
						<div className="flex-1">
							<SearchInput />
						</div>
						<div className="mt-2 flex items-center justify-center">
							<Spinner />
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<div>
			<div className="block md:hidden">
				<ShowHIdeCategories />
			</div>
			{showLeftFilter && (
				<div className="m-5 flex-col bg-primaryBackground p-3">
					<div className="flex-1">
						<SearchInput />
					</div>
					<div className="flex-col bg-primaryBackground p-5">
						{categories.map(category => (
							<div
								className="flex items-center justify-center"
								key={category.id}
							>
								<ClickableCategory category={category} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
