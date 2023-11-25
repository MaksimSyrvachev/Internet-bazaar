import { db } from '@/server/db';

export const GET = async () => {
	const users = await db.user.findMany({
		include: {
			ads: true
		}
	});
	return Response.json(users);
};

// export const POST = async (request: Request) => {
// 	const { searchParams } = new URL(request.url);

// 	// Add new TODO with auto-incremented id and title/description read from search params
// 	const newTodo = await db.todo.create({
// 		data: {
// 			title: searchParams.get('title') ?? 'New TODO',
// 			description: searchParams.get('description') ?? 'No description',
// 			completed: false
// 		}
// 	});

// 	return Response.json(newTodo);
// };
