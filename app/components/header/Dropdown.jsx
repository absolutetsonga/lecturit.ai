import Link from 'next/link';
import Image from 'next/image';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function Dropdown() {
    const { data: session } = useSession();

    const [toggle, setToggle] = useState();

    console.log(session);

    return (
        <div className="flex items-center gap-6">
            <div className="flex flex-row items-center">
                <Link href="/pages/new-summary">
                    <button className="navbar_button hidden md:block">
                        <div className="h-[40px] w-[40px] bg-add-dark bg-no-repeat object-cover transition-all dark:bg-add-white"></div>
                    </button>
                </Link>
            </div>

            <div className="relative flex flex-col">
                <Menu as="div" className="relative text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full flex-row items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-800 dark:hover:bg-gray-900">
                            <Image
                                width={40}
                                height={40}
                                className={'rounded-full'}
                                src={session?.user.image}
                                alt={'user_image'}
                                onClick={() => setToggle(!toggle)}
                            />

                            <div className="gap-2 hidden xs:flex md:hidden">
                                <p className="text-sm">Signed in as:</p>
                                <p className="truncate text-sm font-medium">
                                    {session.user.email}
                                </p>
                            </div>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="z-10 mt-2 w-full md:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:absolute md:right-0">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/pages/new-summary"
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm',
                                            )}
                                        >
                                            New Lecture
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm',
                                            )}
                                        >
                                            Visit Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-700',
                                                'block px-4 py-2 text-sm',
                                            )}
                                        >
                                            Get All Summaries
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <form method="POST" action="#">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                type="submit"
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-50 text-red-500'
                                                        : 'text-gray-700',
                                                    'block w-full px-4 py-2 text-left text-sm',
                                                )}
                                                onClick={signOut}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </form>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}
