import ProductList from './components/ProductList';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Products</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ProductList />
      </div>
    </div>
  );
}