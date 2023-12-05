'use client';

import { useFormContext } from 'react-hook-form';

import { type Ad, type AdForm } from '@/types/ads';
import { type Category } from '@/types/categories';

type TypeProps = {
	categories?: Category[];
	ad?: Ad;
};

export const CategoriesField = (props: TypeProps) => {
	const { register } = useFormContext<AdForm>();

	if (props.categories === undefined) {
		return (
			<div className="flex flex-col gap-2">
				<label htmlFor="name">Types</label>
				<select
					className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow"
					disabled
					defaultValue="loading"
				>
					<option value="loading">Loading...</option>
				</select>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="name">Types</label>
			<select
				className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow"
				{...register('categoryId')}
				defaultValue={props.ad !== undefined ? props.ad.categoryId : undefined}
			>
				{props.categories.map(category => (
					<option value={category.id} key={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
};
