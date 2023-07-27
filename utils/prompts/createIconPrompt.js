import { main } from '.';

const createIconPrompt = async (text) => {
    const template = `I want you to create only one emoji based on the title of the text and then it will be sent to Notion by using Notion API. I will write the sentence, and you will express it in one emoji. I just want you to express it with one emoji. I don't want you to reply with anything but emoji or replying me with two or more emojis.

    Here are a few examples of how you need to act:
                    
    Input: Unveiling the Future of Journalism: How AI is Revolutionizing News Reporting and Beyond 
    Output: 📰

    Input: Unlocking the Mysteries of Face Pareidolia: Exploring the Evolution of Facial Recognition.
    Output: 🤖

    Okay, now the title will be between 3 < and > symbols. 
                
    Input: <<<{text}>>>.
    Output: `;

    const result = await main(template, text);

    return result;
};

export default createIconPrompt;
