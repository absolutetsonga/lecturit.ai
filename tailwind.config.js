/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
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
        },
    },
    plugins: [],
};
