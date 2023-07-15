'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import DropdownMenu from './DropdownMenu';
import ThemeSwitcher from './ThemeSwitcher';

const NavBar = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const getAndSetProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        };

        getAndSetProviders();
    }, []);

    return (
        <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-900">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <Link href="/" className="flex items-center">
                    <span className="gradient_purple self-center whitespace-nowrap text-4xl font-semibold">
                        lecturitAI
                    </span>
                </Link>

                <div className="flex items-center justify-between gap-10">
                    {session?.user ? (
                        <div className="flex items-center gap-6">
                            <div className="flex flex-row items-center">
                                <Link href="/pages/new-summary">
                                    <button className="navbar_button hidden sm:block">
                                        <div className="h-[50px] w-[50px] bg-add-dark bg-no-repeat object-cover transition-all dark:bg-add-white"></div>
                                    </button>
                                </Link>
                            </div>

                            <div className="relative flex flex-col">
                                <Image
                                    width={50}
                                    height={50}
                                    className={'rounded-full'}
                                    src={session?.user.image}
                                    alt={'user_image'}
                                    onClick={() =>
                                        setToggleDropdown(!toggleDropdown)
                                    }
                                />

                                <DropdownMenu
                                    toggleDropdown={toggleDropdown}
                                    setToggleDropdown={setToggleDropdown}
                                    signOut={signOut}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => signIn(provider.id)}
                                            key={provider.name}
                                            className="mr-3 rounded-lg bg-blue-700 px-8 py-4 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
                                        >
                                            Sign In
                                        </button>
                                    </>
                                ))}
                        </div>
                    )}

                    <div className="hidden sm:block">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
