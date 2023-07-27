import { connectToDb } from '@/utils/database';

import getStructuredSubarrays from '@/utils/new-summary/getStructuredSubarrays';
import createSummarizedText from '@/utils/prompts/createSummarizedText';

export const POST = async (req) => {
    const { transcript } = await req.json();

    try {
        await connectToDb();

        const texts = getStructuredSubarrays(transcript);

        const summarizedTexts = await Promise.all(
            texts.map(async (text) => {
                let result = await createSummarizedText(text);

                console.log({ input: text, output: result });

                return result;
            }),
        );

        return new Response(JSON.stringify(summarizedTexts), { status: 200 });
    } catch (err) {
        return new Response(
            `Failed while trying to get summaries: ${err.message}`,
            { status: 500 },
        );
    }
};
