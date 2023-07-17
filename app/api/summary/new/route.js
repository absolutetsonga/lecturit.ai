import { connectToDb } from '@/utils/database';

import Summary from '@/models/summary';

import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

export const POST = async (req) => {
    const { summary, userId } = await req.json();

    try {
        await connectToDb();

        const sentences = summary.split('. ');

        const getStructuredSubarrays = (sentences) => {
            let subarraysOfSentences = [];
            let currentSubarray = [];

            for (let i = 0; i <= sentences.length; i++) {
                if (i !== 0 && i % 10 === 0) {
                    currentSubarray.push(sentences[i]);
                    subarraysOfSentences.push(currentSubarray.join('. '));
                    currentSubarray = [];
                } else {
                    currentSubarray.push(sentences[i]);
                }
            }

            return subarraysOfSentences;
        };

        const texts = getStructuredSubarrays(sentences);

        const summarizeText = async (text) => {
            const llm = new OpenAI({
                temperature: 0.0,
                openAIApiKey: process.env.OPENAI_API_KEY,
            });

            const template =
                'You are a summarizer and formatter that formats the text and makes it more concise. First of all, do not include {text}';

            const prompt = new PromptTemplate({
                template: template,
                inputVariables: ['text'],
            });

            const formattedSummary = await prompt.format({ text: text });
            const result = await llm.call(formattedSummary);

            return result;
        };

        const summarizedTexts = [];

        for (let i = 0; i < texts.length; i++) {
            const text = texts[i];
            const result = await summarizeText(text);

            console.log({ text, result });
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
