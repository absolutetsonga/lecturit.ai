export const SkeletonProfile = () => {
    return (
        <div
            role="status"
            className="flex min-h-[100vh] w-full animate-pulse flex-col items-center justify-center gap-20"
        >
            <div>
                <div className="mb-4 h-6 w-[300px] rounded-full bg-gray-200 dark:bg-gray-700 md:w-[500px]"></div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="mb-2.5 h-6 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-8 w-[400px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="mb-2.5 h-6 w-[130px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-8 w-[400px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>

                <div className="mb-2.5 h-11 w-[400px] rounded-full bg-gray-200 dark:bg-gray-700"></div>

                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
