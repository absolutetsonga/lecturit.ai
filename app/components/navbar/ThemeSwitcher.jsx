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
                className="relative inline-flex items-center cursor-pointer"
                onClick={toggleTheme}
            >
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={theme === 'dark' ? true : false}
                    ref={checkboxRef}
                />
                <div className="w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <button
                id="theme-toggle"
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
                <div
                    className={`${
                        theme === 'dark' ? 'bg-moon-dark' : 'bg-sun-light'
                    } transition-all w-[50px] h-[50px] bg-no-repeat object-cover`}
                />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
