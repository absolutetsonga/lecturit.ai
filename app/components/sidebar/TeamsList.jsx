import { teams, classNames } from '@/utils/sidebar';

const populateTeamsList = teams.map((team) => {
    return (
        <li key={team.name}>
            <a
                href={team.href}
                className={classNames(
                    team.current
                        ? 'dark:bg-gray-900 bg-gray-50 text-indigo-600'
                        : 'hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-900 ',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                )}
            >
                <span
                    className={classNames(
                        team.current
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                    )}
                >
                    {team.initial}
                </span>
                <span className="truncate">{team.name}</span>
            </a>
        </li>
    );
});

export const TeamsList = () => populateTeamsList;
