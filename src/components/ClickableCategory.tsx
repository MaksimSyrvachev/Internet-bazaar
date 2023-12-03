'use client';

import { useContext } from 'react';

import { CategorySelectedContext } from '@/components/Providers';
import { Category } from '@/types/categories';

type Props = {
	category: Category;
};

const ClickableCategory = (props: Props) => {
	const [_, setCategorySelected] = useContext(CategorySelectedContext);

	return (
		<button
			className="underline"
			onClick={() => setCategorySelected(props.category.id)}
		>
			{props.category.name}
		</button>
	);
};

export default ClickableCategory;
