import {Categories} from "@/components/Categories";
import {getCategories} from "@/server/testData";

export const CategoriesFetch = async () => {

	const categories = await getCategories();

	return(
		<Categories categories={categories}/>
	);
}
