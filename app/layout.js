import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata = {
    title: 'Summarizer of your School Lectures',
    description: 'Do not ever summarize and write your lectures',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
