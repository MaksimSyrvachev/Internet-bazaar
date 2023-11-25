"use client"

import React, {useContext} from 'react';
import { FaSearch } from 'react-icons/fa';
import {FilterSearchContext} from "@/components/Providers";
import {SubmitHandler, useForm} from "react-hook-form";

type FilterInputType = {
	input: string
}

const SearchInput = () => {

	const [filterSearch, setFilterSearch] = useContext(FilterSearchContext)
	const methods = useForm<FilterInputType>();
	const inputValue = methods.watch('input')

	React.useEffect(() => {
		setFilterSearch(inputValue);
	}, [inputValue]);

	return (
		<div className="flex items-center justify-center bg-white shadow-md rounded-md">
			<input
				className="w-full ps-1 rounded-l-md focus:outline-none"
				type="search"
				placeholder="Search..."
				{...methods.register("input")}
			/>
			<div className="p-2 bg-gray-200 rounded-r-md">
				<FaSearch />
			</div>
		</div>
	);
};

export default SearchInput;
