'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import useAudioRecording from '@/hooks/useSummaryText';

const newSummary = () => {
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

                    <img
                        src="https://mail.google.com/mail/u/3?ui=2&ik=f1ade9bc7f&attid=0.1&permmsgid=msg-f:1772027900006429905&th=189781fc87f6f4d1&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ-9WJaywWIoJ6oxJleFUZn_tMt2s46ebnW6b01DUCOsHE33aFwjzEB6lgvli6YYAyfmQi4h8PegPudgtfw4hWLCberfcQUtmUQWhvC_8pXWOnU9m45R9m77uZo&disp=emb"
                        alt=""
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
