import { randWidthCalc } from '@/utils/skeleton/randWidthCalc';
import { useEffect, useState } from 'react';

const SkeletonItem = () => {
    const [randWidthTitle, setRandWidthTitle] = useState();
    const [randWidthSubtitle, setRandWidthSubtitle] = useState();

    useEffect(() => {
        const { randWidthTitle, randWidthSubtitle } = randWidthCalc();

        setRandWidthTitle(randWidthTitle);
        setRandWidthSubtitle(randWidthSubtitle);
    }, []);

    return (
        <div className="flex items-center justify-between pt-2">
            <div className="w-4/5">
                <div
                    className={`mb-2.5 h-2.5 w-1/${randWidthTitle} rounded-full bg-gray-300 dark:bg-gray-600`}
                ></div>
                <div
                    className={`h-3 w-1/${randWidthSubtitle} rounded-full bg-gray-200 dark:bg-gray-700`}
                ></div>
            </div>
            <div className="h-2.5 w-1/5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
    );
};

export const SkeletonLoader = () => {
    const skeletonCount = 10;

    const skeletonItems = Array.from({ length: skeletonCount }, (_, index) => (
        <SkeletonItem key={index} />
    ));

    return skeletonItems;
};
