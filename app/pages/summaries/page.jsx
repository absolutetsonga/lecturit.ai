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

    const populateSummaries = summaries.map((element, index) => {
        console.log(element);

        return (
            <li
                key={`summary-${index}`}
                className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-900 sm:px-6"
            >
                <p className="flex-none rounded-full text-2xl">
                    {element?.emoji ? element?.emoji?.replace(/"/g, '') : '🫥'}
                </p>
                <div className="min-w-0 flex-auto">
                    <p className="text-md leading-3 font-semibold xs:text-lg xs:leading-6">
                        {element.title.replace(/"/g, '')}
                    </p>
                    <p className="xs:text-md xs leading-2 mt-1 line-clamp-5 text-sm xs:leading-5">
                        {element.summary}
                    </p>
                </div>
            </li>
        );
    });

    return (
        <>
            <div className="flex min-h-screen items-center justify-center py-20">
                {summaries.length ? (
                    <ul
                        role="list"
                        className="w-[80%] divide-y divide-gray-100 overflow-hidden rounded-3xl bg-gray-100 shadow-sm ring-1 ring-gray-900/5 dark:divide-gray-700 dark:bg-gray-800 sm:rounded-xl"
                    >
                        {populateSummaries}
                    </ul>
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
