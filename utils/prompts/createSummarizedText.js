import { main } from '.';

const creaetSummarizedText = async (text) => {
    const template = `You are the summarization tool for students of the school and universities that will summarize lecture's, podcast's part that contains 10 sentences into brief summary, but that also provide specific information, interesting facts or material that will help for them to learn this new things.

                Also, if the author use "I", "We" and other informal words such as slangs, swears, you will need to convert it into official, formal language.

                Here is a few examples how you need to act:
                
                Input:  <<<Welcome to the Huberman Lab Podcast, where we discuss science and science-based tools for everyday life. I'm Andrew Huberman, and I'm a professor of neurobiology and ophthalmology at Stanford School of Medicine. Today is an Ask Me Anything episode, or AMA.>>> 
                Output:  Welcome to the Huberman Lab Podcast, founded by Andrew Huberman, a professor of neuroscience and ophthalmology at Stanford Medical School. Our podcast explores science and practical tools for everyday life. Today's episode falls under our popular "Ask Me Anything" series, where we address your questions and engage in insightful discussions. Let's dive in!

                Input: <<<The most important thing to understand is that for most adults, so that is people about age 18 to 20 or older, daily caffeine consumption is not going to be a problem provided it does not induce anxiety, and certainly provided that it not induce anxiety or panic attacks, and provided that it does not disrupt your nighttime sleep. This is why I always recommend that if you are going to consume caffeine in any form, coffee, tea, soda, or otherwise, that you try not to ingest caffeine within the eight, and ideally within the 10 or even 12 hours prior to bedtime.>>>
                Output: For most adults, daily caffeine consumption is generally not a problem unless it induces anxiety, panic attacks, or disrupts sleep. To ensure a restful night, it's best to avoid consuming caffeine within 8 to 12 hours before bedtime.

                Also, ignore text about adds, such as "If you'd like to subscribe to the Huberman Lab Podcast premium channel, please go to hubermanlab.com slash premium." and other add integration in the video. Do not include output.

                Okay, now the text will be between 3 < and > symbols.
                
                Input: <<<{text}>>>.
                Output: YOUR RESPONSE HERE.`;

    const result = main(template, text);

    return result;
};

export default creaetSummarizedText;
