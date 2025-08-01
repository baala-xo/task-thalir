// app/products/page.tsx
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Ensures this page is always rendered dynamically on the server

// Define the shape of your product data
type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category: string;
};

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string; sort?: 'asc' | 'desc' } }) {
  const category = searchParams.category || 'all';
  const sort = searchParams.sort || 'asc';

  let query = supabase.from('products').select('*');

  if (category !== 'all') {
    query = query.eq('category', category);
  }
  
  query = query.order('price', { ascending: sort === 'asc' });

  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return <div>Error loading products.</div>;
  }

  // Define your categories for the UI
  const categories = ['all', 'electronics', 'clothing', 'home'];

  return (
    <div className="container mx-auto p-4">
      {/* Filtering and Sorting UI */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-semibold mr-2">Filter by Category:</span>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}&sort=${sort}`}
              className={`mr-2 px-3 py-1 rounded-full text-sm font-medium ${
                category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>

        <div>
          <span className="font-semibold mr-2">Sort by Price:</span>
          <Link
            href={`/products?category=${category}&sort=asc`}
            className={`mr-2 px-3 py-1 rounded-full text-sm font-medium ${
              sort === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Low to High
          </Link>
          <Link
            href={`/products?category=${category}&sort=desc`}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              sort === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            High to Low
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}