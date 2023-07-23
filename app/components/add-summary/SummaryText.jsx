export const SummaryText = ({ summaryText }) => {
    return (
        <div>
            {summaryText ? (
                summaryText
            ) : (
                <div
                    role="status"
                    className="flex w-full animate-pulse flex-col space-y-2.5"
                >
                    <div className="flex w-full items-center space-x-2">
                        <div className="h-2.5 w-2/4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-1/4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-1/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                        <div className="h-2.5 w-2/5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-1/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2.5 w-3/5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                        <div className="h-2.5 w-1/6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-2/6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2.5 w-3/6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                        <div className="h-2.5 w-1/3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-1/3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2.5 w-1/3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                        <div className="h-2.5 w-2/5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2.5 w-1/5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                        <div className="h-2.5 w-2/6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-1/6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2.5 w-3/6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
};
