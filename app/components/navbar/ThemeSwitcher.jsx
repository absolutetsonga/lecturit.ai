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
            <div
                className="relative inline-flex cursor-pointer items-center"
                onClick={toggleTheme}
            >
                <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    checked={theme === 'dark' ? true : false}
                    ref={checkboxRef}
                />
                <div className="peer h-10 w-20 rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-[2px] after:h-9 after:w-9 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            </div>
            <button
                id="theme-toggle"
                type="button"
                className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
                <div
                    className={`${
                        theme === 'dark' ? 'bg-moon-dark' : 'bg-sun-light'
                    } h-[50px] w-[50px] bg-no-repeat object-cover transition-all`}
                />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
