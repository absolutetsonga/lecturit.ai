import './globals.css';

import AuthProvider from './components/providers/AuthProvider';
import ThemeSwitchProvider from './components/providers/ThemeSwitchProvider';

import { LayoutProvider } from './components/providers/LayoutProvider';

export const metadata = {
    title: 'Summarizer of your School Lectures',
    description: 'Do not ever summarize and write your lectures',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="min-h-screen">
            <ThemeSwitchProvider>
                <AuthProvider>
                    <body>
                        <LayoutProvider>{children}</LayoutProvider>
                    </body>
                </AuthProvider>
            </ThemeSwitchProvider>
        </html>
    );
}
