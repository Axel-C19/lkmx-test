import { POST } from '@/app/api/users/route';
import { addUser } from '@/services/user.services';

jest.mock('@/services/user.services', () => ({
    listUsers: jest.fn(),
    addUser: jest.fn()
}));

describe('POST /api/users', () => {
    it('should create a user successfully', async () => {
        (addUser as jest.Mock).mockResolvedValue({
            id: 1,
            name: 'Moises',
            email: 'moises@example.com',
            status: 'active',
            created_at: '2026-04-16T10:00:00.000Z',
            updated_at: '2026-04-16T10:00:00.000Z'
        });

        const request = new Request('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Moises',
                email: 'moises@example.com'
            })
        });

        const response = await POST(request);
        const body = await response.json();

        expect(response.status).toBe(201);
        expect(body.name).toBe('Moises');
        expect(body.email).toBe('moises@example.com');
    });

    it('should return 400 when request data is invalid', async () => {
        const request = new Request('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: '',
                email: 'not-an-email'
            })
        });

        const response = await POST(request);
        const body = await response.json();

        expect(response.status).toBe(400);
        expect(body.error).toBe('Invalid request data');
    });
});