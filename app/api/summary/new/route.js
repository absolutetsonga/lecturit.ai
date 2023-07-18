import { connectToDb } from '@/utils/database';

import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

import Summary from '@/models/summary';

import getStructuredSubarrays from '@/utils/getStructuredSubarrays';
import summarizeText from '@/utils/summarizeText';

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

        const summarizedOverallText = summarizedTexts.join('. ');

        await Summary.create({
            summary: summarizedOverallText,
            user: userId,
        });

        return new Response(JSON.stringify(summarizedOverallText), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
