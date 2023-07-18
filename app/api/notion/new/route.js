import { connectToDb } from '@/utils/database';
import { Client } from '@notionhq/client';

export const POST = async (req) => {
    const { formattedResults } = await req.json();

    try {
        const formattedResultsArray = JSON.parse(formattedResults);

        await connectToDb();

        const notion = new Client({ auth: process.env.NOTION_API_KEY });

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
                    page_id: process.env.NOTION_PAGE_ID,
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
