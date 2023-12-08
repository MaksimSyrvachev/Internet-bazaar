type DataType = {
	id: string;
	name: string | null;
};

export const changeUsersName = async (data: DataType) => {
	const response = await fetch(`/api/user`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (response.status === 200) {
		return response.ok;
	}

	throw new Error();
};
