import { connectToDb } from '@/utils/database';
import createTitleText from '@/utils/prompts/createTitleText';

export const POST = async (req) => {
    const { text } = await req.json();

    try {
        await connectToDb();

        const title = await createTitleText(text); 

        return new Response(JSON.stringify(title), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
