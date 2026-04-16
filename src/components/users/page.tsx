import UserForm from '@/components/users/user-form';

async function getUsers() {
    const response = await fetch('http://localhost:3000/api/users', {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <main className='mx-auto max-w-2xl p-6'>
            <h1 className='mb-6 text-2xl font-bold'>Users</h1>

            <UserForm />

            <div className='space-y-3'>
                {users.length === 0 ? (
                    <p className='text-sm text-gray-500'>No users found.</p>
                ) : (
                    users.map((user: { id: number; name: string; email: string }) => (
                        <div key={user.id} className='rounded border p-4'>
                            <p className='font-semibold'>{user.name}</p>
                            <p className='text-sm text-gray-600'>{user.email}</p>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}