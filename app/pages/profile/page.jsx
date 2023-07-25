'use client';

import React from 'react';

import axios from 'axios';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const profile = () => {
    const { data: session } = useSession();

    const [integrationSecret, setIntegrationSecret] = useState('');
    const [pageId, setPageId] = useState('');

    const handleNotionIntegrationSecret = (e) =>
        setIntegrationSecret(e.target.value);

    const handleNotionPageId = (e) => setPageId(e.target.value);

    const handleSubmitButton = async (e) => {
        e.preventDefault();

        console.log({
            integrationSecret: JSON.stringify(integrationSecret),
            pageId: JSON.stringify(pageId),
            userId: session?.user.id,
        });

        // logic for connection with backend.

        const res = await axios.post('/api/user/update', {
            integrationSecret: integrationSecret,
            pageId: pageId,
            userEmail: session?.user.email,
        });

        console.log(res);

        // receiving result and displaying it.d
    };

    if (!session || !session.user || !session.user.id) return <> Loading... </>;
    return (
        <div className="flex min-h-[100vh] flex-col items-center justify-center gap-20">
            <h3 className="text-3xl font-bold">Add Your Summaries in Notion</h3>

            <form className="flex flex-col items-center justify-center">
                <div class="flex flex-col gap-6 sm:col-span-4">
                    <div className="flex flex-col gap-2">
                        <label
                            for="username"
                            class="block text-sm font-medium leading-6"
                        >
                            Notion API Integration Key
                        </label>
                        <div class="mt-2">
                            <div class="flex h-[40px] w-[400px] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Your Integration Secret"
                                    onChange={handleNotionIntegrationSecret}
                                    value={integrationSecret}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            for="username"
                            class="block text-sm font-medium leading-6"
                        >
                            Notion Page
                        </label>
                        <div class="mt-2">
                            <div class="flex h-[40px] w-[400px] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Your Page ID"
                                    onChange={handleNotionPageId}
                                    value={pageId}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="mb-2 mr-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                        onClick={handleSubmitButton}
                    >
                        Purple
                    </button>
                </div>
            </form>
        </div>
    );
};

export default profile;
