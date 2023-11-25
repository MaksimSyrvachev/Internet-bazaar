'use client';

import {FaHeart} from "react-icons/fa";

export const Ad = () => {

	return(
		<div className="border-2 flex m-2 p-2">
			<div className="w-2/12 flex items-center justify-center">
				<div>
					IMG
				</div>
			</div>
			<div className="flex-col w-6/12">
				<div>
					Title
				</div>
				<div>
					Description
				</div>
			</div>
			<div className="w-2/12 flex items-center justify-center">
				<div>
					Price
				</div>
			</div>
			<div className="w-1/12 flex items-end justify-end">
				<FaHeart/>
			</div>
		</div>
	);
}
