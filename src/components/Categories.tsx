'use client';

import Spinner from "@/components/Spinner";
import ClickableCategory from "@/components/ClickableCategory";
import {useContext} from "react";
import {ShowCategoriesSearchContext} from "@/components/Providers";

type Props = {
	categories?: string[];
};

export const Categories = (props: Props) => {

	const [showLeftFilter, setShowLeftFilter] = useContext(ShowCategoriesSearchContext)

	if (props.categories === undefined) {
		return (
			<div>
				{showLeftFilter && <div className="flex md:hidden items-center justify-center p-2">
					<Spinner/>
				</div>}
				<div className="hidden md:flex items-center justify-center p-2">
					<Spinner/>
				</div>
			</div>
		)
	}
	return(
		<div>
			{showLeftFilter && <div className="flex-col md:hidden bg-primaryBackground p-5">
				{props.categories.map(category => <div className="flex items-center justify-center" key={category}><ClickableCategory category={category}/></div>)}
			</div>}
			<div className="hidden md:block">
				<div className="flex-col bg-primaryBackground p-5">
					{props.categories.map(category => <div className="flex items-center justify-center" key={category}><ClickableCategory category={category}/></div>)}
				</div>
			</div>
		</div>
	);
}
