import { connectToDb } from '@/utils/database';

import getStructuredSubarrays from '@/utils/new-summary/getStructuredSubarrays';
import summarizeText from '@/utils/new-summary/summarizeText';

export const POST = async (req) => {
    const { transcript } = await req.json();

    try {
        await connectToDb();

        const texts = getStructuredSubarrays(transcript);

        const summarizedTexts = [];

        for (let i = 0; i < texts.length; i++) {
            let text = texts[i];
            let result = await summarizeText(text);

            console.log({ input: text, output: result });
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
