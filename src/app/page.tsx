// src/app/page.tsx
import ProductList from './components/ProductList';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-shadow">Our Products</h2>
      <div className="glass-effect p-6 rounded-lg shadow-lg">
        <ProductList />
      </div>
    </div>
  );
}