'use client';

import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'deleted';
}

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [error, setError] = useState('');

    async function fetchUsers(value = '') {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/users?search=${encodeURIComponent(value)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch users');
            }

            setUsers(data);
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
        fetchUsers();
    }, []);

    async function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetchUsers(search);
    }

    function startEditing(user: User) {
        setEditingUserId(user.id);
        setEditName(user.name);
        setEditEmail(user.email);
    }

    function cancelEditing() {
        setEditingUserId(null);
        setEditName('');
        setEditEmail('');
    }

    async function handleUpdate(userId: number) {
        setError('');

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editName,
                    email: editEmail
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update user');
            }

            cancelEditing();
            fetchUsers(search);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unexpected error');
            }
        }
    }

    async function handleDelete(userId: number) {
        setError('');

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete user');
            }

            fetchUsers(search);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unexpected error');
            }
        }
    }

    return (
        <section className='space-y-6'>
            <form onSubmit={handleSearchSubmit} className='flex gap-3'>
                <input
                    type='text'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='Search by name or email'
                    className='flex-1 rounded border px-3 py-2'
                />
                <button
                    type='submit'
                    className='rounded bg-black px-4 py-2 text-white'
                >
                    Search
                </button>
            </form>

            {error ? <p className='text-sm text-red-600'>{error}</p> : null}
            {loading ? <p>Loading users...</p> : null}

            <div className='space-y-3'>
                {users.map((user) => (
                    <div key={user.id} className='rounded border p-4'>
                        {editingUserId === user.id ? (
                            <div className='space-y-3'>
                                <input
                                    type='text'
                                    value={editName}
                                    onChange={(event) => setEditName(event.target.value)}
                                    className='w-full rounded border px-3 py-2'
                                />
                                <input
                                    type='email'
                                    value={editEmail}
                                    onChange={(event) => setEditEmail(event.target.value)}
                                    className='w-full rounded border px-3 py-2'
                                />
                                <div className='flex gap-2'>
                                    <button
                                        type='button'
                                        onClick={() => handleUpdate(user.id)}
                                        className='rounded bg-blue-600 px-4 py-2 text-white'
                                    >
                                        Save
                                    </button>
                                    <button
                                        type='button'
                                        onClick={cancelEditing}
                                        className='rounded border px-4 py-2'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    <p className='font-semibold'>{user.name}</p>
                                    <p className='text-sm text-gray-600'>{user.email}</p>
                                </div>

                                <div className='flex gap-2'>
                                    <button
                                        type='button'
                                        onClick={() => startEditing(user)}
                                        className='rounded bg-yellow-500 px-4 py-2 text-white'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(user.id)}
                                        className='rounded bg-red-600 px-4 py-2 text-white'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {!loading && users.length === 0 ? (
                    <p className='text-sm text-gray-500'>No active users found.</p>
                ) : null}
            </div>
        </section>
    );
}