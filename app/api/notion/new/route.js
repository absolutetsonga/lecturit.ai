import { connectToDb } from '@/utils/database';
import { Client } from '@notionhq/client';

export const POST = async (req) => {
    const { formattedResults, summaryTitle, summaryEmoji, keys } =
        await req.json();

    const { notionIntegrationSecret, notionPageId } = keys;

    try {
        await connectToDb();

        const formattedResultsArray = JSON.parse(formattedResults);

        const notion = new Client({ auth: notionIntegrationSecret });

        if (!notion) return;

        const richTextArray = formattedResultsArray.map((el) => ({
            text: {
                content: el,
            },
        }));

        const createSummary = async () => {
            const response = await notion.pages.create({
                parent: {
                    type: 'page_id',
                    page_id: notionPageId,
                },
                icon: {
                    type: 'emoji',
                    emoji: `${summaryEmoji}`,
                },
                properties: {
                    title: {
                        title: [
                            {
                                text: {
                                    content: summaryTitle,
                                },
                            },
                        ],
                    },
                },
                children: [
                    {
                        object: 'block',
                        paragraph: {
                            rich_text: richTextArray,
                        },
                    },
                ],
            });

            return response;
        };

        const response = await createSummary();

        return new Response(JSON.stringify(response), {
            status: 201,
        });
    } catch (err) {
        return new Response(
            `Failed while trying to create summary in the Notion: ${err.message}`,
            { status: 500 },
        );
    }
};
