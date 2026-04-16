import { addUser, listUsers } from '@/services/user.services';
import { createUserSchema } from '@/validations/user.schema';

export async function GET() {
    try {
        const users = await listUsers();
        return Response.json(users);
    } catch (error) {
        console.error('GET /api/users error:', error);

        return Response.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = createUserSchema.parse(body);

        const user = await addUser(validatedData);

        return Response.json(user, { status: 201 });
    } catch (error) {
        console.error('POST /api/users error:', error);

        return Response.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}