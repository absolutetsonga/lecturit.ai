'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

const profile = () => {
    const { data: session } = useSession();

    return (
        <div>
            <h1> Profile </h1>
        </div>
    );
};

export default profile;
