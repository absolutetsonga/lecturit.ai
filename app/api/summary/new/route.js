import { connectToDb } from '@/utils/database';

import getStructuredSubarrays from '@/utils/new-summary/getStructuredSubarrays';
import creaetSummarizedText from '@/utils/new-summary/createSummarizedText';

export const POST = async (req) => {
    const { transcript } = await req.json();

    try {
        await connectToDb();

        const texts = getStructuredSubarrays(transcript);

        const summarizedTexts = [];

        for (let i = 0; i < texts.length; i++) {
            let text = texts[i];
            let result = await creaetSummarizedText(text);

            summarizedTexts.push(result);
        }

        return new Response(JSON.stringify(summarizedTexts), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
