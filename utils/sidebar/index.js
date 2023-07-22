import {
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    PlusIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Profile',
        href: '/pages/profile',
        icon: UsersIcon,
        current: false,
    },
    { name: 'New', href: '/pages/new-summary', icon: PlusIcon, current: false },
    {
        name: 'Summaries',
        href: '/pages/summaries',
        icon: DocumentDuplicateIcon,
        current: false,
    },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon, current: false },
];

export const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

export const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
];

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
