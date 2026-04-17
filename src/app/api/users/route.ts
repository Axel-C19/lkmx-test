import { ZodError } from 'zod';
import { addUser, listUsers } from '@/services/user.services';
import { createUserSchema } from '@/validations/user.schema';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') ?? '';

        const users = await listUsers(search);
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

        if (error instanceof ZodError) {
            return Response.json(
                { error: 'Invalid request data', details: error.flatten() },
                { status: 400 }
            );
        }

        if (error instanceof Error && error.message.includes('duplicate key')) {
            return Response.json(
                { error: 'Email already exists' },
                { status: 409 }
            );
        }

        return Response.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}