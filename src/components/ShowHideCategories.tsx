'use client';


import {useContext} from "react";
import {ShowCategoriesSearchContext} from "@/components/Providers";

export const ShowHIdeCategories = () => {

	const [showLeftFilter, setShowLeftFilter] = useContext(ShowCategoriesSearchContext)

	return(
		<button className="underline ms-5" onClick={() => setShowLeftFilter(!showLeftFilter)}>
			{showLeftFilter ? "Hide categories" : "Show categories"}
		</button>
	);
}
