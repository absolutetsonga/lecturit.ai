import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const useAudioRecording = () => {
    const { data: session, status } = useSession();

    const [microphoneAccess, setMicrophoneAccess] = useState(false);
    const [isRecordingAudio, setIsRecordingAudio] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [transcribedText, setTranscribedText] = useState('');
    const [summaryText, setSummaryText] = useState('');

    const mediaRecorderRef = useRef();
    const audioRef = useRef();

    useEffect(() => {
        let stream;
        let mediaRecorder;

        const handleMicrophoneAccess = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                setMicrophoneAccess(true);
                getMediaRecorder();
            } catch (error) {
                console.error(
                    `Error while trying to get access to the microphone from the user. Error message: ${error.message}`,
                );
            }
        };

        const getMediaRecorder = async () => {
            try {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.addEventListener(
                    'dataavailable',
                    handleDataAvailable,
                );
            } catch (error) {
                console.error(
                    `Error while trying to get the media recorder. Error message: ${error.message}`,
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

                const transcriptedText = await getTranscript(formData);
                const summary = await addSummary(transcriptedText);
                return summary;
            } catch (error) {
                console.error(
                    `Error while trying to handle available data from the media recorder. Error message: ${error.message}`,
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
                    `Error while trying to get the response from Whisper. Error message: ${error.message}`,
                );
            }
        };

        const addSummary = async (transcript) => {
            try {
                console.log({ userId: session?.user.id });

                if (session && session.user && session.user.id) {
                    console.log({ userId: session.user.id });

                    const summary = await axios.post('/api/summary/new', {
                        userId: session.user.id,
                        summary: JSON.stringify(transcript),
                    });

                    setSummaryText(summary.data.summary);

                    return summaryText;
                } else {
                    console.error(
                        'User ID is not available in the session object.',
                    );
                }
            } catch (error) {
                console.error(
                    `Error while trying to add the summary. Error message: ${error.message}`,
                );
            }
        };

        handleMicrophoneAccess();

        return () => {
            if (mediaRecorder) {
                mediaRecorder.removeEventListener(
                    'dataavailable',
                    handleDataAvailable,
                );
            }
            stream?.getTracks().forEach((track) => track.stop());
        };
    }, [session]);

    return {
        microphoneAccess,
        setMicrophoneAccess,
        isRecordingAudio,
        setIsRecordingAudio,
        recordedAudio,
        setRecordedAudio,
        transcribedText,
        setTranscribedText,
        summaryText,
        setSummaryText,

        mediaRecorderRef,
        audioRef,

        session,
        status,
    };
};

export default useAudioRecording;
