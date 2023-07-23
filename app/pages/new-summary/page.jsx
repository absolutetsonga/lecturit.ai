'use client';

import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { PaperClipIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';
import { UploadFile } from '@/app/components/UploadFile';
import { RecordAudio } from '@/app/components/RecordAudio';
import { TabDivider } from '@/app/components/TabDivider';

const newSummary = () => {
    const [links, setLinks] = useState([
        {
            label: 'Record Audio',
            icon: <MicrophoneIcon />,
            active: false,
        },
        {
            label: 'Upload File',
            icon: <PaperClipIcon />,
            active: true,
        },
    ]);

    return (
        <div className="flex min-h-[100vh] min-w-[100%] max-w-5xl flex-col items-center justify-center gap-10">
            <TabDivider links={links} setLinks={setLinks} />
            {links[0].active ? <RecordAudio /> : <UploadFile />}
        </div>
    );
};

export default newSummary;
