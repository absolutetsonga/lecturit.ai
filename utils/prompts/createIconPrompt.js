import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

const createIconPrompt = async (title) => {
    const llm = new OpenAI({
        temperature: 0.0,
        openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const template = `I want you to create only one emoji based on the title of the text and then it will be sent to Notion by using Notion API. I will write the sentence, and you will express it in one emoji. I just want you to express it with one emoji. I don't want you to reply with anything but emoji or replying me with two or more emojis.

    Here are a few examples of how you need to act:
                    
    Input: Unveiling the Future of Journalism: How AI is Revolutionizing News Reporting and Beyond 
    Output: 📰

    Input: Unlocking the Mysteries of Face Pareidolia: Exploring the Evolution of Facial Recognition.
    Output: 🤖

    Okay, now the title will be between 3 < and > symbols. 
                
    Input: <<<{title}>>>.
    Output: `;

    const prompt = new PromptTemplate({
        template: template,
        inputVariables: ['title'],
    });

    const formattedPrompt = await prompt.format({ title: title });
    const emoji = await llm.call(formattedPrompt);

    console.log({ emojiPrompt: emoji });
    console.log({ emojiPrompt: emoji.trim() });
    
    return emoji.trim();
};

export default createIconPrompt;
