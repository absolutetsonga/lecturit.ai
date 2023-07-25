import { connectToDb } from '@/utils/database';
import User from '@/models/user';

export const POST = async (req) => {
    const request = await req.json();

    console.log({
        userEmail: request.userEmail,
        pageId: request.pageId,
        integrationSecret: request.integrationSecret,
    });

    try {
        await connectToDb();

        const res = await User.findOneAndUpdate(
            { email: request.userEmail },
            {
                $set: {
                    notionPageId: request.pageId,
                    notionIntegrationSecret: request.integrationSecret,
                },
            },
            { upsert: true },
        );

        console.log(res);

        return new Response(JSON.stringify(res), { status: 200 });
    } catch (err) {
        console.error(
            `Error while trying to update user\'s information. ${err.message}`,
        );
    }
};
