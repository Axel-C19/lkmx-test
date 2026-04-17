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
        <div className='mx-auto max-w-4xl'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold'>User Management</h1>
                <p className='mt-2 text-sm text-black'>
                    Create, search, edit and deactivate users.
                </p>
            </header>

            <UserForm onUserCreated={triggerRefresh} />
            <UserManagement refreshKey={refreshKey} />
        </div>
    );
}