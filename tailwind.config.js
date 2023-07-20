const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '1.75rem' }],
            lg: ['1.125rem', { lineHeight: '2rem' }],
            xl: ['1.25rem', { lineHeight: '2rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['2rem', { lineHeight: '2.5rem' }],
            '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
            '5xl': ['3rem', { lineHeight: '3.5rem' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1.1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
        },
        extend: {
            linearGradientColors: {
                'dark-auth': ['#6E6F9D', '#CE83A1', '#737A9F'],
                'light-auth': ['#357AEF', '#9791F1', '#4AAFF7'],
            },

            backgroundImage: {
                'add-white': "url('/add_white.svg')",
                'add-dark': "url('/add_dark.svg')",

                'sun-light': "url('/sun.svg')",
                'moon-dark': "url('/moon.svg')",

                'mic-light': "url('/microphone_white.svg')",
                'mic-dark': "url('/microphone_dark.svg')",

                'mic-no-dark': "url('/mic_no_black.svg')",
                'mic-no-light': "url('/mic_no_white.svg')",

                'pause-light': "url('/pause_light.svg')",
                'pause-dark': "url('/pause_dark.svg')",

                'reset-light': "url('/reset_light.svg')",
                'reset-dark': "url('/reset_dark.svg')",

                'pause-light': "url('/pause_light.svg')",
                'pause-dark': "url('/pause_dark.svg')",

                'play-light': "url('/play_light.svg')",
                'play-dark': "url('/play_dark.svg')",
            },

            screens: {
                xs: '360px',
            },

            borderRadius: {
                '4xl': '2rem',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Lexend', ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                '2xl': '40rem',
            },
        },
    },
    plugins: [],
};
