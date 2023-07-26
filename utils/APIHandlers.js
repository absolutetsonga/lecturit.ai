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

export const getKeys = async (userId) => {
    try {
        const response = await axios.get('/api/user', {
            params: {
                userId: userId,
            },
        });

        return response.data;
    } catch (err) {
        `Error while trying to get access to user's notion keys: ${err.message}`;
    }
};

export const sendToNotion = async (formattedResults, keys) => {
    try {
        const response = await axios.post('/api/notion/new', {
            formattedResults: JSON.stringify(formattedResults),
            keys,
        });

        return response;
    } catch (error) {
        console.error(
            `Error while trying to send request to the Notion: ${error.message}`,
        );
    }
};
