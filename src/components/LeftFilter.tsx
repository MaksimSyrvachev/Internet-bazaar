
import SearchInput from "@/components/SearchInput";
import React, {Suspense} from "react";
import {Categories} from "@/components/Categories";
import {CategoriesFetch} from "@/components/CategoriesFetch";


export const LeftFilter = () => {
	return(
		<div className="flex-col bg-primaryBackground md:p-3 m-5">
			<div className="flex-1">
				<SearchInput/>
			</div>
			<Suspense fallback={<Categories/>}>
				<CategoriesFetch/>
			</Suspense>
		</div>
	);
}
