'use client';

import axios from 'axios';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';

const newSummary = () => {
    let stream;

    const { theme } = useTheme();
    const { data: session, status } = useSession();

    const [microphoneAccess, setMicrophoneAccess] = useState(false);
    const [isRecordingAudio, setIsRecordingAudio] = useState(false);
    const [recordedAudio, setRecorderAudio] = useState();

    const mediaRecorderRef = useRef();

    useEffect(() => {
        const handleMicrophoneAccess = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                setMicrophoneAccess(true);

                getMediaRecorder();

                return stream;
            } catch (error) {
                console.error(
                    `Error while trying to get access microphone from user. Error message: ${error.message}`,
                );
            }
        };

        handleMicrophoneAccess();
    }, []);

    const getMediaRecorder = async () => {
        try {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.addEventListener('dataavailable', async (event) => {
                const formData = await handleDataAvailable(event);
                const transcript = await getTranscript(formData);
                const summary = await addSummary(transcript.text);
            });
        } catch (error) {
            console.error(
                `Error while trying to get media recorder. Error message: ${err.message}`,
            );
        }
    };

    const handleDataAvailable = async (event) => {
        try {
            const audioBlob = event.data;
            const audioURL = URL.createObjectURL(audioBlob);

            setRecorderAudio(audioURL);

            const audioFile = new File([audioBlob], 'audio.mp3', {
                type: 'audio/mp3',
            });

            const formData = new FormData();
            formData.append('file', audioFile);
            formData.append('model', 'whisper-1');

            return formData;
        } catch (error) {
            console.error(
                `Error while trying to handle available data from media recorder. Error message: ${error.message}`,
            );
        }
    };

    const getTranscript = async (formData) => {
        try {
            const { data: transcript } = await axios.post(
                '/api/whisper',
                formData,
            );

            return transcript;
        } catch (error) {
            console.error(
                `Error while trying to get response from Whisper. Error message: ${error.message}`,
            );
        }
    };

    const addSummary = async (transcript) => {        
        try {
            const responseBackend = await axios.post('/api/summary/new', {
                userId: session?.user.id,
                summary: JSON.stringify(transcript),
            });

            return responseBackend;
        } catch (error) {
            console.error(
                `Error while trying to add summary. Error message: ${error.message}`,
            );
        }
    };

    const handleRecordClick = () => {
        if (isRecordingAudio) {
            mediaRecorderRef.current?.stop();
        }

        if (!isRecordingAudio) {
            const mediaRecorder = mediaRecorderRef.current;

            if (mediaRecorder) {
                mediaRecorder.start();
                // setRecordedAudio(null);
            }
        }

        setIsRecordingAudio((prev) => !prev);
    };

    if (status === 'loading') return <> Loading </>;
    return (
        <div>
            <button onClick={handleRecordClick}>
                {isRecordingAudio ? (
                    <div
                        className={`${
                            theme === 'dark'
                                ? 'bg-pause-light'
                                : 'bg-pause-dark'
                        } h-[50px] w-[50px] bg-no-repeat object-cover transition-all`}
                    />
                ) : (
                    <div
                        className={`${
                            theme === 'dark' ? 'bg-play-light' : 'bg-play-dark'
                        } h-[50px] w-[50px] bg-no-repeat object-cover transition-all`}
                    />
                )}
            </button>

            {microphoneAccess ? (
                <p> Yes microphone Access </p>
            ) : (
                <p> No microphone Access </p>
            )}

            {/* {<button onClick={getMediaRecorder}> getMediaRecorder </button>} */}
        </div>
    );
};

export default newSummary;
