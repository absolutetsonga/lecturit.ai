import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

export const main = async (template, text) => {
    const llm = new OpenAI({
        temperature: 0.0,
        openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = new PromptTemplate({
        template: template,
        inputVariables: ['text'],
    });

    const formattedPrompt = await prompt.format({ text: text });

    const result = await llm.call(formattedPrompt);

    return result;
};
