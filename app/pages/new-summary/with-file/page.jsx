'use client';

import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const withFile = () => {
    const { data: session, status } = useSession();

    const [transcribedText, setTranscribedText] = useState();
    const [summaryText, setSummaryText] = useState();
    const [file, setFile] = useState();

    const handleFileChange = async (file) => {
        try {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('model', 'whisper-1');

            const transcriptedText = await getTranscript(formData);
            const summaryTexts = await addSummary(transcriptedText);

            setSummaryText(summaryTexts.join(''));

            const response = await sendToNotion(summaryTexts);

            return response;
        } catch (error) {
            console.error(
                `Error while trying to handle available data from the media recorder. Error message: ${error.message}`,
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
            setTranscribedText(text);

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

            console.log({ sendToNotionFunctionResponse: response });

            return response;
        } catch (error) {
            console.error(
                `Error while trying to send request to the Notion: ${error.message}`,
            );
        }
    };

    if (status === 'loading') return <> Loading </>;

    return (
        <div className="z-20 flex min-h-[100vh] min-w-[100%] max-w-5xl items-center justify-center">
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">
                    Already have downloaded mp3 file of the lecture? Insert it!
                </h1>

                <div className="flex w-full items-center justify-center">
                    <label
                        for="dropzone-file"
                        className={`${
                            file
                                ? 'hidden'
                                : 'dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                        }`}
                    >
                        <div
                            className={`flex flex-col items-center justify-center pb-6 pt-5`}
                        >
                            <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold">
                                    Click to upload
                                </span>
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                MP3, MP4, MPEG, MPGA, M4A, WAV, and WEBM
                            </p>
                        </div>
                    </label>
                    <input
                        id="dropzone-file"
                        type="file"
                        className={`${
                            file
                                ? 'block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-lg text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400'
                                : 'hidden'
                        }`}
                        onChange={(e) => {
                            handleFileChange(e.target.files[0]);
                            setFile(e.target.files[0]);
                        }}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <h3>Transcribed Text:</h3>

                    {transcribedText ? (
                        transcribedText
                    ) : (
                        <div
                            role="status"
                            class="max-w-lg animate-pulse space-y-2.5"
                        >
                            <div className="flex w-full items-center space-x-2">
                                <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[480px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[400px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[480px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[440px] items-center space-x-2">
                                <div className="h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex w-full max-w-[360px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <h3>Summary Text:</h3>

                    {summaryText ? (
                        summaryText
                    ) : (
                        <div
                            role="status"
                            class="max-w-lg animate-pulse space-y-2.5"
                        >
                            <div className="flex w-full items-center space-x-2">
                                <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[480px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[400px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[480px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <div className="flex w-full max-w-[440px] items-center space-x-2">
                                <div className="h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex w-full max-w-[360px] items-center space-x-2">
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withFile;
