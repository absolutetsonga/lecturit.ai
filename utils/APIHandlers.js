import axios from 'axios';

export const getTranscript = async (formData) => {
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

export const addSummary = async (transcript, session) => {
    try {
        const summary = await axios.post('/api/summary/new', {
            userId: session.user.id,
            summary: JSON.stringify(transcript),
        });

        return summary.data;
    } catch (error) {
        console.error(
            `Error while trying to add the summary. Error message: ${error.message}`,
        );
    }
};


export const sendToNotion = async (formattedResults) => {
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

