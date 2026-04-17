'use client';

import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'deleted';
    created_at?: string;
    updated_at?: string;
}

interface UserManagementProps {
    refreshKey?: number;
}

export default function UserManagement({
                                           refreshKey = 0
                                       }: UserManagementProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    async function fetchUsers(searchValue = '') {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `/api/users?search=${encodeURIComponent(searchValue)}`
            );

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
        fetchUsers(search);
    }, [refreshKey]);

    function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetchUsers(search);
    }

    function handleClearSearch() {
        setSearch('');
        fetchUsers('');
    }

    function startEditing(user: User) {
        setEditingUserId(user.id);
        setEditName(user.name);
        setEditEmail(user.email);
        setError('');
    }

    function cancelEditing() {
        setEditingUserId(null);
        setEditName('');
        setEditEmail('');
        setError('');
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

            if (editingUserId === userId) {
                cancelEditing();
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
        <section className='rounded border p-5 shadow-sm'>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Manage Users</h2>
                <p className='mt-1 text-sm text-gray-600'>
                    Search, edit and deactivate existing users.
                </p>
            </div>

            <form onSubmit={handleSearchSubmit} className='mb-6 flex gap-3'>
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
                <button
                    type='button'
                    onClick={handleClearSearch}
                    className='rounded border px-4 py-2'
                >
                    Clear
                </button>
            </form>

            {error ? (
                <p className='mb-4 text-sm text-red-600'>{error}</p>
            ) : null}

            {loading ? <p className='text-sm text-gray-600'>Loading users...</p> : null}

            {!loading && users.length === 0 ? (
                <p className='text-sm text-gray-500'>No active users found.</p>
            ) : null}

            <div className='space-y-3'>
                {users.map((user) => (
                    <div key={user.id} className='rounded border p-4'>
                        {editingUserId === user.id ? (
                            <div className='space-y-3'>
                                <div>
                                    <label
                                        htmlFor={`edit-name-${user.id}`}
                                        className='mb-1 block text-sm font-medium'
                                    >
                                        Name
                                    </label>
                                    <input
                                        id={`edit-name-${user.id}`}
                                        type='text'
                                        value={editName}
                                        onChange={(event) => setEditName(event.target.value)}
                                        className='w-full rounded border px-3 py-2'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor={`edit-email-${user.id}`}
                                        className='mb-1 block text-sm font-medium'
                                    >
                                        Email
                                    </label>
                                    <input
                                        id={`edit-email-${user.id}`}
                                        type='email'
                                        value={editEmail}
                                        onChange={(event) => setEditEmail(event.target.value)}
                                        className='w-full rounded border px-3 py-2'
                                    />
                                </div>

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
                            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
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
            </div>
        </section>
    );
}