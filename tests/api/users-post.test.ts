import { DELETE } from '@/app/api/users/[id]/route';
import { removeUser } from '@/services/user.services';

jest.mock('@/services/user.services', () => ({
    editUser: jest.fn(),
    removeUser: jest.fn()
}));

describe('DELETE /api/users/[id]', () => {
    it('should mark user as deleted', async () => {
        (removeUser as jest.Mock).mockResolvedValue({
            id: 1,
            name: 'Moises',
            email: 'moises@example.com',
            status: 'deleted'
        });

        const request = new Request('http://localhost:3000/api/users/1', {
            method: 'DELETE'
        });

        const response = await DELETE(request, {
            params: Promise.resolve({ id: '1' })
        });

        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.message).toBe('User marked as deleted');
    });

    it('should return 400 when user id is invalid', async () => {
        const request = new Request('http://localhost:3000/api/users/abc', {
            method: 'DELETE'
        });

        const response = await DELETE(request, {
            params: Promise.resolve({ id: 'abc' })
        });

        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toBe('Invalid user id');
    });
});