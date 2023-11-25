"use client"

import {useContext} from "react";
import {CategorySelectedContext} from "@/components/Providers";

type Props = {
	category: string;
};

const ClickableCategory = ( props: Props) => {
	const [_, setCategorySelected] = useContext(CategorySelectedContext)

	return(
		<button className="underline" onClick={() => setCategorySelected(props.category)}>
			{props.category}
		</button>
	);
}

export default ClickableCategory;
