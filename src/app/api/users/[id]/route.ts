import { ZodError } from 'zod';
import { editUser, removeUser } from '@/services/user.services';
import { createUserSchema } from '@/validations/user.schema';

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        if (Number.isNaN(userId)) {
            return Response.json({ error: 'Invalid user id' }, { status: 400 });
        }

        const body = await request.json();
        const validatedData = createUserSchema.parse(body);

        const updatedUser = await editUser(userId, validatedData);

        if (!updatedUser) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        return Response.json(updatedUser);
    } catch (error) {
        console.error('PUT /api/users/[id] error:', error);

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
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

export async function DELETE(_: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        if (Number.isNaN(userId)) {
            return Response.json({ error: 'Invalid user id' }, { status: 400 });
        }

        const deletedUser = await removeUser(userId);

        if (!deletedUser) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        return Response.json({
            message: 'User marked as deleted'
        });
    } catch (error) {
        console.error('DELETE /api/users/[id] error:', error);

        return Response.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}