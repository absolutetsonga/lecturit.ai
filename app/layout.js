import { Poppins } from 'next/font/google';
import './globals.css';

import AuthProvider from './components/providers/AuthProvider';
import ThemeSwitchProvider from './components/providers/ThemeSwitchProvider';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata = {
    title: 'Summarizer of your School Lectures',
    description: 'Do not ever summarize and write your lectures',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <ThemeSwitchProvider>
                <AuthProvider>
                    <body className={poppins.className}>{children}</body>
                </AuthProvider>
            </ThemeSwitchProvider>
        </html>
    );
}
