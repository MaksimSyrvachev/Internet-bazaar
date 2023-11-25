import {TopNavigation} from "@/components/TopNavigation";
import {PropsWithChildren} from "react";

const Navigation = ({children} : PropsWithChildren) => {

	return (
		<div className="flex-row">
			<div className="flex-1 sticky top-0">
				<TopNavigation/>
			</div>
			<div className="flex-1 flex">
				{children}
			</div>
		</div>
	);
};

export default Navigation;
