import { connectToDb } from '@/utils/database';

import Summary from '@/models/summary';

import { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export const POST = async (req) => {
    const { summary, userId } = await req.json();

    try {
        await connectToDb();

        const llm = new OpenAI({
            temperature: 0.0,
            openAIApiKey: process.env.OPENAI_API_KEY,
        });

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 8000,
            chunkOverlap: 1000,
        });

        const docs = await textSplitter.createDocuments([summary]);

        const summaryChain = loadSummarizationChain(llm, {
            type: 'refine',
            prompt: 'You are the AI Assistent that helps to summarize long lectures and podcasts! Your task is to write minimum 15 long summarized sentences about lecture.'
        });

        const result = await summaryChain.call({
            input_documents: docs,
        });

        const createdSummary = await Summary.create({
            summary: result.output_text,
            user: userId,
        });

        return new Response(JSON.stringify(createdSummary), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
