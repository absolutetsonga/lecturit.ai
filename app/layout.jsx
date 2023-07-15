import { Poppins } from 'next/font/google';
import NavBar from './components/navbar/NavBar';
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
                    <body
                        className={`dark:bg-gray-900 dark:text-gray-50 ${poppins.className}`}
                    >
                        <main className="flex flex-col items-center px-8 md:px-16">
                            <NavBar />
                            <div className="py-40">{children}</div>
                        </main>
                    </body>
                </AuthProvider>
            </ThemeSwitchProvider>
        </html>
    );
}
