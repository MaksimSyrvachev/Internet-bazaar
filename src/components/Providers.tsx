'use client';

import {useState, type PropsWithChildren, createContext, useContext} from 'react';

export const Providers = ({ children }: PropsWithChildren) => {

	return (
		<div>
			{children}
		</div>
	);
};
