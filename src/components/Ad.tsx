'use client';

import {FaHeart} from "react-icons/fa";
import { type Ad as AdModel } from '@/validators/ads';

type Props = {
	ad?: AdModel;
};

export const Ad = (props: Props) => {

	return(
		<div className="border-2 flex m-2 p-2 hover:bg-adBackground hover:cursor-pointer" onClick={() => console.log(props.ad)}>
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
