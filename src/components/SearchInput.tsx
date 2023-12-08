'use client';

import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import { FilterSearchContext } from '@/components/Providers';

type FilterInputType = {
	input: string;
};

const SearchInput = () => {
	const [_, setFilterSearch] = useContext(FilterSearchContext);
	const methods = useForm<FilterInputType>();
	const inputValue = methods.watch('input');

	React.useEffect(() => {
		setFilterSearch(inputValue);
	});

	return (
		<div>
			<div className="flex items-center justify-center rounded-md bg-white shadow-md">
				<input
					className="w-full rounded-l-md ps-1 focus:outline-none"
					type="search"
					placeholder="Search..."
					{...methods.register('input')}
				/>
				<div className="rounded-r-md bg-gray-200 p-2">
					<FaSearch />
				</div>
			</div>
		</div>
	);
};

export default SearchInput;
