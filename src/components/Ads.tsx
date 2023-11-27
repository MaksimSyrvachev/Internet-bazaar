'use client';


import React, {useContext, useEffect} from "react";
import {CategorySelectedContext, FilterSearchContext} from "@/components/Providers";
import {Ad} from "@/components/Ad";
import {randomUUID} from "crypto";

export const Ads = () => {

	const [categorySelect, _] = useContext(CategorySelectedContext)
	const [searchFilter, __] = useContext(FilterSearchContext)

	useEffect(() => {
		console.log(categorySelect)
	}, [categorySelect]);

	useEffect(() => {
		console.log(searchFilter)
	}, [searchFilter]);

	const crypto = require('crypto');

	return(
		<div>
			{[1,1,1,1,1,1,1,1,1,1,1,1].map(_ => <Ad key={crypto.randomBytes(16).toString('hex')}/>)}
		</div>
	);
}
