import ProductList from '@/app/components/ProductList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-primary text-shadow">Our Products</h2>
      <div className="card p-6">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}