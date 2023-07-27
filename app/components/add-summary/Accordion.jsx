import { SummaryText } from '@/app/components/add-summary/SummaryText';
import { TranscribeText } from '@/app/components/add-summary/TranscribeText';

import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export const Accordion = ({ transcribeText, summaryText, title, emoji }) => {
    const [toggleFirst, setToggleFirst] = useState(false);
    const [toggleSecond, setToggleSecond] = useState(false);

    return (
        <div className="flex w-[90%] flex-col">
            <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                        onClick={() => setToggleFirst((prev) => !prev)}
                    >
                        <span>Transcribe Text</span>

                        {toggleFirst ? (
                            <ChevronUpIcon className="h-10 w-10" />
                        ) : (
                            <ChevronDownIcon className="h-10 w-10" />
                        )}
                    </button>
                </h2>
                <div
                    className={`border border-b-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900 ${
                        toggleFirst ? 'block' : 'hidden'
                    }`}
                >
                    <TranscribeText transcribeText={transcribeText} />
                </div>

                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        className="flex w-full items-center justify-between border border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                        onClick={() => setToggleSecond((prev) => !prev)}
                    >
                        <span>Summary Text</span>
                        {toggleSecond ? (
                            <ChevronUpIcon className="h-10 w-10" />
                        ) : (
                            <ChevronDownIcon className="h-10 w-10" />
                        )}
                    </button>
                </h2>
                <div
                    className={`flex flex-col gap-10 border border-t-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900 ${
                        toggleSecond ? 'block' : 'hidden'
                    }`}
                >
                    <h1 className="text-2xl font-bold">
                        <span>{emoji}</span> {title}
                    </h1>
                    <SummaryText summaryText={summaryText} />
                </div>
            </div>
        </div>
    );
};
