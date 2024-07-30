import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import MobileMenu from "./MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ives Hub | Innovative Web Solutions",
  description: "Pioneering advanced web development for the digital age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-[rgba(var(--background-start-rgb),1)] to-[rgba(var(--background-end-rgb),1)]`}>
        <header className="bg-[rgba(var(--background-start-rgb),0.9)] backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold gradient-text">
                IvesHub
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">Home</Link>
                <Link href="/projects" className="hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">Projects</Link>
                <Link href="/skills" className="hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">Expertise</Link>
                <Link href="/contact" className="btn">Contact</Link>
              </div>
              <MobileMenu />
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-12 flex-grow">{children}</main>
        <footer className="bg-[rgba(var(--background-end-rgb),0.9)] backdrop-blur-md p-4 text-center mt-12">
          <div className="container mx-auto">
            <p>&copy; 2024 IvesHub | Advancing Digital Frontiers</p>
          </div>
        </footer>
      </body>
    </html>
  );
}