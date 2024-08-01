import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IvesHub Printful Store',
  description: 'Custom products powered by Printful',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground min-h-screen`}>
        <header className="bg-secondary">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-primary">IvesHub Printful Store</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-secondary text-secondary-foreground mt-12">
          <div className="container mx-auto px-4 py-6 text-center">
            <p>&copy; 2024 IvesHub Printful Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}