import ProductList from '@/app/components/ProductList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="animate-fade-in space-y-8 sm:space-y-12 md:space-y-16 py-10 sm:py-16 md:py-20">
      <header className="text-center space-y-4 sm:space-y-6 md:space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold matrix-gradient text-glow animate-slide-up font-orbitron">
          Digital Reality Redefined
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[hsl(var(--muted-foreground))] animate-slide-up matrix-text" style={{ animationDelay: '0.2s' }}>
          Discover Our Cutting-Edge Web Solutions
        </p>
      </header>
      <div className="matrix-card p-4 sm:p-6 md:p-10 animate-slide-up matrix-hover" style={{ animationDelay: '0.4s' }}>
        <Suspense fallback={<div className="text-center py-12 sm:py-16 md:py-24 animate-pulse matrix-gradient text-xl sm:text-2xl md:text-3xl">Decrypting products...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}