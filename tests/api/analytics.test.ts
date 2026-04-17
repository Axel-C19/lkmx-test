import { GET } from '@/app/api/analytics/route';
import { getAnalytics } from '@/services/analytics.services';

jest.mock('@/services/analytics.services', () => ({
    getAnalytics: jest.fn()
}));

describe('GET /api/analytics', () => {
    it('should return analytics data', async () => {
        (getAnalytics as jest.Mock).mockResolvedValue({
            totalUsers: 10,
            activeUsers: 8,
            deletedUsers: 2,
            usersCreatedToday: 3,
            latestUsers: [
                {
                    id: 1,
                    name: 'Moises',
                    email: 'moises@example.com',
                    status: 'active',
                    created_at: '2026-04-16T10:00:00.000Z',
                    updated_at: '2026-04-16T10:00:00.000Z'
                }
            ]
        });

        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body.totalUsers).toBe(10);
        expect(body.activeUsers).toBe(8);
        expect(body.deletedUsers).toBe(2);
        expect(body.usersCreatedToday).toBe(3);
        expect(body.latestUsers).toHaveLength(1);
    });

    it('should return 500 when service fails', async () => {
        (getAnalytics as jest.Mock).mockRejectedValue(new Error('Service error'));

        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body.error).toBe('Failed to fetch analytics');
    });
});