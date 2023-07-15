import { connectToDb } from '@/utils/database';

import Summary from '@/models/summary';

import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

export const POST = async (req) => {
    const { summary, userId } = await req.json();

    console.log({ summary });

    try {
        await connectToDb();

        const model = new OpenAI({
            temperature: 0.0,
            openAIApiKey: process.env.OPENAI_API_KEY,
        });

        const template =
            `You are a summarizer and formatter that formats the text and makes it more concise. Summary: {summary}`;

        const prompt = new PromptTemplate({
            template: template,
            inputVariables: ['summary'],
        });

        const formattedSummary = await prompt.format({ summary });
        const result = await model.call(formattedSummary);

        console.log({ result });

        const createdSummary = await Summary.create({
            summary: result,
            user: userId,
        });

        console.log({ createdSummary });

        return new Response(JSON.stringify(result), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
