'use client';

import Spinner from "@/components/Spinner";
import ClickableCategory from "@/components/ClickableCategory";

type Props = {
	categories?: string[];
};

export const Categories = (props: Props) => {

	if (props.categories === undefined) {
		return (
			<div className="flex items-center justify-center">
				<Spinner/>
			</div>
		)
	}
	return(
		<div className="flex-col bg-primaryBackground pe-10 ps-10 m-5">
			{props.categories.map(category => <div className="flex-1" key={category}><ClickableCategory category={category}/></div>)}
		</div>
	);
}
