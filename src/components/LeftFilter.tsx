'use client';

import React, { useContext } from 'react';

import SearchInput from '@/components/SearchInput';
import { ShowCategoriesSearchContext } from '@/components/Providers';
import Spinner from '@/components/Spinner';
import { ShowHIdeCategories } from '@/components/ShowHideCategories';
import ClickableCategory from '@/components/ClickableCategory';
import useScreenSize from '@/hooks/useScreenSize';

type Props = {
	categories?: string[];
};

export const LeftFilter = (props: Props) => {
	const [showLeftFilter, setShowFilter] = useContext(
		ShowCategoriesSearchContext
	);
	const screenSize = useScreenSize();

	React.useEffect(() => {
		if (screenSize.width >= 768) {
			setShowFilter(true);
		} else {
			setShowFilter(false);
		}
	}, [screenSize]);

	if (props.categories === undefined) {
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
						<div className="flex items-center justify-center p-2">
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
						{props.categories.map(category => (
							<div className="flex items-center justify-center" key={category}>
								<ClickableCategory category={category} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
