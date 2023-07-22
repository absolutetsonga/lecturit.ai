import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

export const ToggleButton = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`absolute ${ sidebarOpen ? 'left-[300px]' : 'left-[60px]' } transition-all top-0 flex w-16 justify-center pt-5`}>
                {sidebarOpen ? (
                    <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                            className="h-10 w-10 text-white"
                            aria-hidden="true"
                        />
                    </button>
                ) : (
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-10 w-10" aria-hidden="true" />
                    </button>
                )}
            </div>
        </Transition.Child>
    );
};
