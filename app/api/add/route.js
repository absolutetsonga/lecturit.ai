import Summary from "@/models/summary";
import { connectToDb } from "@/utils/database";

export const POST = async (req) => {
    const { summaryText, summaryTitle, summaryEmoji, userId } = await req.json();

    try {
        await connectToDb();

        const response = await Summary.create({
            user: userId,
            summary: summaryText,
            title: summaryTitle,
            emoji: summaryEmoji
        });

        return new Response(JSON.stringify(response), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary. Error message: ${err.message}`,
            { status: 500 },
        );
    }
};
