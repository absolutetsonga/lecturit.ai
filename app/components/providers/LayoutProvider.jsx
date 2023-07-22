'use client';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Sidebar } from '../sidebar/Sidebar';

import { usePathname } from 'next/navigation';

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();

    const satisfiedPathsForHeaderAndFooter = ['/'];
    const unsatisfiedPathsForSidebar = ['/', '/pages/register', '/pages/login'];

    return (
        <>
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {satisfiedPathsForHeaderAndFooter.includes(pathname) && (
                    <Header />
                )}
                {!unsatisfiedPathsForSidebar.includes(pathname) && <Sidebar />}
                {children}

                {satisfiedPathsForHeaderAndFooter.includes(pathname) && (
                    <Footer />
                )}
            </main>
        </>
    );
};
