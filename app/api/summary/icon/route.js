import { connectToDb } from '@/utils/database';
import createIconPrompt from '@/utils/prompts/createIconPrompt';

export const POST = async (req) => {
    const { title } = await req.json();

    try {
        await connectToDb();

        const emoji = await createIconPrompt(title);

        console.log({ emoji });

        return new Response(JSON.stringify(emoji), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
