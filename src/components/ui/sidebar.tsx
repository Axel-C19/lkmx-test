'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    {
        href: '/users',
        label: 'Home'
    },
    {
        href: '/analytics',
        label: 'Analytics'
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className='w-full border-b bg-gray-50 p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r'>
            <div className='mb-6'>
                <h2 className='text-xl font-bold text-gray-600'>LKMX Test</h2>
                <p className='text-sm text-gray-600'>User administration panel</p>
            </div>

            <nav className='flex flex-row gap-2 md:flex-col'>
                {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded px-4 py-2 text-sm font-medium transition ${
                                isActive
                                    ? 'bg-black text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}