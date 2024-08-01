import ProductList from '@/app/components/ProductList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="animate-fade-in space-y-12 py-16">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold gold-gradient text-shadow-lg animate-slide-up">Luxury Redefined</h1>
        <p className="text-xl text-[hsl(var(--muted-foreground))] animate-slide-up" style={{ animationDelay: '0.2s' }}>Discover Our Exclusive Collection</p>
      </header>
      <div className="card luxury-border p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Suspense fallback={<div className="text-center py-20 animate-pulse gold-gradient text-2xl">Loading exquisite products...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}