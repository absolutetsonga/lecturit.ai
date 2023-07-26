import { connectToDb } from '@/utils/database';
import User from '@/models/user';

export const GET = async (req) => {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    try {
        await connectToDb();

        const user = await User.find({ _id: userId });

        const { notionIntegrationSecret, notionPageId } = user[0];

        const response = { notionIntegrationSecret, notionPageId };

        return new Response(JSON.stringify(response), { status: 200 });
    } catch (err) {
        console.error(
            `Error while trying to send user's notion api keys: ${err.message}`,
        );
    }
};
