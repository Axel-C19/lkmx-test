'use client';

import { useState } from 'react';
import UserForm from '@/components/users/user-form';
import UserManagement from '@/components/users/user-management';

export default function UsersPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    function triggerRefresh() {
        setRefreshKey((prev) => prev + 1);
    }

    return (
        <main className='mx-auto max-w-4xl p-6'>
            <h1 className='mb-6 text-2xl font-bold'>User Management</h1>

            <UserForm onUserCreated={triggerRefresh} />

            <UserManagement refreshKey={refreshKey} />
        </main>
    );
}