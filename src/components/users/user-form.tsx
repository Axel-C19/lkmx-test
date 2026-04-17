'use client';

import { useState } from 'react';

interface UserFormProps {
    onUserCreated?: () => void;
}

export default function UserForm({ onUserCreated }: UserFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create user');
            }

            setName('');
            setEmail('');
            setSuccessMessage('User created successfully.');

            onUserCreated?.();
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

    return (
        <section className='mb-8 rounded border p-5 shadow-sm'>
            <h2 className='mb-4 text-lg font-semibold text-gray-600'>Create User</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='mb-1 block text-sm font-medium text-gray-600'>
                        Name
                    </label>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Enter user name'
                        className='w-full rounded border px-3 py-2'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-600'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='Enter user email'
                        className='w-full rounded border px-3 py-2'
                        required
                    />
                </div>

                {error ? (
                    <p className='text-sm text-red-600'>{error}</p>
                ) : null}

                {successMessage ? (
                    <p className='text-sm text-green-600'>{successMessage}</p>
                ) : null}

                <button
                    type='submit'
                    disabled={loading}
                    className='rounded bg-black px-4 py-2 text-white disabled:opacity-50'
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </section>
    );
}