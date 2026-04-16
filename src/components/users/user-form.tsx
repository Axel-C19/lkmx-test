'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
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
            router.refresh();
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
        <form onSubmit={handleSubmit} className='mb-6 space-y-4 rounded border p-4'>
            <h2 className='text-lg font-semibold'>Create user</h2>

            <div className='space-y-2'>
                <label htmlFor='name' className='block text-sm font-medium'>
                    Name
                </label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className='w-full rounded border px-3 py-2'
                    placeholder='Enter name'
                    required
                />
            </div>

            <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm font-medium'>
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className='w-full rounded border px-3 py-2'
                    placeholder='Enter email'
                    required
                />
            </div>

            {error ? (
                <p className='text-sm text-red-600'>{error}</p>
            ) : null}

            <button
                type='submit'
                disabled={loading}
                className='rounded bg-black px-4 py-2 text-white disabled:opacity-50'
            >
                {loading ? 'Creating...' : 'Create user'}
            </button>
        </form>
    );
}