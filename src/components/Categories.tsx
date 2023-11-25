'use client';

import Spinner from "@/components/Spinner";
import ClickableCategory from "@/components/ClickableCategory";

type Props = {
	categories?: string[];
};

export const Categories = (props: Props) => {

	if (props.categories === undefined) {
		return (
			<div className="flex items-center justify-center p-2">
				<Spinner/>
			</div>
		)
	}
	return(
		<div className="flex-col bg-primaryBackground p-5">
			{props.categories.map(category => <div className="flex items-center justify-center" key={category}><ClickableCategory category={category}/></div>)}
		</div>
	);
}
