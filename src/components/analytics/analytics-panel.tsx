'use client';

import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'deleted';
    created_at: string;
    updated_at?: string;
}

interface AnalyticsData {
    totalUsers: number;
    activeUsers: number;
    deletedUsers: number;
    usersCreatedToday: number;
    latestUsers: User[];
}

export default function AnalyticsPanel() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function fetchAnalytics() {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/analytics');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch analytics');
            }

            setAnalytics(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unexpected error');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return <p className='text-sm text-gray-600'>Loading analytics...</p>;
    }

    if (error) {
        return <p className='text-sm text-red-600'>{error}</p>;
    }

    if (!analytics) {
        return <p className='text-sm text-gray-500'>No analytics available.</p>;
    }

    return (
        <section className='space-y-8'>
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
                <div className='rounded border p-5 shadow-sm'>
                    <p className='text-sm text-gray-500'>Total Users</p>
                    <p className='mt-2 text-3xl font-bold'>{analytics.totalUsers}</p>
                </div>

                <div className='rounded border p-5 shadow-sm'>
                    <p className='text-sm text-gray-500'>Active Users</p>
                    <p className='mt-2 text-3xl font-bold'>{analytics.activeUsers}</p>
                </div>

                <div className='rounded border p-5 shadow-sm'>
                    <p className='text-sm text-gray-500'>Deleted Users</p>
                    <p className='mt-2 text-3xl font-bold'>{analytics.deletedUsers}</p>
                </div>

                <div className='rounded border p-5 shadow-sm'>
                    <p className='text-sm text-gray-500'>Created Today</p>
                    <p className='mt-2 text-3xl font-bold'>
                        {analytics.usersCreatedToday}
                    </p>
                </div>
            </div>

            <div className='rounded border p-5 shadow-sm'>
                <h2 className='mb-4 text-lg font-semibold'>Latest Users</h2>

                {analytics.latestUsers.length === 0 ? (
                    <p className='text-sm text-gray-500'>No recent users found.</p>
                ) : (
                    <div className='space-y-3'>
                        {analytics.latestUsers.map((user) => (
                            <div
                                key={user.id}
                                className='flex flex-col gap-1 rounded border p-4 md:flex-row md:items-center md:justify-between'
                            >
                                <div>
                                    <p className='font-semibold'>{user.name}</p>
                                    <p className='text-sm text-gray-600'>{user.email}</p>
                                </div>

                                <div className='text-sm text-gray-500'>
                                    Status: {user.status}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}