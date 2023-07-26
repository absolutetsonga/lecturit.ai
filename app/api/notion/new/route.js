import { connectToDb } from '@/utils/database';
import { Client } from '@notionhq/client';

export const POST = async (req) => {
    const { formattedResults, keys } = await req.json();

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
                properties: {
                    title: {
                        title: [
                            {
                                text: {
                                    content:
                                        'Andrew Huberman Podcast about Fitness and Food',
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

        const response = createSummary();

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
