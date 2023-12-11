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
			{categorySelected === props.category.id ? (
				<button
					className="mt-0.5 rounded bg-selectedPrimary p-0.5 underline hover:rounded hover:bg-hoverPrimary"
					onClick={() => setCategorySelected(props.category.id)}
				>
					{props.category.name}
				</button>
			) : (
				<button
					className="mt-0.5 p-0.5 hover:rounded hover:bg-hoverPrimary hover:underline"
					onClick={() => setCategorySelected(props.category.id)}
				>
					{props.category.name}
				</button>
			)}
		</div>
	);
};

export default ClickableCategory;
