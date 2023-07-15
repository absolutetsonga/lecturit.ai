import { NavbarButton } from './NavbarButton';

import { useSession } from 'next-auth/react';
import ThemeSwitcher from './ThemeSwitcher';

export const DropdownMenu = ({
    toggleDropdown,
    setToggleDropdown,
    signOut,
}) => {
    const { data: session } = useSession();

    return (
        <div
            className={`absolute top-16 sm:top-18 right-6 sm:-right-20 my-4 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all ${
                toggleDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            id="user-dropdown"
        >
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                    {session.user.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {session.user.email}
                </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <NavbarButton
                        href={'/profile'}
                        onClick={() => {
                            setToggleDropdown(false);
                        }}
                        content={'View Profile'}
                        className={
                            'block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        }
                    />
                </li>
                <li>
                    <NavbarButton
                        href={'/add-summary'}
                        onClick={() => setToggleDropdown(false)}
                        content={'New Summary'}
                        className={
                            'block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        }
                    />
                </li>
                <li>
                    <NavbarButton
                        href={'/summaries'}
                        onClick={() => setToggleDropdown(false)}
                        content={'Check Summaries'}
                        className={
                            'block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        }
                    />
                </li>
                <li>
                    <button
                        onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}
                        className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Sign Out
                    </button>
                </li>
                <li className="flex justify-center sm:hidden">
                    <ThemeSwitcher />
                </li>
            </ul>
        </div>
    );
};
