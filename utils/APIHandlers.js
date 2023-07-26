import axios from 'axios';

export const getTranscript = async (formData) => {
    try {
        const response = await axios.post('/api/whisper', formData);

        return response.data.text;
    } catch (error) {
        console.error(
            `Error while trying to send the request to Whisper. Error message: ${error.message}`,
        );
    }
};

export const addSummary = async (transcript) => {
    try {
        const summary = await axios.post('/api/summary/new', {
            transcript: JSON.stringify(transcript),
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

export const sendToNotion = async (formattedResults, summaryTitle, keys) => {
    try {
        const response = await axios.post('/api/notion/new', {
            formattedResults: JSON.stringify(formattedResults),
            keys,
            summaryTitle,
        });

        return response;
    } catch (err) {
        console.error(
            `Error while trying to send request to the Notion: ${err.message}`,
        );
    }
};

export const createTitle = async (text) => {
    try {
        const response = await axios.post('/api/summary/title/new', { text });

        console.log(response);
        return response.data;
    } catch (err) {
        console.error(
            `Error while trying to send request for creating title to GPT: ${err.message}`,
        );
    }
};

export const addSummaryToDb = async (summaryText, summaryTitle, userId) => {
    try {
        const response = await axios.post('/api/add', {
            summaryText: JSON.stringify(summaryText),
            summaryTitle: JSON.stringify(summaryTitle),
            userId,
        });

        return response;
    } catch (err) {
        console.error(
            `Error while tring to send request for creating summary in database: ${err.message}`,
        );
    }
};
