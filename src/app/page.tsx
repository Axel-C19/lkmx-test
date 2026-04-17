import UserForm from '@/components/users/user-form';
import UserManagement from '@/components/users/user-management';

async function getUsers() {
    const response = await fetch('http://localhost:3000/api/users', {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export default function UsersPage() {
    return (
        <main className='mx-auto max-w-4xl p-6'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold'>User Management</h1>
                <p className='mt-2 text-sm text-gray-600'>
                    Create, search, edit and deactivate users.
                </p>
            </header>

            <section className='mb-8'>
                <UserForm />
            </section>

            <section>
                <UserManagement />
            </section>
        </main>
    );
}