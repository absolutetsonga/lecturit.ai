import './globals.css';

import AuthProvider from './components/providers/AuthProvider';
import ThemeSwitchProvider from './components/providers/ThemeSwitchProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

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
                        <Header />
                        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                            {children}
                        </main>
                        <Footer />
                    </body>
                </AuthProvider>
            </ThemeSwitchProvider>
        </html>
    );
}
