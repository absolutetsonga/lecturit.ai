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
                    <button className="navbar_button hidden sm:block">
                        <div className="h-[40px] w-[40px] bg-add-dark bg-no-repeat object-cover transition-all dark:bg-add-white"></div>
                    </button>
                </Link>
            </div>

            <div className="relative flex flex-col">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <Image
                                width={40}
                                height={40}
                                className={'rounded-full'}
                                src={session?.user.image}
                                alt={'user_image'}
                                onClick={() => setToggle(!toggle)}
                            />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-4 py-3">
                                <p className="text-sm">Signed in as</p>
                                <p className="truncate text-sm font-medium text-gray-900">
                                    {session.user.email}
                                </p>
                            </div>
                            <div className="py-1">
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
                                            Account settings
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
                                            Support
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
                                            License
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
                                                        ? 'bg-gray-100 text-gray-900'
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
