import { connectToDb } from '@/utils/database';
import { Client } from '@notionhq/client';

export const POST = async (req) => {
    const { summary } = await req.json();

    console.log(summary);
    
    try {
        await connectToDb();

        const notion = new Client({ auth: process.env.NOTION_API_KEY });
        let response;

        if (notion) {
            const createSummary = async () => {
                response = await notion.pages.create({
                    parent: {
                        type: 'database_id',
                        database_id: process.env.NOTION_DATABASE_ID,
                    },
                    properties: {
                        Name: {
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
                                rich_text: [
                                    {
                                        text: {
                                            content: summary,
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                });
            };

            createSummary();
        }

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
