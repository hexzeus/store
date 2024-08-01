import ProductList from '@/app/components/ProductList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="animate-fade-in space-y-16 py-20">
      <header className="text-center space-y-8">
        <h1 className="text-6xl font-bold matrix-gradient text-glow animate-slide-up">
          Digital Reality Redefined
        </h1>
        <p className="text-2xl text-[hsl(var(--muted-foreground))] animate-slide-up matrix-text" style={{ animationDelay: '0.2s' }}>
          Discover Our Cutting-Edge Web Solutions
        </p>
      </header>
      <div className="matrix-card p-10 animate-slide-up matrix-hover" style={{ animationDelay: '0.4s' }}>
        <Suspense fallback={<div className="text-center py-24 animate-pulse matrix-gradient text-3xl">Decrypting services...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}