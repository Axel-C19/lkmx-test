import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/ui/sidebar';

export const metadata: Metadata = {
    title: 'LKMX Test',
    description: 'User management and analytics dashboard'
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
        <body>
        <div className='flex min-h-screen flex-col md:flex-row'>
            <Sidebar />
            <main className='flex-1 bg-white p-6'>{children}</main>
        </div>
        </body>
        </html>
    );
}