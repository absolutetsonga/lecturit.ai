import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

export const ToggleButton = ({ toggle, setToggle }) => {
    return (
        <Transition.Root show={true} as={Fragment}>
            <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className={`absolute ${
                        toggle ? 'left-[320px]' : 'left-[30px]'
                    } top-0 flex w-16 justify-center pt-5 transition-all`}
                >
                    {toggle ? (
                        <button
                            type="button"
                            className="-m-2.5 p-2.5"
                            onClick={() => setToggle(false)}
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
                            className="-m-2.5 p-2.5 text-white"
                            onClick={() => setToggle(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon
                                className="h-10 w-10"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                </div>
            </Transition.Child>
        </Transition.Root>
    );
};
