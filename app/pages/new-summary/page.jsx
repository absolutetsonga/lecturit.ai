'use client';

import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { PaperClipIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';
import { UploadFile } from '@/app/components/add-summary/UploadFile';
import { RecordAudio } from '@/app/components/add-summary/RecordAudio';
import { TabDivider } from '@/app/components/add-summary/TabDivider';

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
        <div className="flex min-h-[100vh] max-w-7xl min-w-[100%] flex-col items-center gap-10 pt-20">
            <TabDivider links={links} setLinks={setLinks} />

            {links[0].active ? <RecordAudio /> : <UploadFile />}
        </div>
    );
};

export default newSummary;
