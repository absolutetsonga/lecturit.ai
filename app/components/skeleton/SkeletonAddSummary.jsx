export const SkeletonAddSummary = () => {
    return (
        <div className="h-[100vh] w-[100%]">
            <div className="align-center flex h-full w-[100%] flex-col items-center justify-center gap-20 py-20">
                <div className="h-12 w-[60%] animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>

                <div className="h-5 w-2/5 rounded-full bg-gray-300 dark:bg-gray-400"></div>

                <div className="flex w-[80%] flex-col items-center gap-10">
                    <div className="flex w-[80%] items-center justify-center">
                        <div className="flex h-64 w-full animate-pulse flex-col items-center justify-center gap-6 rounded-lg bg-gray-200 dark:bg-gray-700">
                            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-400"></div>
                            <div className="h-4 w-1/4 rounded-full bg-gray-300 dark:bg-gray-400"></div>
                            <div className="h-2 w-1/5 rounded-full bg-gray-300 dark:bg-gray-400"></div>
                        </div>
                    </div>

                    <div className="flex w-[80%] flex-col">
                        <div id="accordion-collapse" data-accordion="collapse">
                            <h2 id="accordion-collapse-heading-1">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between rounded-t-xl border border-b-0 border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                                >
                                    <span className="h-4 w-2/3 rounded-full bg-gray-300 dark:bg-gray-400"></span>
                                </button>
                            </h2>

                            <h2 id="accordion-collapse-heading-1">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between border border-gray-200 p-5 text-left font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
                                >
                                    <span className="h-4 w-2/3 rounded-full bg-gray-300 dark:bg-gray-400"></span>
                                </button>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
