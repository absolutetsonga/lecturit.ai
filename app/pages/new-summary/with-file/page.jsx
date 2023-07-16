'use client';

import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const withFile = () => {
    const { data: session, status } = useSession();

    const [transcribedText, setTranscribedText] = useState();
    const [summaryText, setSummaryText] = useState();

    const handleFileChange = async (file) => {
        try {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('model', 'whisper-1');

            const transcriptedText = await getTranscript(formData);
            const summary = await addSummary(transcriptedText);

            return summary;
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
                `Error while trying to get the response from Whisper. Error message: ${error.message}`,
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

                setSummaryText(summary.data.summary);

                return summaryText;
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

    if (status === 'loading') return <> Loading </>;

    return (
        <div>
            <div>
                <h3>
                    Already have downloaded mp3 file of the lecture? Insert it!
                </h3>

                <input
                    type="file"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />

                {/* <button onChange={handleFileChange}> Send </button> */}

                <p>{transcribedText}</p>
                <p>{summaryText}</p>
            </div>
        </div>
    );
};

export default withFile;
