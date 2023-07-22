import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

import { getTranscript, addSummary, sendToNotion } from '@/utils/APIHandlers';

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

                console.log(audioFile.size / 1048576);

                const formData = new FormData();
                formData.append('file', audioFile);
                formData.append('model', 'whisper-1');

                const transcriptedText = await getTranscript(formData);

                setTranscribedText(transcriptedText);

                const summaryTexts = await addSummary(transcriptedText, session);

                setSummaryText(summaryTexts.join(''));

                const response = sendToNotion(summaryTexts);
                
                return response;
            } catch (error) {
                console.error(
                    `Error while trying to handle available data from the media recorder. Error message: ${error.message}`,
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
