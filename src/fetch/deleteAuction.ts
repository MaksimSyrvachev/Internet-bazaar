export const deleteAuction = async (id: string) => {
	const response = await fetch(`/api/auction/${id}`, {
		method: 'DELETE'
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
