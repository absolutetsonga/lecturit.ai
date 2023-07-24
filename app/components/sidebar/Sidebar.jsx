import { Fragment } from 'react';
import Image from 'next/image';
import ThemeSwitcher from '../header/ThemeSwitcher';

import { Dialog, Transition } from '@headlessui/react';

import { MenuList } from './MenuList';

import { TeamsList } from './TeamsList';

import { signIn, signOut, useSession } from 'next-auth/react';

export const Sidebar = ({ toggle, setToggle }) => {
    const { data: session } = useSession();

    return (
        <div>
            <Transition.Root show={toggle} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setToggle}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 pb-4 dark:bg-gray-950">
                                    <div className="flex h-16 shrink-0 items-center text-2xl">
                                        lecturit.ai
                                        <div className="absolute right-4">
                                            <ThemeSwitcher />
                                        </div>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="flex flex-1 flex-col gap-y-7"
                                        >
                                            <li>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 space-y-1"
                                                >
                                                    <MenuList />
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="text-xs font-semibold leading-6">
                                                    Your teams
                                                </div>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 mt-2 space-y-1"
                                                >
                                                    <TeamsList />
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                {session ? (
                                                    <div
                                                        href="#"
                                                        className="group -mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-900"
                                                    >
                                                        <Image
                                                            width={40}
                                                            height={40}
                                                            className={
                                                                'max-h-[40px] rounded-full'
                                                            }
                                                            src={
                                                                session?.user
                                                                    .image
                                                            }
                                                            alt={'user_image'}
                                                        />
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-sm">
                                                                Signed in as:
                                                            </p>
                                                            <p className="truncate text-sm font-medium">
                                                                {
                                                                    session
                                                                        ?.user
                                                                        .email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        href="#"
                                                        className="group -mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-900"
                                                        onClick={signIn}
                                                    >
                                                        <h2 className="text-2xl">
                                                            Sign In
                                                        </h2>
                                                    </div>
                                                )}
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};
