'use client';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

import { usePathname } from 'next/navigation';

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();

    return (
        <>
            {pathname === '/pages/register' || pathname === '/pages/login' ? (
                ''
            ) : (
                <Header />
            )}

            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {children}
            </main>

            {pathname === '/pages/register' || pathname === '/pages/login' ? (
                ''
            ) : (
                <Footer />
            )}
        </>
    );
};
