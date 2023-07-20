'use client';

import Image from 'next/image';

import backgroundImageLight from '@/app/images/background-auth.jpg';
import backgroundImageDark from '@/app/images/background-auth-dark.svg';

import { useTheme } from 'next-themes';

export function AuthLayout({ children }) {
    const { theme } = useTheme();

    return (
        <>
            <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0">
                <div className="relative z-10 flex flex-1 flex-col bg-slate-50 px-4 py-10 shadow-2xl dark:bg-slate-950 sm:justify-center md:flex-none md:px-28">
                    <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                        {children}
                    </div>
                </div>
                <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
                    {theme === 'dark' ? (
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={backgroundImageDark}
                            alt=""
                            unoptimized
                        />
                    ) : (
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={backgroundImageLight}
                            alt=""
                            unoptimized
                        />
                    )}
                </div>
            </div>
        </>
    );
}
