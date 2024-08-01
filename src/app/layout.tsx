// src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'IvesHub Printful Store',
  description: 'Custom products powered by Printful',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen`}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-indigo-600">IvesHub Printful Store</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white mt-12">
          <div className="container mx-auto px-4 py-6 text-center">
            <p>&copy; 2024 IvesHub Printful Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}