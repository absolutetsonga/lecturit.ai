'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { DNDInput } from '@/app/components/add-summary/DNDInput';

import {
    getTranscript,
    addSummary,
    sendToNotion,
    getKeys,
} from '@/utils/APIHandlers';
import { Accordion } from './Accordion';

export const UploadFile = () => {
    const { data: session, status } = useSession();

    const [transcribeText, setTranscribeText] = useState();
    const [summaryText, setSummaryText] = useState();

    const [file, setFile] = useState();

    const handleFileChange = async (file) => {
        try {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('model', 'whisper-1');

            const transcriptedText = await getTranscript(formData);

            setTranscribeText(transcriptedText);

            const summaryTexts = await addSummary(transcriptedText, session);

            setSummaryText(summaryTexts.join(''));

            console.log({ userId: session?.user?.id });

            const keys = await getKeys(session?.user?.id);

            const response = await sendToNotion(summaryTexts, keys);

            return response;
        } catch (error) {
            console.error(
                `Error while trying to handle available data. Error message: ${error.message}`,
            );
        }
    };

    if (status === 'loading') return <> Loading </>;

    return (
        <div className="flex w-full max-w-5xl flex-col items-center gap-20">
            <h1 className="px-7 font-bold sm:text-xl md:text-2xl">
                Already have downloaded mp3 file of the lecture? Insert it!
            </h1>

            <div className="flex w-full flex-col items-center gap-10">
                <DNDInput
                    file={file}
                    setFile={setFile}
                    handleFileChange={handleFileChange}
                />

                <Accordion
                    transcribeText={transcribeText}
                    summaryText={summaryText}
                />
            </div>
        </div>
    );
};
