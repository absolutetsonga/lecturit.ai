import useAudioRecording from '@/hooks/useSummaryText';

import { useTheme } from 'next-themes';
import { useState } from 'react';

import { Accordion } from './Accordion';
import Visualizer from '../Visualizer';

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const RecordAudio = () => {
    const { theme } = useTheme();

    const [closeAlert, setCloseAlert] = useState(false);

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
    } = useAudioRecording();

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

    if (status === 'loading')
        return (
            <div role="status" class="max-w-sm animate-pulse">
                <div class="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div class="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div class="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div class="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div class="h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span class="sr-only">Loading...</span>
            </div>
        );

    const recordingAudioComponent = isRecordingAudio ? (
        <div
            className={`${
                theme === 'dark' ? 'bg-pause-light' : 'bg-pause-dark'
            } h-[100px] w-[100px] bg-no-repeat object-cover transition-all`}
        />
    ) : (
        <div
            className={`${
                theme === 'dark' ? 'bg-play-light' : 'bg-play-dark'
            } h-[100px] w-[100px] bg-no-repeat object-cover transition-all`}
        />
    );

    return (
        <div className="flex w-full items-center justify-center">
            {microphoneAccess ? (
                <div className="flex w-full max-w-5xl flex-col items-center gap-10">
                    <button onClick={handleRecordClick}>
                        {recordingAudioComponent}
                    </button>

                    <Visualizer
                        theme={theme}
                        microphoneAccess={microphoneAccess}
                    />

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
                                    closeAlert ? 'hidden' : 'flex'
                                } absolute bottom-10 left-10 right-10 mb-4 max-w-[400px] items-center gap-3 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400`}
                                role="alert"
                            >
                                <InformationCircleIcon className="h-[30px] w-[30px]" />
                                <div>
                                    <span className="font-medium">
                                        Success alert!
                                    </span>{' '}
                                    Microphone to access denied.
                                </div>

                                <XMarkIcon
                                    className="h-[30px] w-[30px] cursor-pointer"
                                    onClick={() => setCloseAlert(true)}
                                />
                            </div>
                        </div>
                    </div>

                    <Accordion
                        transcribeText={transcribedText}
                        summaryText={summaryText}
                    />
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
