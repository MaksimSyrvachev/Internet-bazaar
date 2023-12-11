'use client';

import { useContext } from 'react';

import { CategorySelectedContext } from '@/components/Providers';
import { type Category } from '@/types/categories';

type Props = {
	category: Category;
};

const ClickableCategory = (props: Props) => {
	const [categorySelected, setCategorySelected] = useContext(
		CategorySelectedContext
	);

	return (
		<div>
			{categorySelected === props.category.id? (
				<button
					className="bg-selectedPrimary underline p-0.5 mt-0.5 rounded hover:bg-hoverPrimary hover:rounded"
					onClick={() => setCategorySelected(props.category.id)}
				>
					{props.category.name}
				</button>
			) : (
				<button
					className="hover:underline p-0.5 mt-0.5 hover:bg-hoverPrimary hover:rounded"
					onClick={() => setCategorySelected(props.category.id)}
				>
					{props.category.name}
				</button>
			)}
		</div>
	);
};

export default ClickableCategory;
