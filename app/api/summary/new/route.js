import { connectToDb } from '@/utils/database';

import Summary from '@/models/summary';

import getStructuredSubarrays from '@/utils/new-summary/getStructuredSubarrays';
import summarizeText from '@/utils/new-summary/summarizeText';

export const POST = async (req) => {
    const { summary, userId } = await req.json();

    try {
        await connectToDb();

        const texts = getStructuredSubarrays(summary);

        const summarizedTexts = [];

        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];

            const result = await summarizeText(text);

            summarizedTexts.push(result);
        }

        await Summary.create({
            user: userId,
            summary: summarizedTexts.join(''),
        });

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
