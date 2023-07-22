'use client';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Sidebar } from '../sidebar/Sidebar';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ToggleButton } from '../sidebar/ToggleButton';

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();
    const [toggle, setToggle] = useState(false);

    const satisfiedPathsForHeaderAndFooter = ['/'];
    const unsatisfiedPathsForSidebar = ['/', '/pages/register', '/pages/login'];

    return (
        <>
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {satisfiedPathsForHeaderAndFooter.includes(pathname) && (
                    <Header />
                )}

                {!unsatisfiedPathsForSidebar.includes(pathname) && (
                    <div>
                        <Sidebar toggle={toggle} setToggle={setToggle} />

                        <ToggleButton toggle={toggle} setToggle={setToggle} />
                    </div>
                )}

                {children}

                {satisfiedPathsForHeaderAndFooter.includes(pathname) && (
                    <Footer />
                )}
            </main>
        </>
    );
};
