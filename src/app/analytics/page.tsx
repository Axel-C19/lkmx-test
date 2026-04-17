import AnalyticsPanel from '@/components/analytics/analytics-panel';

export default function AnalyticsPage() {
    return (
        <div className='mx-auto max-w-5xl'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold'>Analytics</h1>
                <p className='mt-2 text-sm text-black'>
                    Overview of user metrics and recent activity.
                </p>
            </header>

            <AnalyticsPanel />
        </div>
    );
}