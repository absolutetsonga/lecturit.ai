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
    const [recordedAudio, setRecordedAudio] = useState();

    const [transcribedText, setTranscribedText] = useState('');
    const [summaryText, setSummaryText] = useState('');

    const mediaRecorderRef = useRef();
    const audioRef = useRef();

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

        const getMediaRecorder = async () => {
            try {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.addEventListener(
                    'dataavailable',
                    async (event) => {
                        const formData = await handleDataAvailable(event);
                        const transcriptedText = await getTranscript(formData);
                        const summary = await addSummary(transcriptedText);

                        return summary;
                    },
                );
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

                setRecordedAudio(audioURL);

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
                const { data: transcriptedText } = await axios.post(
                    '/api/whisper',
                    formData,
                );

                const { text } = transcriptedText;

                setTranscribedText(text);

                return text;
            } catch (error) {
                console.error(
                    `Error while trying to get response from Whisper. Error message: ${error.message}`,
                );
            }
        };

        const addSummary = async (transcript) => {
            try {
                const summary = await axios.post('/api/summary/new', {
                    userId: session?.user.id,
                    summary: JSON.stringify(transcript),
                });

                console.log(summary.data.summary);
                setSummaryText(summary.data.summary);

                return summaryText;
            } catch (error) {
                console.error(
                    `Error while trying to add summary. Error message: ${error.message}`,
                );
            }
        };
    }, []);

    const handleRecordClick = () => {
        if (isRecordingAudio) {
            mediaRecorderRef.current?.stop();
        }

        if (!isRecordingAudio) {
            const mediaRecorder = mediaRecorderRef.current;

            if (mediaRecorder) {
                mediaRecorder.start();
                setRecordedAudio(null);
            }
        }

        setIsRecordingAudio((prev) => !prev);
    };
    
    if (status === 'loading') return <> Loading </>;
    return (
        <div className="container">
            {microphoneAccess ? (
                <>
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
                                    theme === 'dark'
                                        ? 'bg-play-light'
                                        : 'bg-play-dark'
                                } h-[50px] w-[50px] bg-no-repeat object-cover transition-all`}
                            />
                        )}
                    </button>

                    {recordedAudio && (
                        <div>
                            <p> Recorded Audio: </p>
                            <audio
                                ref={audioRef}
                                controls
                                src={recordedAudio}
                                type="audio/mpeg"
                            />
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-row items-center gap-3">
                            <div
                                className={`${
                                    theme === 'dark'
                                        ? 'bg-mic-light'
                                        : 'bg-mic-dark'
                                } h-[50px] w-[50px] bg-no-repeat object-cover transition-all`}
                            />

                            <p> Microphone access granted </p>
                        </div>

                        <p>{transcribedText}</p>
                        <p>{summaryText}</p>
                    </div>
                </>
            ) : (
                <div>
                    <div
                        className={`${
                            theme === 'dark'
                                ? 'bg-mic-no-light'
                                : 'bg-mic-no-dark'
                        } h-[50px] w-[50px] bg-no-repeat object-cover transition-all`}
                    />
                    <p> Microphone access denied </p>
                </div>
            )}
        </div>
    );
};

export default newSummary;
