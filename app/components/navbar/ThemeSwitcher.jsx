import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const checkboxRef = useRef();

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);

        const storedIsDark = localStorage.getItem('isDark');
        if (storedIsDark) {
            setIsDark(Boolean(storedIsDark));
        }
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        setIsDark(!isDark);

        localStorage.setItem('isDark', isDark.toString());

        setTheme(isDark ? 'dark' : 'light');
    };

    return (
        <div className="flex items-center">
            <button
                id="theme-toggle"
                type="button"
                className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={toggleTheme}
            >
                <div
                    className={`${
                        theme === 'dark' ? 'bg-moon-dark' : 'bg-sun-light'
                    } h-[35px] w-[35px] bg-no-repeat object-cover transition-all`}
                />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
