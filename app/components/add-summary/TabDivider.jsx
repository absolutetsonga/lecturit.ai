export const TabDivider = ({ links, setLinks }) => {
    const handleLinkClick = (clickedLabel) => {
        const updatedLinks = links.map((link) =>
            link.label === clickedLabel
                ? { ...link, active: true }
                : { ...link, active: false },
        );

        setLinks(updatedLinks);
    };

    return (
        <div className="w-[60%] border-b border-gray-200 mx-8 dark:border-gray-700">
            <ul className="-mb-px flex flex-wrap text-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {links.map((link, index) => {
                    return (
                        <li
                            className="mr-2"
                            onClick={() => handleLinkClick(link.label)}
                            key={index}
                        >
                            <a
                                className={`${
                                    link.active
                                        ? 'border-b-2 text-lg font-bold'
                                        : 'font-normal'
                                }  group inline-flex items-center justify-center gap-3 rounded-t-lg  border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                            >
                                <div className="h-[30px] w-[30px]">
                                    {link.icon}
                                </div>
                                {link.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
