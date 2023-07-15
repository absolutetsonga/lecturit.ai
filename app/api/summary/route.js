import { connectToDb } from '@/utils/database';
import Summary from '@/models/summary';

export const GET = async (req) => {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    try {
        await connectToDb();

        const summaries = await Summary.find({ user: userId });

        return new Response(JSON.stringify(summaries), { status: 200 });
    } catch (err) {
        return new Response(
            `Failed while trying to get summaries: ${err.message}`,
            { status: 500 },
        );
    }
};
