import { NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req) => {
    const formData = await req.formData();

    try {
        const { data } = await axios.post(
            'https://api.openai.com/v1/audio/transcriptions',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            },
        );

        return NextResponse.json(data);
    } catch (error) {
        console.error(
            `Error while trying to send request to the Whisper API: ${error.message}`,
        );
    }
};
