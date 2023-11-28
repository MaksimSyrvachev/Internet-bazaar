import {getCategories} from "@/server/testData";
import {LeftFilter} from "@/components/LeftFilter";

export const CategoriesFetch = async () => {

	const categories = await getCategories();

	return(
		<LeftFilter categories={categories}/>
	);
}
