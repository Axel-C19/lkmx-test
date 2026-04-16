import { getAnalytics } from '@/services/analytics.service';

export async function GET() {
    try {
        const analytics = await getAnalytics();
        return Response.json(analytics);
    } catch (error) {
        console.error('GET /api/analytics error:', error);

        return Response.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}