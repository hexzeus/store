import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import MobileMenu from "./MobileMenu";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Ives Hub | Futuristic Web Development",
  description: "Pioneering the digital frontier with cutting-edge web solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} min-h-screen flex flex-col`}>
        <header className="bg-[rgba(var(--background-start-rgb),0.8)] shadow-md matrix-box">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-3xl font-bold gradient-text matrix-glow">
                Ives_Hub
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="matrix-glow hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">Home</Link>
                <Link href="/projects" className="matrix-glow hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">Projects</Link>
                <Link href="/skills" className="matrix-glow hover:text-[rgba(var(--primary-color),1)] transition-colors duration-300">Skills</Link>
                <Link href="/contact" className="btn">Contact</Link>
              </div>
              <MobileMenu />
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-12 flex-grow">{children}</main>
        <footer className="bg-[rgba(var(--background-end-rgb),0.8)] p-4 text-center mt-12 matrix-box">
          <div className="container mx-auto">
            <p className="matrix-glow">&copy; 2024 Ives_Hub | Architecting Digital Realities</p>
          </div>
        </footer>
      </body>
    </html>
  );
}