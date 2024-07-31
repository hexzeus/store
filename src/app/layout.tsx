import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ives Hub | Innovative Web Solutions',
  description: 'Pioneering advanced web development for the digital age',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-[rgba(var(--background-start-rgb),1)] to-[rgba(var(--background-end-rgb),1)]`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">{children}</main>
        <footer className="bg-[rgba(var(--background-end-rgb),0.9)] backdrop-blur-md p-4 text-center mt-12">
          <p>&copy; 2024 IvesHub | Advancing Digital Frontiers</p>
        </footer>
      </body>
    </html>
  );
}
