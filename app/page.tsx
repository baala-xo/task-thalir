// app/page.tsx
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
};

async function getProductsByCategory(category: string, limit: number): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .limit(limit);
  
  if (error) {
    console.error(`Error fetching products for category "${category}":`, error);
    return [];
  }
  return products as Product[];
}

export default async function HomePage() {
  const electronics = await getProductsByCategory('electronics', 4);
  const clothing = await getProductsByCategory('clothing', 4);
  const home = await getProductsByCategory('home', 4);

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-gray-100 rounded-xl p-8 mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Unleash Your Inner Shopper
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Explore a world of unique and exciting products.
        </p>
        <Link 
          href="/products" 
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-transform transform hover:scale-105"
        >
          Shop All Products
        </Link>
      </div>

      {/* Featured Electronics Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Trending in Electronics</h2>
          <Link href="/products?category=electronics" className="text-blue-600 font-semibold hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {electronics.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Clothing Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Stylish Clothing</h2>
          <Link href="/products?category=clothing" className="text-blue-600 font-semibold hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clothing.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Featured Home Goods Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Home Essentials</h2>
          <Link href="/products?category=home" className="text-blue-600 font-semibold hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {home.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}