import UserForm from '@/components/users/user-form';
import UserManagement from '@/components/users/user-management';

export default function UsersPage() {
    return (
        <main className='mx-auto max-w-3xl p-6'>
            <h1 className='mb-6 text-2xl font-bold'>Users</h1>
            <UserForm />
            <UserManagement />
        </main>
    );
}