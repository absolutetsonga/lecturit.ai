'use client';

import React from 'react';

import axios from 'axios';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const profile = () => {
    const regexPattern = /^[0-9A-Za-z]{8}(-[0-9A-Za-z]{4}){3}-[0-9A-Za-z]{12}$/;

    const { data: session } = useSession();

    const [integrationSecret, setIntegrationSecret] = useState('');
    const [pageId, setPageId] = useState('');

    const [validationErrorSecret, setValidationErrorSecret] = useState('');
    const [validationErrorPageId, setValidationErrorPageId] = useState('');

    const handleNotionIntegrationSecret = (e) => {
        setIntegrationSecret(e.target.value);
    };

    const handleNotionPageId = (e) => setPageId(e.target.value);

    const handleSubmitButton = async (e) => {
        e.preventDefault();

        if (integrationSecret.length !== 50) {
            setValidationErrorSecret('The key must be exactly 50 characters!');

            return;
        } else {
            setValidationErrorSecret('');
        }

        if (!regexPattern.test(pageId)) {
            setValidationErrorPageId(
                'Your key is not valid to the official format!',
            );

            return;
        } else {
            setValidationErrorPageId('');
        }

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
                <div className="flex flex-col gap-6 sm:col-span-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6"
                        >
                            Notion API Integration Secret
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="flex h-[40px] w-[400px] flex-1 border-2 border-white bg-transparent px-2 sm:text-sm sm:leading-6"
                                placeholder="Your Integration Secret"
                                onChange={handleNotionIntegrationSecret}
                                value={integrationSecret}
                            />
                        </div>
                        {validationErrorSecret && (
                            <h6 className="text-red-400">
                                {validationErrorSecret}
                            </h6>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6"
                        >
                            Notion Page
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="flex h-[40px] w-[400px] flex-1 border-2 border-white bg-transparent px-2 sm:text-sm sm:leading-6"
                                placeholder="Your Page ID"
                                onChange={handleNotionPageId}
                                value={pageId}
                            />
                        </div>
                        {validationErrorPageId && (
                            <h6 className="text-red-400">
                                {validationErrorPageId}
                            </h6>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="text-md mb-2 mr-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center font-bold text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
                        onClick={handleSubmitButton}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default profile;
