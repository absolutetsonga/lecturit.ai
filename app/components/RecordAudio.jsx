import useAudioRecording from '@/hooks/useSummaryText';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export const RecordAudio = () => {
    const { theme } = useTheme();

    const [selectedFile, setSelectedFile] = useState();

    const {
        microphoneAccess,
        isRecordingAudio,
        setIsRecordingAudio,
        recordedAudio,
        setRecordedAudio,
        transcribedText,
        summaryText,
        mediaRecorderRef,
        audioRef,

        status,
    } = useAudioRecording(selectedFile);

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
        <div className='flex items-center justify-center px-8'>
            {microphoneAccess ? (
                <div>
                    <button onClick={handleRecordClick}>
                        {isRecordingAudio ? (
                            <div
                                className={`${
                                    theme === 'dark'
                                        ? 'bg-pause-light'
                                        : 'bg-pause-dark'
                                } h-[30px] w-[30px] bg-no-repeat object-cover transition-all`}
                            />
                        ) : (
                            <div
                                className={`${
                                    theme === 'dark'
                                        ? 'bg-play-light'
                                        : 'bg-play-dark'
                                } h-[30px] w-[30px] bg-no-repeat object-cover transition-all`}
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
                                } h-[30px] w-[30px] bg-no-repeat object-cover transition-all`}
                            />

                            <p> Microphone access granted </p>
                        </div>

                        <p>{transcribedText}</p>
                        <p>{summaryText}</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div
                        className={`${
                            theme === 'dark'
                                ? 'bg-mic-no-light'
                                : 'bg-mic-no-dark'
                        } h-[30px] w-[30px] bg-no-repeat object-cover transition-all`}
                    />
                    <p> Microphone access denied </p>
                </div>
            )}
        </div>
    );
};
