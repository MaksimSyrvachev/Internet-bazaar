'use client';


import {useContext, useEffect} from "react";
import {CategorySelectedContext, FilterSearchContext} from "@/components/Providers";

export const Ads = () => {

	const [categorySelect, _] = useContext(CategorySelectedContext)
	const [searchFilter, __] = useContext(FilterSearchContext)

	useEffect(() => {
		console.log(categorySelect)
	}, [categorySelect]);

	useEffect(() => {
		console.log(searchFilter)
	}, [searchFilter]);

	return(
		<div>
			INZERATY
		</div>
	);
}
