'use client';

import axios from 'axios';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { SummaryText } from '@/app/components/SummaryText';
import { TranscribeText } from '@/app/components/TranscribeText';
import { DNDInput } from '@/app/components/DNDInput';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const withFile = () => {
    const { data: session, status } = useSession();

    const [transcribeText, setTranscribeText] = useState();
    const [summaryText, setSummaryText] = useState();

    const [file, setFile] = useState();

    const [toggleFirst, setToggleFirst] = useState();
    const [toggleSecond, setToggleSecond] = useState();

    const handleFileChange = async (file) => {
        try {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('model', 'whisper-1');

            const transcriptedText = await getTranscript(formData);

            setTranscribeText(transcriptedText);

            const summaryTexts = await addSummary(transcriptedText);

            setSummaryText(summaryTexts.join(''));

            const response = await sendToNotion(summaryTexts);

            return response;
        } catch (error) {
            console.error(
                `Error while trying to handle available data. Error message: ${error.message}`,
            );
        }
    };

    const getTranscript = async (formData) => {
        try {
            const { data: transcriptedText } = await axios.post(
                '/api/whisper',
                formData,
            );
            const { text } = transcriptedText;

            return text;
        } catch (error) {
            console.error(
                `Error while trying to send the request to Whisper. Error message: ${error.message}`,
            );
        }
    };

    const addSummary = async (transcript) => {
        try {
            if (session && session.user && session.user.id) {
                const summary = await axios.post('/api/summary/new', {
                    userId: session.user.id,
                    summary: JSON.stringify(transcript),
                });

                return summary.data;
            } else {
                console.error(
                    'User ID is not available in the session object.',
                );
            }
        } catch (error) {
            console.error(
                `Error while trying to add the summary. Error message: ${error.message}`,
            );
        }
    };

    const sendToNotion = async (formattedResults) => {
        try {
            const response = await axios.post('/api/notion/new', {
                formattedResults: JSON.stringify(formattedResults),
            });

            return response;
        } catch (error) {
            console.error(
                `Error while trying to send request to the Notion: ${error.message}`,
            );
        }
    };

    if (status === 'loading') return <> Loading </>;

    return (
        <div className="flex min-h-[100vh] min-w-[100%] max-w-5xl items-center justify-center py-20">
            <div className="flex flex-col items-center gap-8 md:gap-4">
                <h1 className="px-7 font-bold sm:text-xl md:text-2xl">
                    Already have downloaded mp3 file of the lecture? Insert it!
                </h1>

                <DNDInput
                    file={file}
                    setFile={setFile}
                    handleFileChange={handleFileChange}
                />

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
                            className={`border border-t-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900 ${
                                toggleSecond ? 'block' : 'hidden'
                            }`}
                        >
                            <SummaryText summaryText={summaryText} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withFile;
