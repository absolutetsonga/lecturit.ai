'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import { SkeletonLoader } from '@/app/components/skeleton/SkeletonSummariesLoader';

import axios from 'axios';

const summaries = () => {
    useCheckAuth();

    const [summaries, setSummaries] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchPosts = async () => {
            if (session && session.user && session.user.id) {
                const userId = session?.user.id;
                const url = `/api/summary`;

                await axios
                    .get(url, {
                        params: {
                            userId: userId,
                        },
                    })
                    .then((res) => setSummaries(res.data));
            }
        };

        fetchPosts();
    }, [session]);

    const sendToNotion = async (summary) => {
        const url = '/api/notion/new';

        const response = await axios.post(url, {
            userId: session?.user.id,
            summary: JSON.stringify(summary),
        });

        return response;
    };

    const populateSummaries = summaries.map((element, index) => {
        return (
            <div key={`summary-${index}`}>
                <div className="max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Noteworthy technology acquisitions 2021
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {element.summary}
                    </p>
                    <div
                        onClick={() => sendToNotion(element.summary)}
                        className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Send to Notion
                        <svg
                            className="ml-2 h-3.5 w-3.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                {summaries.length ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {populateSummaries}
                    </div>
                ) : (
                    <div
                        role="status"
                        className="w-[80%] animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-2 shadow dark:divide-gray-700 dark:border-gray-700 md:p-4"
                    >
                        <SkeletonLoader />
                    </div>
                )}
            </div>
        </>
    );
};

export default summaries;
