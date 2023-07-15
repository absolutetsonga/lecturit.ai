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
            className={`sm:top-18 absolute right-6 top-16 my-4 list-none divide-y divide-gray-100 rounded-lg bg-gray-100 text-base shadow transition-all dark:divide-gray-600 dark:bg-gray-700 sm:-right-20 ${
                toggleDropdown ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
            id="user-dropdown"
        >
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                    {session.user.name}
                </span>
                <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
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
                            'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                        }
                    />
                </li>
                <li>
                    <NavbarButton
                        href={'/add-summary'}
                        onClick={() => setToggleDropdown(false)}
                        content={'New Summary'}
                        className={
                            'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                        }
                    />
                </li>
                <li>
                    <NavbarButton
                        href={'/summaries'}
                        onClick={() => setToggleDropdown(false)}
                        content={'Check Summaries'}
                        className={
                            'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                        }
                    />
                </li>
                <li>
                    <button
                        onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
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
